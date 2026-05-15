from __future__ import annotations

from celery import shared_task
from django.utils import timezone

from .emails import send_password_reset_email, send_verification_email
from .models import PasswordResetToken, User


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def send_verification_email_task(self, user_id: int, token: str) -> None:
    user = User.objects.get(id=user_id)
    send_verification_email(user=user, token=token)


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def send_password_reset_email_task(self, user_id: int, token: str) -> None:
    user = User.objects.get(id=user_id)
    send_password_reset_email(user=user, token=token)


@shared_task(bind=True)
def cleanup_expired_password_tokens(self) -> int:
    qs = PasswordResetToken.objects.filter(consumed_at__isnull=True, expires_at__lt=timezone.now())
    deleted, _ = qs.delete()
    return int(deleted)
