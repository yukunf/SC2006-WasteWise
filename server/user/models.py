# Create your models here.
from django.db import models
import uuid


class Role(models.TextChoices):
    GENERAL = 'general', 'General'
    COLLECTOR = 'collector', 'Collector'
    REGULATOR = 'regulator', 'Regulator'


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=30)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GENERAL)

    def __str__(self):
        return self.username
