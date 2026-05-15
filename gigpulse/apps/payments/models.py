from __future__ import annotations

from django.conf import settings
from django.db import models


class PaymentStatus(models.TextChoices):
	PENDING = "pending", "Pending"
	SUCCEEDED = "succeeded", "Succeeded"
	FAILED = "failed", "Failed"


class PaymentTransaction(models.Model):
	payer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="payments")
	amount = models.DecimalField(max_digits=12, decimal_places=2)
	currency = models.CharField(max_length=8, default="USD")
	provider = models.CharField(max_length=64, blank=True)
	provider_id = models.CharField(max_length=256, blank=True)
	status = models.CharField(max_length=16, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
	metadata = models.JSONField(default=dict, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self) -> str:
		return f"Payment {self.id} {self.amount} {self.currency} {self.status}"


class Payout(models.Model):
	recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="payouts")
	amount = models.DecimalField(max_digits=12, decimal_places=2)
	currency = models.CharField(max_length=8, default="USD")
	provider = models.CharField(max_length=64, blank=True)
	provider_id = models.CharField(max_length=256, blank=True)
	processed = models.BooleanField(default=False)

	created_at = models.DateTimeField(auto_now_add=True)
	processed_at = models.DateTimeField(null=True, blank=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self) -> str:
		return f"Payout {self.id} {self.amount} {self.currency} processed={self.processed}"
