from __future__ import annotations

from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import EmailVerificationToken, PasswordResetToken, VerificationStatus
from .serializers import (
	GigPulseTokenObtainPairSerializer,
	LogoutSerializer,
	PasswordChangeSerializer,
	PasswordForgotSerializer,
	PasswordResetConfirmSerializer,
	PublicUserSerializer,
	RegisterSerializer,
	UserMeSerializer,
	VerifyEmailConfirmSerializer,
)
from .tasks import send_password_reset_email_task, send_verification_email_task

User = get_user_model()


class LoginView(TokenObtainPairView):
	serializer_class = GigPulseTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = RegisterSerializer

	@transaction.atomic
	def perform_create(self, serializer):
		user = serializer.save()
		token = EmailVerificationToken.issue(user=user)
		send_verification_email_task.delay(user.id, str(token.token))
		return user

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		user = self.perform_create(serializer)

		refresh = RefreshToken.for_user(user)
		output = {
			"user": UserMeSerializer(user).data,
			"tokens": {
				"refresh": str(refresh),
				"access": str(refresh.access_token),
			},
		}
		headers = self.get_success_headers(serializer.data)
		return Response(output, status=status.HTTP_201_CREATED, headers=headers)


class LogoutView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		serializer = LogoutSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		refresh = serializer.validated_data["refresh"]
		token = RefreshToken(refresh)
		token.blacklist()
		return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(generics.RetrieveUpdateAPIView):
	serializer_class = UserMeSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_object(self):
		return self.request.user


class PublicProfileView(generics.RetrieveAPIView):
	serializer_class = PublicUserSerializer
	permission_classes = [permissions.AllowAny]
	lookup_field = "username"
	queryset = User.objects.all()


class VerifyEmailRequestView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		email = request.data.get("email")
		if not email:
			return Response({"email": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.get(email=email)
		except User.DoesNotExist:
			return Response(status=status.HTTP_204_NO_CONTENT)

		if user.verification_status == VerificationStatus.VERIFIED:
			return Response(status=status.HTTP_204_NO_CONTENT)

		token = EmailVerificationToken.issue(user=user)
		send_verification_email_task.delay(user.id, str(token.token))
		return Response(status=status.HTTP_204_NO_CONTENT)


class VerifyEmailConfirmView(APIView):
	permission_classes = [permissions.AllowAny]

	@transaction.atomic
	def post(self, request):
		serializer = VerifyEmailConfirmSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		token_value = serializer.validated_data["token"]
		token = get_object_or_404(EmailVerificationToken, token=token_value)
		if not token.is_valid():
			return Response({"token": ["Token is invalid or expired."]}, status=status.HTTP_400_BAD_REQUEST)

		token.consume()
		user = token.user
		user.verification_status = VerificationStatus.VERIFIED
		user.save(update_fields=["verification_status"])
		return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordForgotView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = PasswordForgotSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		email = serializer.validated_data["email"]

		try:
			user = User.objects.get(email=email)
		except User.DoesNotExist:
			return Response(status=status.HTTP_204_NO_CONTENT)

		token = PasswordResetToken.issue(user=user)
		send_password_reset_email_task.delay(user.id, str(token.token))
		return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordResetConfirmView(APIView):
	permission_classes = [permissions.AllowAny]

	@transaction.atomic
	def post(self, request):
		serializer = PasswordResetConfirmSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		token_value = serializer.validated_data["token"]
		new_password = serializer.validated_data["new_password"]

		token = get_object_or_404(PasswordResetToken, token=token_value)
		if not token.is_valid():
			return Response({"token": ["Token is invalid or expired."]}, status=status.HTTP_400_BAD_REQUEST)

		user = token.user
		user.set_password(new_password)
		user.save(update_fields=["password"])

		token.consume()
		return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordChangeView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		serializer = PasswordChangeSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		old_password = serializer.validated_data["old_password"]
		new_password = serializer.validated_data["new_password"]

		user: User = request.user
		if not user.check_password(old_password):
			return Response({"old_password": ["Incorrect password."]}, status=status.HTTP_400_BAD_REQUEST)

		user.set_password(new_password)
		user.save(update_fields=["password"])
		return Response(status=status.HTTP_204_NO_CONTENT)
