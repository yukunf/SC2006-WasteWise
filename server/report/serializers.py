from rest_framework import serializers
from .models import UserReport

class UserReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReport
        fields = ['collector', 'reason', 'comments', 'created_at']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        return super().create(validated_data)
