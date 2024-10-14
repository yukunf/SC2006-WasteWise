from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Ratings(models.Model):
    collectorID = models.IntegerField()
    rating = models.IntegerField()
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
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
