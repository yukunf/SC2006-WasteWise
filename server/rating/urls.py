from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RatingViewSet, ReportViewSet


router = DefaultRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'userreport', ReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
