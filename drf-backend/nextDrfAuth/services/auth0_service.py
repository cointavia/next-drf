import requests
from django.conf import settings

class Auth0Service:
    @staticmethod
    def sign_up(email, password):
        url = f"https://{settings.AUTH0_DOMAIN}/dbconnections/signup"
        payload = {
            "client_id": settings.AUTH0_CLIENT_ID,
            "email": email,
            "password": password,
            "connection": settings.AUTH0_CONNECTION
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Auth0 Sign Up Error: {response.json()}")

    @staticmethod
    def sign_in(email, password):
        url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
        payload = {
            "grant_type": "password",
            "client_id": settings.AUTH0_CLIENT_ID,
            "client_secret": settings.AUTH0_CLIENT_SECRET,
            "username": email,
            "password": password,
            "scope": "openid email profile"
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Auth0 Sign In Error: {response.json()}")

    @staticmethod
    def verify_token(id_token):
        # Decode and verify Auth0 ID token (requires PyJWT or similar library)
        raise NotImplementedError("Auth0 token verification requires additional setup.")
