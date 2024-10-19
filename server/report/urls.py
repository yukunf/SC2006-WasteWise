# report/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_report, name='submit_report'),
    path('list/', views.list_reports, name='list_reports'),
    path('<int:pk>/', views.view_report, name='view_report'),
    path('<int:pk>/contact/', views.mark_report_contacted, name='mark_report_contacted'),

]

