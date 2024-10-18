# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CollectorViewSet

router = DefaultRouter()
router.register(r'collectors', CollectorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]