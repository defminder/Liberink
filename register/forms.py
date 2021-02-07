from django.db import models
from django import forms
from .models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import password_validation

class RegistredUsers(UserCreationForm):

	def clean_email(self):
		entered_email = self.cleaned_data.get('email')
		try:
			raise forms.ValidationError('Email is required')
		except:
			return self.cleaned_data.get('email')
		raise forms.ValidationError(f'{entered_email} alredy registered')

	def clean_password(self):
		entered_password = self.cleaned_data.get('password1')
		MIN_LENGHT = 8
		if not len(entered_password):
			raise forms.ValidationError('Password is required')
		elif len(entered_password) < MIN_LENGHT:
			raise forms.ValidationError('Password must be more than 8 characters')
		return self.cleaned_data.get('password1')

	class Meta:
		model = User
		fields = ('first_name', 'last_name', 'username', 'email', 'password1')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		del self.fields['password2']