from django.conf import settings

class AuthManager:
    """
    Dynamically load the appropriate authentication service based on the provider.
    """
    @staticmethod
    def get_service():
        provider = settings.AUTH_PROVIDER

        if provider == "cognito":
            from .services.cognito_service import CognitoService
            return CognitoService
        elif provider == "auth0":
            from .services.auth0_service import Auth0Service
            return Auth0Service
        elif provider == "firebase":
            from .services.firebase_service import FirebaseService
            return FirebaseService
        elif provider == "custom":
            from .services.custom_jwt_service import CustomJWTService
            return CustomJWTService
        else:
            raise ValueError(f"Unsupported AUTH_PROVIDER: {provider}")
