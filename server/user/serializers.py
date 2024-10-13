# user/serializer.py
from rest_framework import serializers

# from .models import GeneralUser
#
#
# class GeneralUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneralUser
#         fields = ['email', 'password', 'first_name', 'last_name', 'role']
#
#
# class RegisterGeneralUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeneralUser
#         fields = ['email', 'password', 'first_name', 'last_name', 'role']
#
#     def create(self, validated_data):
#         # 使用 email 作为 username
#         user = User.objects.create_user(
#             username=validated_data['email'],
#             email=validated_data['email'],
#             password=validated_data['password'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#         )
#         return user

# class CollectorUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CollectorUser
#         fields = UserSerializer.Meta.fields + ['collector_id']

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserProfile._meta.get_field('role').choices)
    collector_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'role', 'collector_id']
        #extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})  # Fussy now... they are stored in external table
        role = validated_data.pop('role')
        collector_id = validated_data.pop('collector_id', None)

        user = User.objects.create_user(
            username=validated_data['email'],  # Set username=email
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
        )

        # Create Extension Table
        UserProfile.objects.create(user=user, role=role, collector_id=collector_id)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        role = profile_data.get('role')
        collector_id = profile_data.get('collector_id')
        # Get our fields also

        # Update User
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update UserProfile
        profile = instance.profile
        if role:
            profile.role = role
        if collector_id is not None:
            profile.collector_id = collector_id
        profile.save()

        return instance
