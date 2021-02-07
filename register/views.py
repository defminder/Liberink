from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate
from .forms import RegistredUsers
from django.contrib import messages
from .auth import EmailBackend
from uuid import uuid4

# Create youws here.
def registration(request):
	if request.method == 'POST':
		user_form = RegistredUsers(request.POST)
		if user_form.is_valid():
			user = user_form.save(commit=False)
			user.active= True
			user.staff= False
			user.admin= False
			user.api_key = uuid4()
			user.save()
			username = user_form.cleaned_data.get('username')
			password = user_form.cleaned_data.get('password1')
			user = authenticate(request, username=username, password=password)
			auth_login(request, user)
			return redirect('home')
	else:
		user_form = RegistredUsers()
	return render(request, "registration/registration.html", {"form" : user_form})



def login(request):
	if request.method == 'POST':
		email_or_username = request.POST.get('email_or_username')
		password =request.POST.get('password')
		if '@' in email_or_username:
			user = EmailBackend().email_authenticate(request, email= email_or_username, password=password)
		else:
			user = authenticate(request, username=email_or_username, password=password)
		if user is not None:
			auth_login(request, user)
			return redirect('home')
		else:
			messages.info(request, 'Username OR password is incorrect')

	return render(request, 'registration/login.html',)


def logout(request):
	auth_logout(request)
	return redirect('login')