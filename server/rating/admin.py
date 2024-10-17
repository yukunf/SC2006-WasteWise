from django.contrib import admin

from .models import Rating


# Register your models here.
@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['collectorID', 'rating', 'comment',
                    'userID']
    search_fields = list_display
    list_filter = ['collectorID', 'userID']
