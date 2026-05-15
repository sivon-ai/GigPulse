from __future__ import annotations

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from apps.proposals.models import Contract


class Review(models.Model):
	contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name="reviews")

	review_from = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="reviews_given",
	)
	review_to = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="reviews_received",
	)

	rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
	comment = models.TextField(blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)
		constraints = [
			models.UniqueConstraint(fields=["contract", "review_from"], name="uniq_review_contract_from")
		]
		indexes = [
			models.Index(fields=["review_to", "created_at"]),
			models.Index(fields=["review_from", "created_at"]),
		]

	def __str__(self) -> str:
		return f"Review {self.id}"
