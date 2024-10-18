
# reports/serializers.py
from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id', 'userID', 'user_name', 'user_email',
            'collector_id', 'collector_name', 'collector_email', 'collector_address',
            'reason', 'comments', 'created_at'
        ]
