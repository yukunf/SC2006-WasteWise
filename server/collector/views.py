# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Collector
from .serializers import CollectorSerializer


class CollectorViewSet(viewsets.ModelViewSet):
    queryset = Collector.objects.all()
    serializer_class = CollectorSerializer

    # Custom action to suspend a collector
    @action(detail=True, methods=['patch'], url_path='suspend')
    def suspend_collector(self, request, pk=None):
        collector = self.get_object()  # Get the collector instance by primary key (pk)
        collector.suspended = True
        collector.save()

        return Response({'message': 'Collector suspended successfully'}, status=status.HTTP_200_OK)
