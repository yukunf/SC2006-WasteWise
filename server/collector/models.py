import uuid
from django.db import models


class Collector(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, blank=True)
    fax = models.CharField(max_length=15, blank=True)
    licences = models.CharField(max_length=3)
    suspended = models.BooleanField(default=False)  # When regulator decides to shutdown a collector

    def __str__(self):
        return self.name
