from __future__ import annotations

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from apps.proposals.models import Contract

from .models import Review
from .serializers import ReviewCreateSerializer, ReviewReadSerializer

User = get_user_model()


class ReviewViewSet(viewsets.ModelViewSet):
	queryset = Review.objects.select_related("contract", "review_from", "review_to").all()
	serializer_class = ReviewReadSerializer
	http_method_names = ["get", "post", "head", "options"]

	def get_permissions(self):
		if self.action == "create":
			return [permissions.IsAuthenticated()]
		if self.action == "public":
			return [permissions.AllowAny()]
		return [permissions.IsAuthenticated()]

	def get_serializer_class(self):
		if self.action == "create":
			return ReviewCreateSerializer
		return ReviewReadSerializer

	def get_queryset(self):
		qs = super().get_queryset()
		if self.action == "public":
			username = self.kwargs.get("username")
			user = get_object_or_404(User, username=username)
			return qs.filter(review_to=user)
		return qs.filter(review_to=self.request.user)

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		contract = get_object_or_404(Contract, id=serializer.validated_data["contract_id"])
		if request.user.id not in (contract.client_id, contract.freelancer_id):
			raise PermissionDenied("You must be a party to the contract to leave a review.")

		review_to = contract.freelancer if request.user.id == contract.client_id else contract.client
		review = Review.objects.create(
			contract=contract,
			review_from=request.user,
			review_to=review_to,
			rating=serializer.validated_data["rating"],
			comment=serializer.validated_data.get("comment", ""),
		)
		return Response(ReviewReadSerializer(review).data, status=status.HTTP_201_CREATED)

	@action(detail=False, methods=["get"], url_path=r"public/(?P<username>[^/.]+)")
	def public(self, request, username=None):
		qs = self.get_queryset().order_by("-created_at")
		return Response(ReviewReadSerializer(qs, many=True).data)
