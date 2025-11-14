# payments/urls.py
from django.urls import path
#from .views import CandidateOpaySandboxPaymentView
from .views import (PaymentInitiateView, 
                    PaymentVerifyView, 
                    CandidatePaymentCheckView,
                    CandidateMockPaymentView, 
                    CandidateMockPaymentConfirmView, 
                    CandidatePaymentListView, 
                    
                    )

urlpatterns = [
    # eShop payments
    path("initiate/", PaymentInitiateView.as_view(), name="payment-initiate"),
    path("verify/", PaymentVerifyView.as_view(), name="payment-verify"),

     # Candidates payments 
    #path("candidate/initiate/", CandidatePaymentCreateView.as_view(), name="candidate-payment-initiate"),
    
    # New endpoint for candidate checkout (Opay sandbox + bank)
    #path(
       # 'candidate/initiate/',
       # CandidateOpaySandboxPaymentView.as_view(),
       # name='candidate-payment-initiate'
    #),
    path("candidate/check/<int:candidate_id>/", CandidatePaymentCheckView.as_view(), name="candidate-payment-check"), 
    path("candidate/mock-initiate/", CandidateMockPaymentView.as_view(), name="candidate-mock-initiate"),
    path("candidate/mock-confirm/", CandidateMockPaymentConfirmView.as_view(), name="candidate-mock-confirm"),
    path("candidate/payments/", CandidatePaymentListView.as_view(), name="candidate-payment-list"),

]
