from __future__ import annotations

from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import PaymentTransaction
from .serializers import PaymentTransactionSerializer


class PaymentTransactionViewSet(viewsets.ReadOnlyModelViewSet):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = PaymentTransactionSerializer
	queryset = PaymentTransaction.objects.all()

	def get_queryset(self):
		return self.queryset.filter(payer=self.request.user)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def payment_webhook(request):
	# Placeholder: process provider webhook (e.g., Stripe).
	# We'll validate and update PaymentTransaction.status accordingly.
	payload = request.data
	# In a real implementation, verify signature and map provider event -> transaction
	return Response({"received": True}, status=status.HTTP_200_OK)
