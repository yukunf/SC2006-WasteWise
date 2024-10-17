from django.contrib import admin
from .models import Ratings

class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id', 'collectorID', 'rating', 'comments', 'userID', 'created_at')
    search_fields = ('collectorID', 'userID')  # Optional: Enables search by these fields
    list_filter = ('created_at',)  # Optional: Adds a filter for created date

admin.site.register(Ratings, RatingsAdmin)

