from __future__ import annotations

from django.db import models


class MarketMetric(models.Model):
	date = models.DateField()
	name = models.CharField(max_length=100)
	value = models.FloatField()
	data = models.JSONField(default=dict, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		unique_together = ("date", "name")
		ordering = ("-date",)
		indexes = [models.Index(fields=["date"])]

	def __str__(self) -> str:
		return f"{self.name} @ {self.date}: {self.value}"
