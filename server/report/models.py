from django.db import models

# Create your models here.
class Reports(models.Model):
    collectorID = models.IntegerField()
    issue = models.TextField()
    userID = models.TextField()

    def __str__(self):
        return f"Report by {self.userID} of {self.collectorID}"

