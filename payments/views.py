from django.shortcuts import render

# Create your views here.
# payments/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.apps import apps
from .serializers import PaymentInitiateSerializer, PaymentVerifySerializer, PaymentSerializer, CandidatePaymentSerializer
from .models import Payment
from .services import mock_opay
from rest_framework.decorators import action
from django.shortcuts import redirect, HttpResponseRedirect




ORDER_APP_LABEL = getattr(settings, "PAYMENT_ORDER_APP", "kpfa")
Order = apps.get_model(ORDER_APP_LABEL, "Order")

GATEWAY_MAP = {
    "opay": mock_opay,
}

class PaymentInitiateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PaymentInitiateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        order_id = data["order_id"]
        method = data["method"]
        return_url = data.get("return_url") or request.build_absolute_uri("/")
        phone = data.get("phone")
        email = data.get("email")

        order = get_object_or_404(Order, id=order_id, user=request.user)

        # Server-side validation: ensure amount is correct and > 0
        try:
            amount = float(order.total_amount)
        except Exception:
            return Response({"detail": "Order amount invalid"}, status=status.HTTP_400_BAD_REQUEST)
        if amount <= 0:
            return Response({"detail": "Invalid order amount"}, status=status.HTTP_400_BAD_REQUEST)

        payment = Payment.objects.create(
            order=order,
            user=request.user,
            method=method,
            amount=amount,
        )

        gateway_service = GATEWAY_MAP.get(method)
        if not gateway_service:
            payment.status = "failed"
            payment.gateway_response = {"error": "Unsupported gateway"}
            payment.save(update_fields=["status", "gateway_response"])
            return Response({"detail": "Unsupported payment method"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            gateway_result = gateway_service.initiate_payment(order, amount, {"user_id": request.user.id, "phone": phone, "email": email})
        except Exception as e:
            payment.status = "failed"
            payment.gateway_response = {"error": str(e)}
            payment.save(update_fields=["status", "gateway_response"])
            return Response({"detail": "Gateway error"}, status=status.HTTP_502_BAD_GATEWAY)

        payment.gateway_response = gateway_result
        payment.reference = gateway_result.get("reference") or payment.reference
        payment.save(update_fields=["gateway_response", "reference"])

        resp = {
            "payment_id": payment.id,
            "reference": payment.reference,
            "payment_url": gateway_result.get("payment_url"),
            "confirmation": gateway_result.get("confirmation_code"),
            "message": "Initiated"
        }
        return Response(resp, status=status.HTTP_201_CREATED)

class PaymentVerifyView(APIView):
    # AllowAny because gateway webhooks may call this; in production, verify signature
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PaymentVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        reference = data.get("reference")
        transaction_id = data.get("transaction_id")
        payload = data.get("payload", {})

        payment = get_object_or_404(Payment, reference=reference)

        gateway_service = GATEWAY_MAP.get(payment.method)
        if not gateway_service:
            return Response({"detail": "Unknown gateway for this payment"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            result = gateway_service.verify(reference, payload)
        except Exception as e:
            return Response({"detail": "verification error", "error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        if result.get("status") == "success":
            payment.status = "success"
            payment.transaction_id = result.get("transaction_id") or transaction_id
            payment.gateway_response = result
            payment.save(update_fields=["status", "transaction_id", "gateway_response"])

            # Mark order paid securely
            try:
                order = payment.order
                order.is_paid = True
                order.status = "Paid"
                order.save()
            except Exception:
                # Keep payment success, but do not crash
                pass

            return Response({"detail": "Payment verified", "status": "success"})
        else:
            payment.status = "failed"
            payment.gateway_response = result
            payment.save(update_fields=["status", "gateway_response"])
            return Response({"detail": "Payment failed", "status": "failed"}, status=status.HTTP_400_BAD_REQUEST)



# payments/views.py
import uuid
from rest_framework import generics, status
from rest_framework.response import Response
from .models import CandidatePayment
from .serializers import CandidatePaymentSerializer

class CandidateMockPaymentView(generics.CreateAPIView):
    """
    Simulates Opay payment initialization without external API calls.
    Creates a fake transaction reference and returns a mock redirect URL.
    """
    queryset = CandidatePayment.objects.all()
    serializer_class = CandidatePaymentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment = serializer.save()

        # Generate a fake transaction reference (Opay-like format)
        payment.reference = f"KPFA-MOCK-{uuid.uuid4().hex[:10].upper()}"
        payment.status = "PENDING"
        payment.save()

        # Mock "redirect URL" simulating Opay's payment page
        mock_redirect_url = f"http://localhost:8080/mock-payment?ref={payment.reference}"

        return Response({
            "message": "Mock payment initialized successfully.",
            "data": {
                "reference": payment.reference,
                "opay_mock_url": mock_redirect_url,
                "amount": payment.amount,
                "candidate_name": payment.candidate.full_name,
                "status": payment.status,
            },
        }, status=status.HTTP_201_CREATED)




# payments/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .models import CandidatePayment
from kpfa.models import Candidate  
import uuid


class CandidateMockPaymentInitiateView(APIView):
    """
    Initiate a mock payment for a candidate, but prevent duplicate active payments.
    """

    def post(self, request, *args, **kwargs):
        candidate_id = request.data.get("candidate")
        method = request.data.get("method", "OPAY")

        if not candidate_id:
            return Response({"message": "Candidate ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            candidate = Candidate.objects.get(id=candidate_id)
        except Candidate.DoesNotExist:
            return Response({"message": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)

        # Prevent duplicate payment
        existing_payment = CandidatePayment.objects.filter(
            candidate=candidate,
            status__in=["PENDING", "SUCCESS"]
        ).first()

        if existing_payment:
            mock_url = f"{settings.FRONTEND_BASE_URL}/mock-payment?ref={existing_payment.reference}"
            return Response({
                "message": "Payment already exists for this candidate.",
                "data": {
                    "reference": existing_payment.reference,
                    "status": existing_payment.status,
                    "opay_mock_url": mock_url
                }
            }, status=status.HTTP_200_OK)

        # Otherwise, create new one
        reference = f"KPFA-MOCK-{uuid.uuid4().hex[:10].upper()}"
        payment = CandidatePayment.objects.create(
            candidate=candidate,
            amount=request.data.get("amount", 10000.0),
            method=method,
            status="PENDING",
            reference=reference,
        )

        mock_url = f"{settings.FRONTEND_BASE_URL}/mock-payment?ref={reference}"

        return Response({
            "message": "Payment initialized successfully.",
            "data": {
                "reference": reference,
                "status": payment.status,
                "opay_mock_url": mock_url
            }
        }, status=status.HTTP_201_CREATED)


class CandidateMockPaymentConfirmView(APIView):
    """
    Confirm a mock payment and return JSON including the frontend redirect URL.
    """

    def post(self, request, *args, **kwargs):
        reference = request.data.get("reference")
        status_value = request.data.get("status", "SUCCESS").upper()

        if not reference:
            return Response({"message": "Missing reference"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payment = CandidatePayment.objects.get(reference=reference)
        except CandidatePayment.DoesNotExist:
            return Response({"message": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

        # Update payment + candidate
        payment.status = status_value
        payment.save()

        candidate = payment.candidate
        candidate.status = "PAID" if status_value == "SUCCESS" else "NOT_PAID"
        candidate.save()

        frontend_success_url = (
            f"{settings.FRONTEND_BASE_URL}/candidate/payment-success?"
            f"ref={reference}&candidateId={candidate.id}"
        )

        return Response({
            "message": f"Payment marked as {payment.status}. Candidate status: {candidate.status}",
            "reference": payment.reference,
            "status": payment.status,
            "candidate_status": candidate.status,
            "redirect_url": frontend_success_url
        }, status=status.HTTP_200_OK)


class CandidatePaymentCheckView(APIView):
    """
    Optional: Allows frontend to check if candidate already has payment.
    """
    def get(self, request, candidate_id):
        payment = CandidatePayment.objects.filter(candidate_id=candidate_id).first()
        if payment:
            return Response(
                {
                    "exists": True,
                    "reference": payment.reference,
                    "status": payment.status,
                },
                status=status.HTTP_200_OK,
            )
        
        # Instead of returning 404, return a clean 200
        return Response(
            {"exists": False, "message": "No payment record found for this candidate."},
            status=status.HTTP_200_OK,
        )



class CandidatePaymentListView(generics.ListAPIView):
    serializer_class = CandidatePaymentSerializer
    permission_classes = [permissions.AllowAny]  # later restrict to logged-in users

    def get_queryset(self):
        candidate_id = self.request.query_params.get("candidate")
        if candidate_id:
            return CandidatePayment.objects.filter(candidate_id=candidate_id).order_by("-created_at")
        return CandidatePayment.objects.none()
