#from django.contrib import admin
# from .models import GeneralUser  #, CollectorUser
#
#
# @admin.register(GeneralUser)
# class GeneralUserAdmin(admin.ModelAdmin):
#     list_display = ('first_name', 'last_name', 'email', 'role')  # Customize as needed

# @admin.register(CollectorUser)
# class CollectorUserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'firstName', 'lastName', 'email', 'collector_id')  # Customize as needed
# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class UserProfileInline(admin.StackedInline):  #  StackedInline to display vertically
    model = UserProfile
    can_delete = False  #
    verbose_name_plural = 'Profile Information'


# Customized UserAdmin，with UserProfileInline
class CustomUserAdmin(UserAdmin):
    inlines = (UserProfileInline,)  #  UserProfileInline add User


# Register User using CustomUserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
