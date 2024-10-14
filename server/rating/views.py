from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Ratings
from .serializers import RatingSerializer
from .models import UserReport

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Ratings.objects.all()
    serializer_class = RatingSerializer

    # Automatically assigns the user who is submitting the rating
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Additional custom action to retrieve ratings for a specific collector
    @action(detail=False, methods=['get'], url_path='collector/(?P<collector_name>[^/.]+)')
    def get_ratings_for_collector(self, request, collector_name=None):
        ratings = Ratings.objects.filter(collector=collector_name)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # You can also add more custom actions or endpoints as needed


from .serializers import ReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = UserReport.objects.all()
    serializer_class = ReportSerializer

    # Automatically assigns the user who is submitting the report
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # Custom action to retrieve reports for a specific collector
    @action(detail=False, methods=['get'], url_path='collector/(?P<collector_name>[^/.]+)')
    def get_reports_for_collector(self, request, collector_name=None):
        reports = UserReport.objects.filter(collector=collector_name)
        serializer = self.get_serializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
