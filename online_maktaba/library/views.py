from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from .models import Book, Category, StudyResource, UserProfile
from .forms import UserRegistrationForm, UserProfileForm

# Create your views here.

def home(request):
    primary_books = Book.objects.filter(level='primary')[:8]
    secondary_books = Book.objects.filter(level='secondary')[:8]
    recent_resources = StudyResource.objects.all()[:6]
    
    context = {
        'primary_books': primary_books,
        'secondary_books': secondary_books,
        'recent_resources': recent_resources,
    }
    return render(request, 'home.html', context)

def book_list(request):
    books = Book.objects.all()
    level = request.GET.get('level')
    category = request.GET.get('category')
    subject = request.GET.get('subject')
    
    if level:
        books = books.filter(level=level)
    if category:
        books = books.filter(category_id=category)
    if subject:
        books = books.filter(subject__icontains=subject)
    
    categories = Category.objects.all()
    context = {
        'books': books,
        'categories': categories,
    }
    return render(request, 'books/book_list.html', context)

def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.views += 1
    book.save()
    
    # Get related books
    related_books = Book.objects.filter(
        category=book.category,
        level=book.level
    ).exclude(pk=pk)[:4]
    
    context = {
        'book': book,
        'related_books': related_books,
    }
    return render(request, 'books/book_detail.html', context)

@login_required
def download_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    book.downloads += 1
    book.save()
    # In a real application, you'd serve the file here
    messages.success(request, f'Download started for {book.title}')
    return redirect('book_detail', pk=pk)

def study_resources(request):
    resources = StudyResource.objects.all()
    resource_type = request.GET.get('type')
    level = request.GET.get('level')
    
    if resource_type:
        resources = resources.filter(resource_type=resource_type)
    if level:
        resources = resources.filter(level=level)
    
    context = {
        'resources': resources,
    }
    return render(request, 'resources/study_resources.html', context)

def search(request):
    query = request.GET.get('q')
    books = Book.objects.all()
    resources = StudyResource.objects.all()
    
    if query:
        books = books.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(description__icontains=query) |
            Q(subject__icontains=query)
        )
        resources = resources.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(subject__icontains=query)
        )
    
    context = {
        'books': books,
        'resources': resources,
        'query': query,
    }
    return render(request, 'search_results.html', context)

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create user profile
            UserProfile.objects.create(
                user=user,
                school_level=form.cleaned_data['school_level'],
                grade=form.cleaned_data['grade']
            )
            messages.success(request, 'Account created successfully! You can now log in.')
            return redirect('login')
    else:
        form = UserRegistrationForm()
    
    return render(request, 'accounts/register.html', {'form': form})

@login_required
def profile(request):
    profile = get_object_or_404(UserProfile, user=request.user)
    
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        form = UserProfileForm(instance=profile)
    
    return render(request, 'accounts/profile.html', {'form': form})