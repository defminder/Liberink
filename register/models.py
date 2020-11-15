from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from uuid import uuid4

class User(AbstractUser):
    api_key = models.UUIDField(primary_key=True, editable=False, unique=True)


