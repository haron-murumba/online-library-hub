from .base import *

# Debug toolbar (optional)
INTERNAL_IPS = ['127.0.0.1']

# Email backend for development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Additional apps for development
INSTALLED_APPS += [
    'debug_toolbar',  # Optional
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',  # Optional
]