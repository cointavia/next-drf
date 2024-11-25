from functools import wraps
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

def require_api_key(view_func):
    """
    Decorator to enforce API key validation for specific views.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        api_key = request.headers.get('X-API-KEY')
        if not api_key or api_key != settings.API_KEY:
            # Use DRF Response object directly
            return Response(
                {"error": "Invalid API Key"},
                status=status.HTTP_403_FORBIDDEN,
            )
        # Proceed with the original view
        return view_func(request, *args, **kwargs)

    return _wrapped_view
