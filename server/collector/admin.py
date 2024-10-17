# admin.py
from django.contrib import admin
from .models import Collector


@admin.register(Collector)
class CollectorAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'phone', 'fax', 'licences', 'suspended']
    search_fields = list_display
    list_filter = ['name', 'licences', 'suspended']
