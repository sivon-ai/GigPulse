from __future__ import annotations

from django.conf import settings
from django.db import models

from apps.projects.models import Project


class ProposalStatus(models.TextChoices):
	SUBMITTED = "submitted", "Submitted"
	SHORTLISTED = "shortlisted", "Shortlisted"
	ACCEPTED = "accepted", "Accepted"
	REJECTED = "rejected", "Rejected"
	WITHDRAWN = "withdrawn", "Withdrawn"


class Proposal(models.Model):
	project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="proposals")
	freelancer = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="proposals",
	)

	cover_letter = models.TextField(blank=True)
	bid_amount = models.DecimalField(max_digits=12, decimal_places=2)
	estimated_timeline_days = models.PositiveIntegerField(null=True, blank=True)

	status = models.CharField(max_length=16, choices=ProposalStatus.choices, default=ProposalStatus.SUBMITTED)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("-created_at",)
		constraints = [
			models.UniqueConstraint(fields=["project", "freelancer"], name="uniq_proposal_project_freelancer")
		]
		indexes = [
			models.Index(fields=["project", "created_at"]),
			models.Index(fields=["freelancer", "created_at"]),
			models.Index(fields=["status", "created_at"]),
		]

	def __str__(self) -> str:
		return f"Proposal {self.id} for {self.project_id}"


class ProposalNegotiationMessage(models.Model):
	proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE, related_name="negotiations")
	sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="proposal_messages")

	message = models.TextField()
	proposed_bid_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
	proposed_timeline_days = models.PositiveIntegerField(null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("created_at",)

	def __str__(self) -> str:
		return f"NegotiationMessage {self.id}"


class ContractStatus(models.TextChoices):
	ACTIVE = "active", "Active"
	COMPLETED = "completed", "Completed"
	CANCELLED = "cancelled", "Cancelled"
	DISPUTED = "disputed", "Disputed"


class Contract(models.Model):
	project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="contract")
	proposal = models.OneToOneField(Proposal, on_delete=models.SET_NULL, null=True, blank=True, related_name="contract")

	client = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="client_contracts",
	)
	freelancer = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.CASCADE,
		related_name="freelancer_contracts",
	)

	agreed_amount = models.DecimalField(max_digits=12, decimal_places=2)
	status = models.CharField(max_length=16, choices=ContractStatus.choices, default=ContractStatus.ACTIVE)

	started_at = models.DateTimeField(auto_now_add=True)
	completed_at = models.DateTimeField(null=True, blank=True)

	class Meta:
		ordering = ("-started_at",)
		indexes = [
			models.Index(fields=["client", "started_at"]),
			models.Index(fields=["freelancer", "started_at"]),
			models.Index(fields=["status", "started_at"]),
		]

	def __str__(self) -> str:
		return f"Contract {self.id}"


class MilestoneStatus(models.TextChoices):
	PENDING = "pending", "Pending"
	FUNDED = "funded", "Funded"
	RELEASED = "released", "Released"
	COMPLETED = "completed", "Completed"


class Milestone(models.Model):
	contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name="milestones")
	title = models.CharField(max_length=200)
	description = models.TextField(blank=True)
	amount = models.DecimalField(max_digits=12, decimal_places=2)
	due_date = models.DateField(null=True, blank=True)

	status = models.CharField(max_length=16, choices=MilestoneStatus.choices, default=MilestoneStatus.PENDING)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ("created_at",)
		indexes = [models.Index(fields=["contract", "created_at"])]

	def __str__(self) -> str:
		return self.title
