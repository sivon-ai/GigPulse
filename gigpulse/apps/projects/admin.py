from django.contrib import admin

from .models import Project, ProjectAttachment, ProjectCategory


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "slug", "is_active", "created_at")
	list_filter = ("is_active",)
	search_fields = ("name", "slug")


class ProjectAttachmentInline(admin.TabularInline):
	model = ProjectAttachment
	extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
	list_display = (
		"title",
		"owner",
		"status",
		"urgency_level",
		"proposal_count",
		"created_at",
	)
	list_filter = ("status", "urgency_level", "is_featured")
	search_fields = ("title", "description", "owner__email", "owner__username")
	raw_id_fields = ("owner",)
	inlines = [ProjectAttachmentInline]
