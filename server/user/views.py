# user/views.py

from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import *
from .serializers import UserSerializer

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token  
from rest_framework.decorators import action




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({"error": "A user with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        print("User created:", request.data)
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            print(f"User found: {user}")
        except User.DoesNotExist:
            print("User not found.")

        # Authenticate the user using username field as email
        user = authenticate(request, username=email, password=password)


        print(f"tryna log in {email}", user)

        print("Type of user object:", type(user))

        if user is not None:
            # Generate a token for the user
            print("Authenticated User:", user)  # Print user details
            token, created = Token.objects.get_or_create(user=user)
            # login(request, user)
            return Response({'token': token.key, 'email': user.email, 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            print("Authentication failed for email:", email)  # Print error message
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CollectorUserViewSet(viewsets.ModelViewSet):
    queryset = CollectorUser.objects.all()
    serializer_class = CollectorUser
