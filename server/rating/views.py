from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Ratings
from .serializers import RatingSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Ratings.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValueError("User must be authenticated to create a rating.")
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='collector/(?P<collector_id>[^/.]+)')
    def get_ratings_for_collector(self, request, collector_id=None):
        ratings = Ratings.objects.filter(collector_id=collector_id)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
