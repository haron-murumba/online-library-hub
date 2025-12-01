from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views_api

# Simple test view
from django.http import HttpResponse

def home(request):
    return HttpResponse("Online Maktaba API is working!")

# Create router for API endpoints
router = DefaultRouter()
router.register(r'categories', views_api.CategoryViewSet)
router.register(r'books', views_api.BookViewSet)
router.register(r'study-resources', views_api.StudyResourceViewSet)
router.register(r'profiles', views_api.UserProfileViewSet)
router.register(r'auth', views_api.AuthViewSet, basename='auth')

urlpatterns = [
    path('', home, name='home'),
    path('api/', include(router.urls)),
]
