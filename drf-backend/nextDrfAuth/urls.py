from django.urls import path, include
from .views import sign_up, confirm_sign_up, sign_in, protected_view, refresh_token, logout



urlpatterns = [
    path('sign-up/', sign_up, name='sign_up'),
    path('confirm-sign-up/', confirm_sign_up, name='confirm-sign-up'),
    path('sign-in/', sign_in, name='sign-in'),
    path('protected/', protected_view, name='protected'),
    path('refresh/', refresh_token, name='refresh-token'),
    path('logout/', logout, name='logout'),
]
