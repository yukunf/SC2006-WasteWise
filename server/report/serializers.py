from rest_framework import serializers
from .models import UserReport

class UserReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReport
        fields = ['id', 'collector', 'reason', 'comments', 'created_at', 'user']
        read_only_fields = ['created_at', 'user']  # Make 'user' read-only as it is set automatically

    def create(self, validated_data):
        # The user will be set in the view, so remove it from validated_data if present
        validated_data.pop('user', None)
        return super().create(validated_data)
