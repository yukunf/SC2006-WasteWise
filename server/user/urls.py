# user/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CollectorUserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'collector-users', CollectorUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
