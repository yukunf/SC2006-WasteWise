# report/tests.py
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import Report

class ReportAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()
        # Sample data for creating a report
        self.report_data = {
            "userID": 1,
            "user_name": "John Doe",
            "user_email": "johndoe@example.com",
            "collector_id": 101,
            "collector_name": "Sample Collector",
            "collector_telephone": "123-456-7890",
            "collector_address": "123 Collector Street",
            "reason": "Poor service",
            "comments": "The collector was very late.",
        }
        # Create an initial report in the database
        self.report = Report.objects.create(**self.report_data)
        self.report_id = self.report.id  # Store the ID for testing

    def test_create_report(self):
        """Test creating a report with valid data."""
        response = self.client.post('/api/reports/submit/', self.report_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)

    def test_create_report_invalid_data(self):
        """Test creating a report with invalid data (missing required fields)."""
        invalid_data = {}  # No required fields provided
        response = self.client.post('/api/reports/submit/', invalid_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_reports(self):
        """Test retrieving a list of reports."""
        response = self.client.get('/api/reports/list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.json(), list)
        self.assertGreater(len(response.json()), 0)  # Ensure there's at least one report

    def test_view_report(self):
        """Test retrieving a single report."""
        response = self.client.get(f'/api/reports/{self.report_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['collector_name'], self.report.collector_name)

    def test_mark_report_contacted(self):
        """Test marking a report (and its related reports) as contacted."""
        response = self.client.patch(f'/api/reports/{self.report_id}/contact/', content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Report.objects.filter(id=self.report_id, contacted=True).exists())

    def test_mark_report_completed(self):
        """Test marking a report (and its related reports) as completed."""
        response = self.client.patch(f'/api/reports/{self.report_id}/complete/', content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Report.objects.filter(id=self.report_id, completed=True).exists())
