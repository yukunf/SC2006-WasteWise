# reports/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Report
from .serializers import ReportSerializer

@api_view(['POST'])
def submit_report(request):
    user_id = request.data.get('userID')
    if not user_id:
        return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    user_name = request.data.get('user_name')
    user_email = request.data.get('user_email')
    collector_name = request.data.get('collector_name')
    collector_telephone = request.data.get('collector_telephone')
    collector_address = request.data.get('collector_address')

    report_data = {
        'userID': user_id,
        'user_name': user_name,
        'user_email': user_email,
        'collector_id': request.data.get('collector_id'),
        'collector_name': collector_name,
        'collector_telephone': collector_telephone,
        'collector_address': collector_address,
        'reason': request.data.get('reason'),
        'comments': request.data.get('comments'),
    }

    serializer = ReportSerializer(data=report_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def mark_report_contacted(request, pk):
    try:
        report = Report.objects.get(pk=pk)
        report.contacted = True  # Update the contacted status
        report.save()
        return Response({'message': 'Report marked as contacted'}, status=status.HTTP_200_OK)
    except Report.DoesNotExist:
        return Response({'error': 'Report not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_reports(request):
    reports = Report.objects.all()
    serializer = ReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def view_report(request, pk):
    try:
        report = Report.objects.get(pk=pk)
    except Report.DoesNotExist:
        return Response({'error': 'Report not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ReportSerializer(report)
    return Response(serializer.data)

# View to delete a specific report by its ID
#@api_view(['DELETE'])
#def delete_report(request, pk):
#    try:
#        report = Report.objects.get(pk=pk)
#        report.delete()
#        return Response({"message": "Report deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#    except Report.DoesNotExist:
#        return Response({"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)
