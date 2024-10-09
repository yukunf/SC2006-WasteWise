from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CollectorUserViewSet(viewsets.ModelViewSet):
    queryset = CollectorUser.objects.all()
    serializer_class = CollectorUser
