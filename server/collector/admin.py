# admin.py
from django.contrib import admin
from .models import Collector


@admin.register(Collector)
class CollectorAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'phone', 'fax']
    search_fields = ['name', 'address']
    list_filter = ['licences']
