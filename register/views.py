from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate
from .forms import RegistredUsers
from django.contrib import messages
from .auth import EmailBackend


# Create youws here.
def registration(response):
	if response.method == 'POST':
		user_form = RegistredUsers(response.POST)
		if user_form.is_valid():
			user = user_form.save(commit=False)
			user.active=True
			user.staff=False
			user.admin=False
			user.save()
			username = user_form.cleaned_data.get('username')
			password = user_form.cleaned_data.get('password1')
			user = authenticate(response, username=username, password=password)
			auth_login(response, user)
			return redirect('home')
	else:
		user_form = RegistredUsers()
	return render(response, "registration/registration.html", {"form" : user_form})



def login(response):
	if response.method == 'POST':
		email_or_username = response.POST.get('email_or_username')
		password =response.POST.get('password')
		if '@' in email_or_username:
			print(email_or_username, password)
			user = EmailBackend().email_authenticate(response, email= email_or_username, password=password)
		else:
			user = authenticate(response, username=email_or_username, password=password)
		if user is not None:
			auth_login(response, user)
			return redirect('home')
		else:
			messages.info(response, 'Username OR password is incorrect')

	return render(response, 'registration/login.html',)


def logout(request):
	auth_logout(request)
	return redirect('login')