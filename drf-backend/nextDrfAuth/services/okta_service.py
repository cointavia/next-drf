import requests
from django.conf import settings

class OktaService:
    @staticmethod
    def sign_up(email, password, first_name, last_name):
        url = f"{settings.OKTA_BASE_URL}/api/v1/users?activate=true"
        payload = {
            "profile": {
                "email": email,
                "login": email,
                "firstName": first_name,
                "lastName": last_name
            },
            "credentials": {
                "password": {"value": password}
            }
        }
        headers = {
            "Authorization": f"SSWS {settings.OKTA_API_TOKEN}",
            "Content-Type": "application/json"
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Okta Sign Up Error: {response.json()}")

    @staticmethod
    def sign_in(email, password):
        url = f"{settings.OKTA_BASE_URL}/api/v1/authn"
        payload = {
            "username": email,
            "password": password
        }
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Okta Sign In Error: {response.json()}")
