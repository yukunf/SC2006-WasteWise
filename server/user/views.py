# user/views.py

from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import action
from rest_framework import viewsets

from server.user.serializers import RegisterGeneralUserSerializer


class GeneralUserViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        serializer = RegisterGeneralUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # set username=email
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)

        if user is not None:
            try:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'email': user.email, 'user_id': user.id},
                                status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Error during token creation: {e}")
                return Response({'error': 'Token creation failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class CollectorUserViewSet(viewsets.ModelViewSet):
#     queryset = CollectorUser.objects.all()
#     serializer_class = CollectorUser
