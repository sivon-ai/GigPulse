from __future__ import annotations

from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PaymentTransactionViewSet, payment_webhook

router = DefaultRouter()
router.register("transactions", PaymentTransactionViewSet, basename="transaction")

urlpatterns = router.urls + [path("webhook/", payment_webhook, name="payment-webhook")]
