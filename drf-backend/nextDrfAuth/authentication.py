from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .auth_manager import AuthManager

from django.conf import settings
from django.http import JsonResponse

class MultiProviderAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        auth_service = AuthManager.get_service()

        try:
            if hasattr(auth_service, "decode_token"):
                user_data = auth_service.decode_token(token)
                return (user_data, None)
            else:
                raise AuthenticationFailed("Token validation not supported for this provider.")
        except Exception as e:
            raise AuthenticationFailed(f"Invalid token: {str(e)}")



class APIKeyMiddleware:
    """
    Middleware to enforce API key validation.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only validate API key for paths starting with /api/
        if request.path.startswith('/api/'):
            api_key = request.headers.get('X-API-KEY')
            if not api_key or api_key != settings.API_KEY:
                return JsonResponse({"error": "Invalid API Key"}, status=403)
        return self.get_response(request)
        

class APIKeyAuthentication(BaseAuthentication):
    """
    Custom authentication class to validate X-API-KEY header.
    """
    def authenticate(self, request):
        # Extract the API key from headers
        api_key = request.headers.get('X-API-KEY')

        # Validate the API key
        if not api_key or api_key != settings.API_KEY:
            raise AuthenticationFailed("Invalid API Key")
        
        # Return None for successful authentication without attaching a user
        return (None, None)

