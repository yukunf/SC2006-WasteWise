# user/serializer.py
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'email', 'password', 'termsAgreed', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'termsAgreed', 'role']

    def create(self, validated_data):
        # 使用 email 作为 username
        user = User.objects.create_user(
            username=validated_data['email'],  # 自动生成用户名
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# class CollectorUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CollectorUser
#         fields = UserSerializer.Meta.fields + ['collector_id']
