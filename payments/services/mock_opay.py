# payments/services/mock_opay.py
"""
Mock Opay service for local testing / sandbox.
Replace these functions with real HTTP integrations to Opay when ready.
"""
import uuid
from datetime import datetime

def initiate_payment(order, amount, metadata=None):
    """
    Mock initiation returns a payment_url and reference.
    metadata: dict (phone, email, user_id, etc.)
    """
    reference = uuid.uuid4().hex
    return {
        "status": "ok",
        "payment_url": f"https://mock-opay.example/checkout/{reference}",
        "reference": reference,
        "expires_at": (datetime.utcnow()).isoformat() + "Z",
        "message": "mock_opay_initiated"
    }

def verify(reference, payload=None):
    """
    Mock verification: always return success for sandbox.
    In production, call Opay verify endpoint and validate signature.
    """
    return {"status": "success", "transaction_id": uuid.uuid4().hex, "message": "mock_opay_verified"}
