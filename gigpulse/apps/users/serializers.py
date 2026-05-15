from __future__ import annotations

from django.contrib.auth import password_validation
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.skills.models import Skill

from .models import User, UserRole


class UserMeSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(
        many=True,
        slug_field="slug",
        queryset=Skill.objects.filter(is_active=True),
        required=False,
    )

    class Meta:
        model = User
        fields = (
            "id",
            "full_name",
            "username",
            "email",
            "avatar",
            "bio",
            "skills",
            "hourly_rate",
            "location",
            "availability",
            "social_links",
            "portfolio_links",
            "verification_status",
            "profile_completion_percentage",
            "role",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "email",
            "verification_status",
            "profile_completion_percentage",
            "created_at",
            "updated_at",
        )


class PublicUserSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(many=True, slug_field="slug", read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "full_name",
            "username",
            "avatar",
            "bio",
            "skills",
            "hourly_rate",
            "location",
            "availability",
            "social_links",
            "portfolio_links",
            "verification_status",
            "profile_completion_percentage",
            "role",
        )
        read_only_fields = fields


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=UserRole.choices, default=UserRole.FREELANCER)

    class Meta:
        model = User
        fields = ("email", "username", "full_name", "password", "role")

    def validate_role(self, value: str):
        if value == UserRole.ADMIN:
            raise serializers.ValidationError("Role 'admin' cannot be self-assigned.")
        return value

    def validate_password(self, value: str):
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        return User.objects.create_user(password=password, **validated_data)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class VerifyEmailConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()


class PasswordForgotSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value: str):
        password_validation.validate_password(value)
        return value


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_new_password(self, value: str):
        password_validation.validate_password(value)
        return value


class GigPulseTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)
        token["role"] = user.role
        token["username"] = user.username
        token["verification_status"] = user.verification_status
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserMeSerializer(self.user).data
        return data
