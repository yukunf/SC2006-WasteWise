from django.shortcuts import render

# views.py
from rest_framework import viewsets
from .models import Collector
from .serializers import CollectorSerializer


class CollectorViewSet(viewsets.ModelViewSet):
    queryset = Collector.objects.all()
    serializer_class = CollectorSerializer
