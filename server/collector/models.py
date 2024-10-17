# Create your models here.
import uuid
from django.db import models


class Collector(models.Model):
    ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, blank=True)
    fax = models.CharField(max_length=15, blank=True)
    licence = models.CharField(max_length=3)
    suspended = models.BooleanField(default=False)
