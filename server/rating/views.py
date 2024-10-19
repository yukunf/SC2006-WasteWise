from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Ratings
from .serializers import RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Ratings.objects.all()
    serializer_class = RatingSerializer

    def get_permissions(self):
        """
        Allow public (unauthenticated) access for GET requests,
        but restrict other methods (POST, PUT, DELETE) to authenticated users.
        """
        if self.action in ['list', 'retrieve', 'get_ratings_for_collector', 'get_all_ratings', 'get_ratings_by_user']:
            return [AllowAny()]  # Public access for GET requests
        return [IsAuthenticated()]  # Require authentication for other requests

    @action(detail=False, methods=['post'], url_path='rating')
    def create_rating(self, request):
        serializer = RatingSerializer(data=request.data)
        
        if serializer.is_valid():
            rating_instance = serializer.save()
            user_id = request.data.get('userID')
            collector_id = request.data.get('collectorID')

            print(f"Rating created with collector ID: {collector_id} for user ID: {user_id}")

            return Response({'message': 'Rating created successfully', 'rating': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='collector/(?P<collector_id>[^/.]+)')
    def get_ratings_for_collector(self, request, collector_id=None):
        ratings = Ratings.objects.filter(collectorID=collector_id)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='ratings')
    def get_all_ratings(self, request):
        ratings = self.queryset
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='(?P<user_id>[^/.]+)')
    def get_ratings_by_user(self, request, user_id=None):
        ratings = Ratings.objects.filter(userID=user_id)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

