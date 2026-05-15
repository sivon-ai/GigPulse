from django.contrib import admin

from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
	list_display = ("id", "recipient", "actor", "verb", "level", "unread", "created_at")
	list_filter = ("level", "unread")
	search_fields = ("verb", "description", "recipient__email", "recipient__username")
	raw_id_fields = ("recipient", "actor")
