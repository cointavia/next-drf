import firebase_admin
from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError

firebase_admin.initialize_app()

class FirebaseService:
    @staticmethod
    def sign_up(email, password):
        try:
            user = auth.create_user(email=email, password=password)
            return {"uid": user.uid, "email": user.email}
        except FirebaseError as e:
            raise Exception(f"Firebase Sign Up Error: {e}")

    @staticmethod
    def sign_in(email, password):
        # Firebase does not directly handle server-side password authentication.
        # This requires client-side SDKs to generate an ID token.
        raise NotImplementedError("Sign-in requires Firebase client SDK for password authentication.")

    @staticmethod
    def verify_token(id_token):
        try:
            decoded_token = auth.verify_id_token(id_token)
            return decoded_token
        except FirebaseError as e:
            raise Exception(f"Firebase Token Verification Error: {e}")
