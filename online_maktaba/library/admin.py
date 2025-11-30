from django.contrib import admin
from .models import Category, Book, StudyResource, UserProfile

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'description']
    list_filter = ['level']
    search_fields = ['name']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'level', 'subject', 'upload_date']
    list_filter = ['level', 'category', 'subject']
    search_fields = ['title', 'author', 'description']
    readonly_fields = ['views', 'downloads']

@admin.register(StudyResource)
class StudyResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'resource_type', 'subject', 'level', 'upload_date']
    list_filter = ['resource_type', 'level']
    search_fields = ['title', 'description']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'school_level', 'grade']
    list_filter = ['school_level']