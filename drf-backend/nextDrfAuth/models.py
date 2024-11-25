from django.db import models
from django.utils.timezone import now  

class CustomUser(models.Model):
    username = models.CharField(max_length=64, unique=True, null=True)  # Reduced length
    email = models.EmailField(unique=True, max_length=128)  # Retain max length as it's acceptable

    # Other user profile fields
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    password = models.CharField(max_length=128)  # Store hashed passwords manually
    is_active = models.BooleanField(default=True)

    # Automatically managed timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "users"
        indexes = [
        models.Index(fields=["username"]),
        models.Index(fields=["email"]),
    ]
