from django import forms

class ReportForm(forms.Form):
    issue = forms.CharField(widget=forms.Textarea(attrs={'rows': 4, 'cols': 40}), label = "Issue with collector: ")
    collectorName = forms.CharField(widget=forms.Textarea(attrs={'rows': 1, 'cols': 40}), label = "Collector Name: ")