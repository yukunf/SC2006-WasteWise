import os

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ratings

User = get_user_model()

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['collectorID', 'rating', 'comments', 'userID', 'userName', 'created_at']
        # read_only_fields = ['created_at', 'user']
    
    def create(self, validated_data):
        user_id = validated_data.pop('userID', None)  # Extract userID from request data
        
        # Assign userID to the validated data
        validated_data['userID'] = user_id  # Use userID as is

        # Create and return the Rating instance
        return super().create(validated_data)
        # user = self.context['request'].user
        # validated_data['user'] = user
        # return super().create(validated_data)
    

