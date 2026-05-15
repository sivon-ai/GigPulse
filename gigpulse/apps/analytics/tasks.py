from __future__ import annotations

from datetime import date, timedelta

from celery import shared_task
from django.db import transaction

from .models import MarketMetric
from apps.projects.models import Project
from apps.recommendations import utils as rec_utils


@shared_task(bind=True)
def compute_daily_market_metrics(self) -> str:
    today = date.today()
    # Simple example metrics: open_projects_count, avg_budget
    open_projects = Project.objects.filter(status="open").count()
    avg_budget = (
        Project.objects.filter(budget_min__isnull=False).aggregate(models.Avg("budget_min"))["budget_min__avg"]
        or 0.0
    )

    with transaction.atomic():
        MarketMetric.objects.update_or_create(
            date=today,
            name="open_projects_count",
            defaults={"value": float(open_projects), "data": {"count": open_projects}},
        )
        MarketMetric.objects.update_or_create(
            date=today,
            name="avg_budget",
            defaults={"value": float(avg_budget), "data": {"avg": avg_budget}},
        )

    return "ok"


@shared_task(bind=True)
def generate_recommendations_for_user(self, user_id: int) -> str:
    # Delegate to recommendations utils (fast heuristic for now)
    rec_utils.generate_recommendations(user_id)
    return "ok"
