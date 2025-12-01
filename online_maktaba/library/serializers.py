from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Book, StudyResource, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    uploaded_by_username = serializers.ReadOnlyField(source='uploaded_by.username')
    
    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ['uploaded_by', 'upload_date', 'views', 'downloads']

class StudyResourceSerializer(serializers.ModelSerializer):
    uploaded_by_username = serializers.ReadOnlyField(source='uploaded_by.username')
    
    class Meta:
        model = StudyResource
        fields = '__all__'
        read_only_fields = ['uploaded_by', 'upload_date']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    interests = CategorySerializer(many=True, read_only=True)
    interest_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Category.objects.all(),
        source='interests',
        write_only=True
    )
    
    class Meta:
        model = UserProfile
        fields = '__all__'