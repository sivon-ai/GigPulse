from django.contrib import admin

from .models import Contract, Milestone, Proposal, ProposalNegotiationMessage


@admin.register(Proposal)
class ProposalAdmin(admin.ModelAdmin):
	list_display = ("id", "project", "freelancer", "bid_amount", "status", "created_at")
	list_filter = ("status",)
	search_fields = (
		"project__title",
		"freelancer__email",
		"freelancer__username",
	)
	raw_id_fields = ("project", "freelancer")


@admin.register(ProposalNegotiationMessage)
class ProposalNegotiationMessageAdmin(admin.ModelAdmin):
	list_display = ("id", "proposal", "sender", "created_at")
	raw_id_fields = ("proposal", "sender")


class MilestoneInline(admin.TabularInline):
	model = Milestone
	extra = 0


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
	list_display = ("id", "project", "client", "freelancer", "agreed_amount", "status", "started_at")
	list_filter = ("status",)
	raw_id_fields = ("project", "proposal", "client", "freelancer")
	inlines = [MilestoneInline]
