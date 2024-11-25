import base64
import hmac
import hashlib
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

def generate_secret_hash(username):
    client_id = settings.AWS_COGNITO_APP_CLIENT_ID
    client_secret = settings.AWS_COGNITO_APP_CLIENT_SECRET

    if not client_id or not client_secret:
        raise ValueError("AWS Cognito Client ID and Client Secret must be set in the settings")

    message = username + client_id

    # Log the inputs for debugging purposes
    logger.debug(f"Generating SecretHash with username: {username}, client_id: {client_id}")

    dig = hmac.new(client_secret.encode('utf-8'),
                   message.encode('utf-8'), hashlib.sha256).digest()
    
    secret_hash = base64.b64encode(dig).decode()

    # Log the generated SecretHash for verification
    logger.debug(f"Generated SecretHash: {secret_hash}")

    return secret_hash


