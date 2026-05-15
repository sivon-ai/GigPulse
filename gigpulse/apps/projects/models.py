from __future__ import annotations

from django.conf import settings
from django.db import models
from django.utils.text import slugify

from apps.skills.models import Skill


def _unique_slug_for_model(model_cls, base: str, *, slug_field: str = "slug") -> str:
	base_slug = slugify(base)[:140] or "item"
	candidate = base_slug
	i = 2
	while model_cls.objects.filter(**{slug_field: candidate}).exists():
		suffix = f"-{i}"
		candidate = f"{base_slug[: (140 - len(suffix))]}{suffix}"
		i += 1
	return candidate


class ProjectCategory(models.Model):
	name = models.CharField(max_length=120, unique=True)
	slug = models.SlugField(max_length=140, unique=True, blank=True)
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
			self.slug = _unique_slug_for_model(ProjectCategory, self.name)
		super().save(*args, **kwargs)


class ProjectDuration(models.TextChoices):
	SHORT = "short", "Less than 1 month"
	MEDIUM = "medium", "1–3 months"
	LONG = "long", "More than 3 months"


class ExperienceLevel(models.TextChoices):
	ENTRY = "entry", "Entry"
	INTERMEDIATE = "intermediate", "Intermediate"
	EXPERT = "expert", "Expert"


class ProjectVisibility(models.TextChoices):
	PUBLIC = "public", "Public"
	INVITE_ONLY = "invite_only", "Invite only"
	PRIVATE = "private", "Private"


class UrgencyLevel(models.TextChoices):
	LOW = "low", "Low"
	MEDIUM = "medium", "Medium"
	HIGH = "high", "High"


class ProjectStatus(models.TextChoices):
	DRAFT = "draft", "Draft"
	OPEN = "open", "Open"
	IN_PROGRESS = "in_progress", "In progress"
	COMPLETED = "completed", "Completed"
	CANCELLED = "cancelled", "Cancelled"


class Project(models.Model):
	owner = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="projects",
	)

	title = models.CharField(max_length=200)
	description = models.TextField()

	category = models.ForeignKey(
		ProjectCategory,
		on_delete=models.SET_NULL,
		null=True,
		blank=True,
		related_name="projects",
	)
	required_skills = models.ManyToManyField(Skill, blank=True, related_name="projects")

	budget_min = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
	budget_max = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

	duration = models.CharField(
		max_length=16,
		choices=ProjectDuration.choices,
		default=ProjectDuration.MEDIUM,
	)
	experience_level = models.CharField(
		max_length=16,
		choices=ExperienceLevel.choices,
		default=ExperienceLevel.INTERMEDIATE,
	)

	visibility = models.CharField(
		max_length=16,
		choices=ProjectVisibility.choices,
		default=ProjectVisibility.PUBLIC,
	)
	urgency_level = models.CharField(
		max_length=16,
		choices=UrgencyLevel.choices,
		default=UrgencyLevel.MEDIUM,
	)
	status = models.CharField(
		max_length=16,
		choices=ProjectStatus.choices,
		default=ProjectStatus.OPEN,
	)

	proposal_count = models.PositiveIntegerField(default=0)
	is_featured = models.BooleanField(default=False)
	ai_tags = models.JSONField(default=list, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-created_at",)
		indexes = [
			models.Index(fields=["status", "created_at"]),
			models.Index(fields=["owner", "created_at"]),
			models.Index(fields=["urgency_level", "created_at"]),
		]

	def __str__(self) -> str:
		return self.title


class ProjectAttachment(models.Model):
	project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="attachments")
	file = models.FileField(upload_to="projects/attachments/%Y/%m/%d/")
	original_name = models.CharField(max_length=255, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self) -> str:
		return self.original_name or self.file.name

	def save(self, *args, **kwargs):
		if not self.original_name and self.file:
			self.original_name = self.file.name.rsplit("/", 1)[-1]
		super().save(*args, **kwargs)
