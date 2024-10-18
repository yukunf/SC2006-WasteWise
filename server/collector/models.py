from django.db import models


class Collector(models.Model):
    objects = None
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, blank=True)
    fax = models.CharField(max_length=15, blank=True)
    licences = models.CharField(max_length=23)
    suspended = models.BooleanField(default=False)

    def __str__(self):
        return self.name
