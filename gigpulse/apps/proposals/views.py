from __future__ import annotations

from django.db import models, transaction
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response

from apps.core.permissions import IsClient, IsFreelancer
from apps.projects.models import Project, ProjectStatus

from .models import Contract, ContractStatus, Milestone, Proposal, ProposalStatus
from .serializers import (
	ContractSerializer,
	MilestoneSerializer,
	ProposalCreateSerializer,
	ProposalNegotiationMessageSerializer,
	ProposalReadSerializer,
	ProposalSetStatusSerializer,
	ProposalUpdateSerializer,
)


def _recount_project_proposals(project: Project) -> None:
	count = project.proposals.exclude(status=ProposalStatus.WITHDRAWN).count()
	Project.objects.filter(id=project.id).update(proposal_count=count)


class ProposalViewSet(viewsets.ModelViewSet):
	permission_classes = [permissions.IsAuthenticated]
	queryset = Proposal.objects.select_related("project", "freelancer", "project__owner").all()
	ordering_fields = ("created_at", "bid_amount")
	ordering = ("-created_at",)

	def get_queryset(self):
		qs = super().get_queryset()
		user = self.request.user

		if getattr(user, "role", None) == "freelancer":
			return qs.filter(freelancer=user)

		if getattr(user, "role", None) == "client":
			return qs.filter(project__owner=user)

		return qs.none()

	def get_serializer_class(self):
		if self.action == "create":
			return ProposalCreateSerializer
		if self.action in ("update", "partial_update"):
			return ProposalUpdateSerializer
		return ProposalReadSerializer

	def get_permissions(self):
		if self.action == "create":
			return [permissions.IsAuthenticated(), IsFreelancer()]
		return super().get_permissions()

	@transaction.atomic
	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		project_id = serializer.validated_data["project_id"]
		project = get_object_or_404(Project, id=project_id)

		if project.status != ProjectStatus.OPEN:
			raise ValidationError({"project_id": "Project is not open for proposals."})

		if project.owner_id == request.user.id:
			raise ValidationError({"project_id": "You cannot propose on your own project."})

		proposal = Proposal.objects.create(
			project=project,
			freelancer=request.user,
			cover_letter=serializer.validated_data.get("cover_letter", ""),
			bid_amount=serializer.validated_data["bid_amount"],
			estimated_timeline_days=serializer.validated_data.get("estimated_timeline_days"),
		)

		_recount_project_proposals(project)

		return Response(ProposalReadSerializer(proposal).data, status=status.HTTP_201_CREATED)

	def update(self, request, *args, **kwargs):
		proposal = self.get_object()
		if proposal.freelancer_id != request.user.id:
			raise PermissionDenied("Only the proposal author may edit it.")
		if proposal.status not in (ProposalStatus.SUBMITTED, ProposalStatus.SHORTLISTED):
			raise ValidationError({"status": "Proposal can no longer be edited."})
		return super().update(request, *args, **kwargs)

	@action(detail=True, methods=["post"], url_path="set-status")
	@transaction.atomic
	def set_status(self, request, pk=None):
		proposal = self.get_object()
		serializer = ProposalSetStatusSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		new_status = serializer.validated_data["status"]

		is_client_owner = proposal.project.owner_id == request.user.id
		is_freelancer_owner = proposal.freelancer_id == request.user.id

		if new_status == ProposalStatus.WITHDRAWN:
			if not is_freelancer_owner:
				raise PermissionDenied("Only the freelancer can withdraw a proposal.")
		else:
			if not is_client_owner:
				raise PermissionDenied("Only the project owner can change this proposal's status.")

		proposal.status = new_status
		proposal.save(update_fields=["status", "updated_at"])

		if new_status == ProposalStatus.ACCEPTED:
			# Ensure contract exists
			Contract.objects.get_or_create(
				project=proposal.project,
				defaults={
					"proposal": proposal,
					"client": proposal.project.owner,
					"freelancer": proposal.freelancer,
					"agreed_amount": proposal.bid_amount,
					"status": ContractStatus.ACTIVE,
				},
			)
			Project.objects.filter(id=proposal.project_id).update(status=ProjectStatus.IN_PROGRESS)

		_recount_project_proposals(proposal.project)
		return Response(ProposalReadSerializer(proposal).data)

	@action(detail=True, methods=["get", "post"], url_path="negotiations")
	@transaction.atomic
	def negotiations(self, request, pk=None):
		proposal = self.get_object()

		is_client_owner = proposal.project.owner_id == request.user.id
		is_freelancer_owner = proposal.freelancer_id == request.user.id
		if not (is_client_owner or is_freelancer_owner):
			raise PermissionDenied("Not allowed.")

		if request.method == "GET":
			data = ProposalNegotiationMessageSerializer(proposal.negotiations.all(), many=True).data
			return Response(data)

		serializer = ProposalNegotiationMessageSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		msg = proposal.negotiations.create(sender=request.user, **serializer.validated_data)
		return Response(ProposalNegotiationMessageSerializer(msg).data, status=status.HTTP_201_CREATED)


class ContractViewSet(viewsets.ReadOnlyModelViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = ContractSerializer
	queryset = Contract.objects.select_related("project", "client", "freelancer", "proposal").prefetch_related(
		"milestones"
	)

	def get_queryset(self):
		qs = super().get_queryset()
		user = self.request.user
		return qs.filter(models.Q(client=user) | models.Q(freelancer=user))

	@action(detail=True, methods=["get", "post"], url_path="milestones")
	@transaction.atomic
	def milestones(self, request, pk=None):
		contract = self.get_object()

		if request.method == "GET":
			return Response(MilestoneSerializer(contract.milestones.all(), many=True).data)

		if contract.client_id != request.user.id:
			raise PermissionDenied("Only the client may create milestones.")

		serializer = MilestoneSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		milestone = Milestone.objects.create(contract=contract, **serializer.validated_data)
		return Response(MilestoneSerializer(milestone).data, status=status.HTTP_201_CREATED)
