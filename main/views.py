from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.http import HttpResponse
# Create your views here.

def home(request):
	if request.user.is_authenticated:
		return HttpResponseRedirect(redirect_to= f'{request.user.username}')
	else:
		return render(request, 'main/base.html', {})
