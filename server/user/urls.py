# user/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GeneralUserViewSet

router = DefaultRouter()
router.register(r'users', GeneralUserViewSet)
#router.register(r'collector-users', CollectorUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
