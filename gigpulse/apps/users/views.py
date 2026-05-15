from __future__ import annotations

from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from datetime import timedelta

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

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		data = serializer.validated_data
		# data usually contains 'access' and 'refresh'
		access = data.get("access")
		refresh = data.get("refresh")
		user_data = UserMeSerializer(self.user).data if hasattr(self, "user") else UserMeSerializer(self.get_serializer().user).data

		response = Response({"access": access, "user": user_data}, status=status.HTTP_200_OK)
		# set refresh token as HttpOnly cookie
		if refresh:
			lifetime = getattr(settings, "SIMPLE_JWT", {}).get("REFRESH_TOKEN_LIFETIME")
			max_age = int(lifetime.total_seconds()) if isinstance(lifetime, timedelta) else None
			secure = not settings.DEBUG
			response.set_cookie(
				"refresh",
				refresh,
				httponly=True,
				secure=secure,
				samesite="Lax",
				max_age=max_age,
			)
		return response


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
		access = str(refresh.access_token)
		user_data = UserMeSerializer(user).data
		output = {"user": user_data, "access": access}
		headers = self.get_success_headers(serializer.data)
		response = Response(output, status=status.HTTP_201_CREATED, headers=headers)
		# set refresh cookie
		lifetime = getattr(settings, "SIMPLE_JWT", {}).get("REFRESH_TOKEN_LIFETIME")
		max_age = int(lifetime.total_seconds()) if isinstance(lifetime, timedelta) else None
		secure = not settings.DEBUG
		response.set_cookie(
			"refresh",
			str(refresh),
			httponly=True,
			secure=secure,
			samesite="Lax",
			max_age=max_age,
		)
		return response


class LogoutView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		# attempt to blacklist refresh token provided in body
		serializer = LogoutSerializer(data=request.data)
		serializer.is_valid(raise_exception=False)
		refresh = serializer.validated_data.get("refresh") if serializer.is_valid() else None
		if not refresh:
			# fallback to cookie
			refresh = request.COOKIES.get("refresh")
		if refresh:
			token = RefreshToken(refresh)
			token.blacklist()
		response = Response(status=status.HTTP_204_NO_CONTENT)
		# delete cookie
		response.delete_cookie("refresh")
		return response


class CookieTokenRefreshView(TokenRefreshView):
	"""Read refresh token from cookie if not provided in POST body."""

	def post(self, request, *args, **kwargs):
		data = request.data.copy() if hasattr(request, "data") else {}
		if "refresh" not in data:
			cookie_refresh = request.COOKIES.get("refresh")
			if cookie_refresh:
				data["refresh"] = cookie_refresh
		serializer = self.get_serializer(data=data)
		serializer.is_valid(raise_exception=True)
		return Response(serializer.validated_data, status=status.HTTP_200_OK)


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
