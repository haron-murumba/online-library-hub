from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    school_level = forms.ChoiceField(choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School')
    ])
    grade = forms.CharField(max_length=20)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'school_level', 'grade']

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['school_level', 'grade', 'interests']