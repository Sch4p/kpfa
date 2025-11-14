# payments/serializers.py
from rest_framework import serializers
from .models import Payment

class PaymentInitiateSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    method = serializers.ChoiceField(choices=[c[0] for c in Payment.METHOD_CHOICES])
    return_url = serializers.URLField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
        read_only_fields = ("reference", "status", "transaction_id", "gateway_response", "created_at", "updated_at")

class PaymentVerifySerializer(serializers.Serializer):
    reference = serializers.CharField()
    transaction_id = serializers.CharField(required=False, allow_blank=True)
    payload = serializers.JSONField(required=False)



# payments/serializers.py
from rest_framework import serializers
from .models import CandidatePayment

class CandidatePaymentSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source="candidate.full_name", read_only=True)

    class Meta:
        model = CandidatePayment
        fields = [
            "id",
            "reference",
            "candidate",
            "candidate_name",
            "amount",
            "method",
            "status",
            "created_at",
        ]
        read_only_fields = ["reference", "status", "created_at"]
