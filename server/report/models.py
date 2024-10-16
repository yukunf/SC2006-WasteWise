from django.db import models
from django.contrib.auth.models import User

class UserReport(models.Model):
    collector = models.CharField(max_length=255)  # Name or ID of the collector
    reason = models.CharField(max_length=255)     # Reason for the report
    comments = models.TextField(blank=True, null=True)  # Optional comments
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # The user submitting the report
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of when the report was created

    def __str__(self):
        return f"Report on {self.collector} by {self.user.username}"
