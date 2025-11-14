# payments/admin.py
from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
   # list_display = ("id", "reference", "order", "user", "method", "amount", "status", "created_at")
    #list_filter = ("method", "status", "created_at")
    search_fields = ("reference", "transaction_id", "order__id", "user__username")


# payments/admin.py
from django.contrib import admin
from .models import CandidatePayment

@admin.register(CandidatePayment)
class CandidatePaymentAdmin(admin.ModelAdmin):
    list_display = ("reference", "candidate", "amount", "method", "status", "created_at")
    list_filter = ("method", "status")
    search_fields = ("reference", "candidate__full_name", "candidate__email")
