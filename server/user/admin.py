from django.contrib import admin
from .models import User, CollectorUser

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'firstName', 'lastName', 'email', 'role')  # Customize as needed

@admin.register(CollectorUser)
class CollectorUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'firstName', 'lastName', 'email', 'collector_id')  # Customize as needed


