import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone
import datetime


def generate_reference(method=None):
    """
    Generates a unique, human-readable transaction reference automatically tagged
    by payment method and date.
    
    Example outputs:
      KPFA-OPAY-20251103-8A3F9B
      KPFA-MOMO-20251103-1D7E2C
      KPFA-MPOINT-20251103-3F4A1E
      KPFA-CARD-20251103-9C1E2F
      KPFA-BANK-20251103-2B4D7F
    """

    prefix_map = {
        "opay": "OPAY",
        "moniepoint": "MPOINT",
        "mtn_momo": "MOMO",
        "naira_card": "CARD",
        "bank_transfer": "BANK",
        "cod": "COD",
    }

    method_prefix = prefix_map.get(method, "GEN")
    date_part = datetime.datetime.now().strftime("%Y%m%d")
    unique_part = uuid.uuid4().hex[:6].upper()

    return f"KPFA-{method_prefix}-{date_part}-{unique_part}"



class Payment(models.Model):
    METHOD_CHOICES = [
        ("naira_card", "Naira Card"),
        ("opay", "Opay"),
        ("moniepoint", "Moniepoint"),
        ("mtn_momo", "MTN MoMo Ghana"),
        ("bank_transfer", "Bank Transfer"),
        ("cod", "Cash on Delivery"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("success", "Success"),
        ("failed", "Failed"),
    ]

    order = models.ForeignKey("kpfa.Order", on_delete=models.CASCADE, related_name="payments")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="payments")
    method = models.CharField(max_length=30, choices=METHOD_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    reference = models.CharField(max_length=64, unique=True, blank=True)
    transaction_id = models.CharField(max_length=128, blank=True, null=True)
    gateway_response = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["reference"]),
            models.Index(fields=["transaction_id"]),
        ]
    
    def save(self, *args, **kwargs):
        if not self.reference:
        # Generate prefixed reference automatically using payment method
            self.reference = generate_reference(self.method)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment {self.reference} ({self.method}) - {self.status}"


class CandidatePayment(models.Model):
    METHODS_LIST = [
        ("OPAY", "Opay"),
        ("BANK", "Bank Transfer"),
        ("MTN MOMO GH", "MTN Mobile Money Ghana"),
        ("CASH", "Cash"),
    ]

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    candidate = models.ForeignKey("kpfa.Candidate", on_delete=models.CASCADE, related_name="payments")
    reference = models.CharField(max_length=50, unique=True, editable=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=10000.00)
    method = models.CharField(max_length=25, choices=METHODS_LIST)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.reference:
            today = timezone.now().strftime("%Y%m%d")
            uid = str(uuid.uuid4())[:10]
            self.reference = f"KPFA-{today}-{uid}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference} ({self.candidate.full_name})"