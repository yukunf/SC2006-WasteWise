from django.db import models
from django.contrib.auth.models import User

class UserReport(models.Model):
    collector = models.CharField(max_length=255)
    reason = models.CharField(max_length=255)
    comments = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report against {self.collector} by {self.user.username}"


class Ratings(models.Model):
    collectorID = models.IntegerField()
    rating = models.IntegerField()
    comment = models.TextField()
    userID = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rating by {self.userID} with value {self.rating}"

class Total_Ratings(models.Model):
    ratings = models.ManyToManyField(Ratings)
    average_rating = models.FloatField(default=0.0)

    def calculate_average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            total = sum(rating.rating for rating in ratings)
            self.average_rating = total / ratings.count()
        else:
            self.average_rating = 0

        self.save()

    def __str__(self):
        return f"Average rating: {self.average_rating}"
