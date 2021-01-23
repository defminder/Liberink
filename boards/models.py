import uuid


from django.db import models
from register.models import User


# JSONFiled defult must be callable
def defult_dict():
	return dict()


class Board(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4(),
        editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    content = models.JSONField(default= defult_dict)