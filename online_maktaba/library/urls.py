from django.urls import path

# Simple test view
from django.http import HttpResponse

def home(request):
    return HttpResponse("Online Maktaba API is working!")

urlpatterns = [
    path('', home, name='home'),
]
