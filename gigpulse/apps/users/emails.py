from __future__ import annotations

from django.conf import settings
from django.core.mail import send_mail

from .models import User


def send_verification_email(*, user: User, token: str) -> None:
    base = getattr(settings, "FRONTEND_BASE_URL", "http://localhost:5173")
    url = f"{base}/verify-email?token={token}"

    send_mail(
        subject="Verify your GigPulse email",
        message=(
            f"Hi {user.full_name or user.username},\n\n"
            f"Please verify your email address for GigPulse by visiting:\n{url}\n\n"
            "If you didn't create this account, you can ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )


def send_password_reset_email(*, user: User, token: str) -> None:
    base = getattr(settings, "FRONTEND_BASE_URL", "http://localhost:5173")
    url = f"{base}/reset-password?token={token}"

    send_mail(
        subject="Reset your GigPulse password",
        message=(
            f"Hi {user.full_name or user.username},\n\n"
            f"You can reset your password using:\n{url}\n\n"
            "If you didn't request this, you can ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )
