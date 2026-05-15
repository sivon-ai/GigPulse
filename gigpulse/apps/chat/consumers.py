from __future__ import annotations

from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """WebSocket consumer for real-time chat.

    This is scaffolded now; message semantics are implemented in later steps.
    """

    async def connect(self):
        user = self.scope.get("user")
        if user is None or not user.is_authenticated:
            await self.close(code=4401)
            return

        room_id = self.scope.get("url_route", {}).get("kwargs", {}).get("room_id")
        if not room_id:
            # Support query-string based room selection: /ws/chat/?room_id=...
            room_id = self.scope.get("query_string", b"").decode("utf-8")

        self.room_group_name = f"chat:{room_id or 'lobby'}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "room_group_name"):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        # Echo for now; real protocol implemented later.
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat.message", "payload": content},
        )

    async def chat_message(self, event):
        await self.send_json(event.get("payload", {}))
