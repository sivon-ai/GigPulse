from __future__ import annotations

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import Notification
from .serializers import NotificationSerializer


def send_user_notification(*, recipient_id: int, actor_id: int | None = None, verb: str, description: str = "", link: str = "", data: dict | None = None, level: str = "info") -> Notification:
    data = data or {}
    notif = Notification.objects.create(
        recipient_id=recipient_id,
        actor_id=actor_id,
        verb=verb,
        description=description,
        link=link,
        data=data,
        level=level,
    )

    channel_layer = get_channel_layer()
    group_name = f"notifications:{recipient_id}"
    payload = NotificationSerializer(notif).data

    async_to_sync(channel_layer.group_send)(group_name, {"type": "notify", "payload": payload})
    return notif
