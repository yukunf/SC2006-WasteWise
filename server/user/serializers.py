# user/serializer.py

from rest_framework import serializers
from .models import User, CollectorUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'email', 'password', 'termsAgreed', 'role']


class CollectorUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectorUser
        fields = UserSerializer.Meta.fields + ['collector_id']
