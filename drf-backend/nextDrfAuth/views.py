from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .auth_manager import AuthManager
from .serializers import UserSignUpSerializer, UserSignInSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    serializer = UserSignUpSerializer(data=request.data)
    if serializer.is_valid():
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")

        try:
            auth_service = AuthManager.get_service()
            response = auth_service.sign_up(email, password, first_name, last_name)
            return Response({"message": "Sign-up successful. Check your email for confirmation code."}, status=status.HTTP_201_CREATED)
        except ClientError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def sign_in(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.sign_in(email, password)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """
    Refresh tokens dynamically based on the authentication provider.
    """
    refresh_token = request.data.get('refresh_token')
    if not refresh_token:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        auth_service = AuthManager.get_service()
        if hasattr(auth_service, "refresh_token"):
            response = auth_service.refresh_token(refresh_token)
            return Response(response, status=status.HTTP_200_OK)
        else:
            raise Exception("Refresh token not supported for this provider.")
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_sign_up(request):
    email = request.data.get("email")
    confirmation_code = request.data.get("confirmation_code")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.confirm_sign_up(email, confirmation_code)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def resend_confirmation_code(request):
    email = request.data.get("email")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.resend_confirmation_code(email)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    access_token = request.headers.get("Authorization").split(" ")[1]

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.logout(access_token)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.change_password(request, old_password, new_password)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get("email")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.forgot_password(email)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_forgot_password(request):
    email = request.data.get("email")
    confirmation_code = request.data.get("confirmation_code")
    new_password = request.data.get("new_password")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.confirm_forgot_password(email, confirmation_code, new_password)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    access_token = request.headers.get("Authorization").split(" ")[1]

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.get_user_info(access_token)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_attributes(request):
    attributes = request.data.get("attributes")  # Example: {"name": "John Doe", "phone_number": "+123456789"}

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.update_user_attributes(request, attributes)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Add admin-level permissions if needed
def admin_delete_user(request):
    email = request.data.get("email")

    try:
        auth_service = AuthManager.get_service()
        response = auth_service.admin_delete_user(email)
        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Example: Protecting an API view
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def protected_view(request):
    return Response({"message": "This is a protected view."})











