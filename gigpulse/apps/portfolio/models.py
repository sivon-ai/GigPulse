from __future__ import annotations

from django.conf import settings
from django.db import models


class PortfolioItem(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="portfolio_items")

	title = models.CharField(max_length=200)
	description = models.TextField(blank=True)
	link_url = models.URLField(blank=True)
	attachment = models.FileField(upload_to="portfolio/%Y/%m/%d/", blank=True)
	tags = models.JSONField(default=list, blank=True)
	is_public = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-created_at",)
		indexes = [models.Index(fields=["user", "created_at"])]

	def __str__(self) -> str:
		return self.title


class WorkHistory(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="work_history")

	company = models.CharField(max_length=200)
	title = models.CharField(max_length=200)
	start_date = models.DateField()
	end_date = models.DateField(null=True, blank=True)
	description = models.TextField(blank=True)
	is_public = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-start_date",)
		indexes = [models.Index(fields=["user", "start_date"])]

	def __str__(self) -> str:
		return f"{self.company} — {self.title}"


class Certificate(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="certificates")

	name = models.CharField(max_length=200)
	issuer = models.CharField(max_length=200, blank=True)
	issue_date = models.DateField(null=True, blank=True)
	expiry_date = models.DateField(null=True, blank=True)
	credential_url = models.URLField(blank=True)
	attachment = models.FileField(upload_to="certificates/%Y/%m/%d/", blank=True)
	is_public = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-created_at",)
		indexes = [models.Index(fields=["user", "created_at"])]

	def __str__(self) -> str:
		return self.name
