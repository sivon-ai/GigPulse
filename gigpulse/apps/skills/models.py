from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class Skill(models.Model):
	name = models.CharField(max_length=120, unique=True)
	slug = models.SlugField(max_length=140, unique=True, blank=True)
	description = models.TextField(blank=True)
	is_active = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("name",)
		indexes = [models.Index(fields=["slug"])]

	def __str__(self) -> str:
		return self.name

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.name)
		super().save(*args, **kwargs)
