import os

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ratings

User = get_user_model()

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['collectorID', 'rating', 'comment', 'user', 'created_at']
        read_only_fields = ['created_at', 'user']
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
    

