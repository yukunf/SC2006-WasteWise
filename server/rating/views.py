from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Ratings
from .serializers import RatingSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Ratings.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='rating')
    def create_rating(self, request):
        # Create serializer with incoming data
        serializer = RatingSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the rating and get the instance
            rating_instance = serializer.save()

            # Assuming userID is passed in the request data and corresponds to a UserProfile
            user_id = request.data.get('userID')
            collector_id = request.data.get('collectorID')  # Update if the key is different

            print(f"Rating created with collector ID: {collector_id} for user ID: {user_id}")

            return Response({'message': 'Rating created successfully', 'rating': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='collector/(?P<collector_id>[^/.]+)')
    def get_ratings_for_collector(self, request, collector_id=None):
        ratings = Ratings.objects.filter(collectorID=collector_id)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='ratings')
    def get_all_ratings(self, request):
        # Retrieve all ratings
        ratings = self.queryset
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='(?P<user_id>[^/.]+)')
    def get_ratings_by_user(self, request, user_id=None):
        ratings = Ratings.objects.filter(userID=user_id)  # Filter by userID
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# from django.shortcuts import render

# # Create your views here.
# # views.py
# from django.shortcuts import render, redirect
# from .forms import RatingForm
# from .models import Rating

# def submit_rating_view(request):
#     if request.method == 'POST':
#         form = RatingForm(request.POST)
#         if form.is_valid():

#             comment = form.cleaned_data['comment']
#             rating_value = form.cleaned_data['rating']
            
#             # Save the rating in the database (assuming you have a userID from request.user)
#             rating = Rating.objects.create(
#                 comment=comment,
#                 rating=rating_value,
#                 collectorID=1,  # Example: replace with actual collector ID
#                 userID=request.user.id  # Example: assuming users are logged in
#             )
#             return redirect('rating_success')  # Redirect after submission
#     else:
#         form = RatingForm()

#     return render(request, 'submit_rating.html', {'form': form})
