# user/models.py
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.db import models
import uuid
from django.contrib.auth.hashers import make_password, check_password



class Role(models.TextChoices):
    GENERAL = 'general', 'General'
    COLLECTOR = 'collector', 'Collector'
    REGULATOR = 'regulator', 'Regulator'


class GeneralUser(AbstractUser):
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GENERAL)




# class User(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     #username = models.CharField(max_length=30, unique=True)
#     firstName = models.CharField(max_length=30)
#     lastName = models.CharField(max_length=30)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=30)
#     termsAgreed = models.BooleanField(default=False)  # Checkbox field
#     role = models.CharField(max_length=20, choices=Role.choices, default=Role.GENERAL)
#
#     REQUIRED_FIELDS = ["firstName","lastName","email", "password","role"]
#     # this thing messes up my login
#     def save(self, *args, **kwargs):
#         if not self.pk:  # Only hash the password if it's a new user
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)
#
#     def check_password(self, raw_password):
#         print("raw pw", raw_password)
#         print("self pw", self.password)
#         if (raw_password == self.password) :
#             return True
#         return False
#
#     # def __str__(self):
#     #     return self.username
#
#     def __str__(self):
#         return f"{self.firstName} {self.lastName} : {self.email}"  # Updated to return full name + email


# class CollectorUser():
#     collector_id = models.IntegerField(default=0)
