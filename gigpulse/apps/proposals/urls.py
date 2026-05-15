from __future__ import annotations

from rest_framework.routers import DefaultRouter

from .views import ContractViewSet, ProposalViewSet

router = DefaultRouter()
router.register("proposals", ProposalViewSet, basename="proposal")
router.register("contracts", ContractViewSet, basename="contract")

urlpatterns = router.urls
