from rest_framework import viewsets
from .models import UserReport
from .serializers import UserReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = UserReport.objects.all()
    serializer_class = UserReportSerializer

    def perform_create(self, serializer):
        serializer.save()
