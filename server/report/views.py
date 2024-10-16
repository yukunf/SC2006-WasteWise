from rest_framework import viewsets, permissions
from .models import UserReport
from .serializers import UserReportSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = UserReport.objects.all()
    serializer_class = UserReportSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure that only authenticated users can create reports

    def perform_create(self, serializer):
        # Save the report with the authenticated user
        serializer.save(user=self.request.user)
