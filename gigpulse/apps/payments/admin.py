from django.contrib import admin
from .models import PaymentTransaction, Payout


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
	list_display = ("id", "payer", "amount", "currency", "status", "created_at")
	list_filter = ("status", "currency")
	raw_id_fields = ("payer",)


@admin.register(Payout)
class PayoutAdmin(admin.ModelAdmin):
	list_display = ("id", "recipient", "amount", "currency", "processed", "created_at")
	list_filter = ("processed", "currency")
	raw_id_fields = ("recipient",)
