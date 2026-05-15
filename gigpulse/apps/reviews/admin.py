from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
	list_display = ("id", "contract", "review_from", "review_to", "rating", "created_at")
	list_filter = ("rating",)
	search_fields = (
		"review_from__email",
		"review_from__username",
		"review_to__email",
		"review_to__username",
	)
	raw_id_fields = ("contract", "review_from", "review_to")
