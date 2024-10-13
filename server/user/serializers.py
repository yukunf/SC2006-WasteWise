# user/serializer.py
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import GeneralUser


class GeneralUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralUser
        fields = ['email', 'password', 'first_name', 'last_name', 'role']


class RegisterGeneralUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralUser
        fields = ['email', 'password', 'first_name', 'last_name', 'role']

    def create(self, validated_data):
        # 使用 email 作为 username
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user

# class CollectorUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CollectorUser
#         fields = UserSerializer.Meta.fields + ['collector_id']
