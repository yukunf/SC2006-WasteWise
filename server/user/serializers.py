import os

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserProfile._meta.get_field('role').choices, required=False)
    collector_company = serializers.CharField(required=False, allow_null=True)
    collector_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'collector_company', 'role', 'collector_id']
        #extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},  # Not Required for partial update
            'role': {'required': False, 'allow_null': True},  # role can be null
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})  # Fussy now... they are stored in external table
        role = validated_data.pop('role')
        collector_company = validated_data.pop('collector_company', None)
        collector_id = validated_data.pop('collector_id', None)

        user = User.objects.create_user(
            username=validated_data['email'],  # Set username=email
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
        )

        # Create Extension Table
        UserProfile.objects.get_or_create(user=user, defaults={'role': role, 'collector_id': collector_id, 'collector_company' : collector_company})
        return user

    def update(self, instance, validated_data):
        print("in update():" + str(validated_data))
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update UserProfile
        profile, created = UserProfile.objects.get_or_create(user=instance)

        #
        role = validated_data.get('role')
        collector_id = validated_data.get('collector_id')

        # Update profile

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)  # 使用 set_password 处理密码哈希
        instance.save()


        if role:
            profile.role = role
        if collector_id is not None:
            profile.collector_id = collector_id
        profile.save()

        return instance
