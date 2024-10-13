from django.shortcuts import render

# Create your views here.
# views.py
from django.shortcuts import render, redirect
from .forms import RatingForm
from .models import Rating

def submit_rating_view(request):
    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():

            comment = form.cleaned_data['comment']
            rating_value = form.cleaned_data['rating']
            
            # Save the rating in the database (assuming you have a userID from request.user)
            rating = Rating.objects.create(
                comment=comment,
                rating=rating_value,
                collectorID=1,  # Example: replace with actual collector ID
                userID=request.user.id  # Example: assuming users are logged in
            )
            return redirect('rating_success')  # Redirect after submission
    else:
        form = RatingForm()

    return render(request, 'submit_rating.html', {'form': form})
