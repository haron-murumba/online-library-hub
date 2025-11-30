from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    level = models.CharField(max_length=20, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('both', 'Both Levels')
    ])
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    level = models.CharField(max_length=20, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School')
    ])
    subject = models.CharField(max_length=100)
    file = models.FileField(upload_to='books/')
    cover_image = models.ImageField(upload_to='book_covers/', blank=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    downloads = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('book_detail', kwargs={'pk': self.pk})

class StudyResource(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    resource_type = models.CharField(max_length=50, choices=[
        ('worksheet', 'Worksheet'),
        ('notes', 'Study Notes'),
        ('video', 'Video Lesson'),
        ('quiz', 'Quiz'),
        ('past_paper', 'Past Paper')
    ])
    subject = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School')
    ])
    file = models.FileField(upload_to='study_resources/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school_level = models.CharField(max_length=20, choices=[
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School')
    ])
    grade = models.CharField(max_length=20)
    interests = models.ManyToManyField(Category, blank=True)
    
    def __str__(self):
        return f"{self.user.username} Profile"