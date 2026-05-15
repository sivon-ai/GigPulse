from django.contrib import admin

from .models import Certificate, PortfolioItem, WorkHistory


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
	list_display = ("title", "user", "is_public", "created_at")
	list_filter = ("is_public",)
	search_fields = ("title", "description", "user__email", "user__username")
	raw_id_fields = ("user",)


@admin.register(WorkHistory)
class WorkHistoryAdmin(admin.ModelAdmin):
	list_display = ("company", "title", "user", "start_date", "end_date", "is_public")
	list_filter = ("is_public",)
	search_fields = ("company", "title", "user__email", "user__username")
	raw_id_fields = ("user",)


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
	list_display = ("name", "issuer", "user", "issue_date", "expiry_date", "is_public")
	list_filter = ("is_public",)
	search_fields = ("name", "issuer", "user__email", "user__username")
	raw_id_fields = ("user",)
