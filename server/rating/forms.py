from django import forms

class RatingForm(forms.Form):
    comment = forms.CharField(widget=forms.Textarea(attrs={'rows': 4, 'cols': 40}), label = "Your comment")
    rating = forms.IntegerField(min_value=1, max_value=5, label="Your rating (out of 5)")