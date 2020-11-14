from django.forms import ModelForm
from boards.models import Board

class CreateBoard(ModelForm):
	class Meta:
		model = Board
		fields = ('owner', 'title', 'description')