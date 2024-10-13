from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

from .models import *

# User = User

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=username)
            print("current user", user)
            print("current user email", username)
            print("current user pw", password)
            print("current user check pw", user.check_password(password))
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
