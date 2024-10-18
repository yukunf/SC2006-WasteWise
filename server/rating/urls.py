from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RatingViewSet

router = DefaultRouter()
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Correctly map the get_ratings_for_collector method in the viewset
    path('api/ratings/collector/<int:collector_id>/', RatingViewSet.as_view({'get': 'get_ratings_for_collector'}), name='get_collector_ratings'),
]
