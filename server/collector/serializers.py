# serializers.py
from rest_framework import serializers
from .models import Collector

class CollectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collector
        fields = '__all__'