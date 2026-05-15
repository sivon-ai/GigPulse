from __future__ import annotations

import uuid
from datetime import timedelta

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import UserManager


class UserRole(models.TextChoices):
	FREELANCER = "freelancer", "Freelancer"
	CLIENT = "client", "Client"
	ADMIN = "admin", "Admin"


class Availability(models.TextChoices):
	AVAILABLE = "available", "Available"
	LIMITED = "limited", "Limited"
	UNAVAILABLE = "unavailable", "Unavailable"


class VerificationStatus(models.TextChoices):
	UNVERIFIED = "unverified", "Unverified"
	PENDING = "pending", "Pending"
	VERIFIED = "verified", "Verified"
	REJECTED = "rejected", "Rejected"


class User(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(unique=True)
	username = models.SlugField(max_length=50, unique=True)

	full_name = models.CharField(max_length=255, blank=True)
	avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
	bio = models.TextField(blank=True)

	role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.FREELANCER)

	skills = models.ManyToManyField("skills.Skill", blank=True, related_name="users")
	hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
	location = models.CharField(max_length=255, blank=True)
	availability = models.CharField(
		max_length=20,
		choices=Availability.choices,
		default=Availability.AVAILABLE,
	)

	social_links = models.JSONField(default=dict, blank=True)
	portfolio_links = models.JSONField(default=list, blank=True)

	verification_status = models.CharField(
		max_length=20,
		choices=VerificationStatus.choices,
		default=VerificationStatus.UNVERIFIED,
	)
	profile_completion_percentage = models.PositiveSmallIntegerField(default=0)

	is_staff = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	objects = UserManager()

	USERNAME_FIELD = "email"
	REQUIRED_FIELDS = ["username"]

	class Meta:
		indexes = [
			models.Index(fields=["role"]),
			models.Index(fields=["verification_status"]),
		]

	def __str__(self) -> str:
		return self.email

	def update_profile_completion(self) -> int:
		fields = [
			bool(self.full_name),
			bool(self.username),
			bool(self.email),
			bool(self.avatar),
			bool(self.bio),
			bool(self.location),
			self.hourly_rate is not None,
		]
		completed = sum(1 for f in fields if f)
		return int((completed / len(fields)) * 100)

	def save(self, *args, **kwargs):
		self.profile_completion_percentage = self.update_profile_completion()
		super().save(*args, **kwargs)


class EmailVerificationToken(models.Model):
	user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="email_tokens")
	token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
	created_at = models.DateTimeField(auto_now_add=True)
	expires_at = models.DateTimeField()
	consumed_at = models.DateTimeField(blank=True, null=True)

	class Meta:
		indexes = [
			models.Index(fields=["token"]),
			models.Index(fields=["expires_at"]),
		]

	@classmethod
	def issue(cls, *, user: User, ttl: timedelta | None = None) -> "EmailVerificationToken":
		ttl = ttl or timedelta(hours=48)
		return cls.objects.create(user=user, expires_at=timezone.now() + ttl)

	def is_valid(self) -> bool:
		return self.consumed_at is None and timezone.now() < self.expires_at

	def consume(self) -> None:
		self.consumed_at = timezone.now()
		self.save(update_fields=["consumed_at"])


class PasswordResetToken(models.Model):
	user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="password_reset_tokens")
	token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
	created_at = models.DateTimeField(auto_now_add=True)
	expires_at = models.DateTimeField()
	consumed_at = models.DateTimeField(blank=True, null=True)

	class Meta:
		indexes = [
			models.Index(fields=["token"]),
			models.Index(fields=["expires_at"]),
		]

	@classmethod
	def issue(cls, *, user: User, ttl: timedelta | None = None) -> "PasswordResetToken":
		ttl = ttl or timedelta(hours=2)
		return cls.objects.create(user=user, expires_at=timezone.now() + ttl)

	def is_valid(self) -> bool:
		return self.consumed_at is None and timezone.now() < self.expires_at

	def consume(self) -> None:
		self.consumed_at = timezone.now()
		self.save(update_fields=["consumed_at"])
