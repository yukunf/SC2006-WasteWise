# user/views.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
# from django.shortcuts import render
#
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate
# from rest_framework.decorators import action
# from rest_framework import viewsets

# from .models import GeneralUser
# from .serializers import RegisterGeneralUserSerializer, GeneralUserSerializer
#
#
# class GeneralUserViewSet(viewsets.ViewSet):
#     queryset = GeneralUser.objects.all()
#     serializer_class = GeneralUserSerializer
#
#     @action(detail=False, methods=['post'], url_path='register')
#     def register(self, request):
#         serializer = RegisterGeneralUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  # set username=email
#             return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     @action(detail=False, methods=['post'], url_path='login')
#     def login(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#
#         if not email or not password:
#             return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
#
#         user = authenticate(request, username=email, password=password)
#
#         if user is not None:
#             try:
#                 token, created = Token.objects.get_or_create(user=user)
#                 return Response({'token': token.key, 'email': user.email, 'user_id': user.id},
#                                 status=status.HTTP_200_OK)
#             except Exception as e:
#                 print(f"Error during token creation: {e}")
#                 return Response({'error': 'Token creation failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class CollectorUserViewSet(viewsets.ModelViewSet):
#     queryset = CollectorUser.objects.all()
#     serializer_class = CollectorUser
# views.py
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from .serializers import RegisterSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  #
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Use email as username
        user = authenticate(request, username=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'email': user.email, 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # def get_object(self):
    #     username = self.kwargs.get("pk")  # Get username
    #     return get_object_or_404(User, username=username)  # Find object by username
    @action(detail=True, methods=['put'], url_path='updateall')
    def update_user(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], url_path='update')
    def partial_update_user(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User partially updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_user(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
