# kpfa/utils.py
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def send_order_receipt_email(order):
    """
    Sends an HTML order receipt email to the buyer after checkout.
    """

    subject = f"KPFA Order Receipt - Order #{order.id}"
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@kpfa.com")
    recipient = [order.email]

    # Prepare email context
    context = {
        "order": order,
        "order_items": order.order_items.all(),
        "academy_name": "Kutty Philips Football Academy (KPFA) Store",
        "academy_address": "Lagos State, Nigeria",
        "academy_email": "info@kpfa.com",
        "academy_logo_url": f"{settings.SITE_URL}/media/kpfa_logo.jpg"  # adjust path if different
    }

    # Render HTML template
    html_content = render_to_string("emails/order_receipts/order_receipt.html", context)

    # Create email message
    email_message = EmailMultiAlternatives(
        subject=subject,
        body="Your KPFA Store order receipt",  # fallback plain text
        from_email=from_email,
        to=recipient,
    )
    email_message.attach_alternative(html_content, "text/html")

    try:
        email_message.send()
    except Exception as e:
        print(f"❌ Failed to send receipt email for order {order.id}: {e}")
