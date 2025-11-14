# payments/utils.py
import hmac
import hashlib
from django.conf import settings

def verify_hmac_signature(secret_key, payload_bytes, signature_header):
    """
    Generic HMAC verification helper.
    secret_key: bytes or str
    payload_bytes: bytes of the request body
    signature_header: the signature string sent by gateway (format depends on gateway)
    Returns True if valid.
    """
    if isinstance(secret_key, str):
        secret_key = secret_key.encode("utf-8")
    mac = hmac.new(secret_key, payload_bytes, hashlib.sha256)
    expected = mac.hexdigest()
    # Some gateways prefix signature; normalize
    if signature_header is None:
        return False
    sig = signature_header.strip()
    # Accept both hex and prefixed forms (e.g. sha256=...)
    if sig.startswith("sha256="):
        sig = sig.split("=", 1)[1]
    return hmac.compare_digest(expected, sig)
