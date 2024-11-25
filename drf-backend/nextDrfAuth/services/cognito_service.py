import boto3
from django.conf import settings
from botocore.exceptions import ClientError
from ..utils import generate_secret_hash

client = boto3.client('cognito-idp', region_name=settings.AWS_REGION)

class CognitoService:
    @staticmethod
    def sign_up(email, password, first_name, last_name):
        secret_hash = generate_secret_hash(email)
        try:
            response = client.sign_up(
                ClientId=settings.AWS_COGNITO_APP_CLIENT_ID,
                SecretHash=secret_hash,
                Username=email,
                Password=password,
                UserAttributes=[
                    {'Name': 'email', 'Value': email},
                    {'Name': 'given_name', 'Value': first_name},
                    {'Name': 'family_name', 'Value': last_name},
                ],
            )
            return response
        except ClientError as e:
            raise Exception(f"Cognito Sign Up Error: {e.response['Error']['Message']}")

    @staticmethod
    def sign_in(email, password):
        secret_hash = generate_secret_hash(email)
        try:
            response = client.initiate_auth(
                ClientId=settings.AWS_COGNITO_APP_CLIENT_ID,
                AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': email,
                    'PASSWORD': password,
                    'SECRET_HASH': secret_hash,
                },
            )
            return response['AuthenticationResult']
        except ClientError as e:
            raise Exception(f"Cognito Sign In Error: {e.response['Error']['Message']}")

    @staticmethod
    def confirm_sign_up(email, confirmation_code):
        secret_hash = generate_secret_hash(email)
        try:
            client.confirm_sign_up(
                ClientId=settings.AWS_COGNITO_APP_CLIENT_ID,
                Username=email,
                ConfirmationCode=confirmation_code,
                SecretHash=secret_hash,
            )
            return {"message": "User confirmed successfully."}
        except ClientError as e:
            raise Exception(f"Cognito Confirmation Error: {e.response['Error']['Message']}")
