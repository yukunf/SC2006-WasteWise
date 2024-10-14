from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect
from .forms import ReportForm
from .models import Reports

def submit_report_view(request):
    if request.method == 'POST':
        form = ReportForm(request.POST)
        if form.is_valid():

            issue = form.cleaned_data['issue']
            collectorName = form.cleaned_data['collectorName']
            
            # Save the rating in the database (assuming you have a userID from request.user)
            rating = Reports.objects.create(
                issue=issue,
                collectorName=collectorName,
                userID=request.user.id  # Example: assuming users are logged in
            )
            return redirect('rating_success')  # Redirect after submission
    else:
        form = ReportForm()

    return render(request, 'submit_report.html', {'form': form})
