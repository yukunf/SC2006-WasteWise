# reports/models.py
from django.db import models

class Report(models.Model):
    userID = models.IntegerField()  # Store the user's ID as an integer
    user_name = models.CharField(max_length=255, null=True)  # User's name
    user_email = models.EmailField(null=True)  # User's email

    collector_id = models.IntegerField()  # Collector's ID
    collector_name = models.CharField(max_length=255, null=True)  # Collector's name
    collector_telephone = models.CharField(max_length=255)  # Collector's email
    collector_address = models.CharField(max_length=255, null=True)  # Collector's address

    reason = models.CharField(max_length=255)  # Reason for the report
    comments = models.TextField()  # User's comments about the report
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set to now when the report is created

    def __str__(self):
        return f'Report on {self.collector_name} by {self.user_name}'
