from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model

from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView

from boards.forms import CreateBoard
from boards.models import Board

from boards.serializers import BoardSerializer
import uuid
import traceback
import json

@login_required(login_url='/login')
def profile_view(request, username):
	try:
		User = get_user_model()
		u = User.objects.get(username=username)
		if request.user.username == username:
			if request.method == 'POST':
				user = User.objects.get(api_key = request.user.api_key)
				current_board = Board.objects.create(
					id = uuid.uuid4(), 
					owner= user, 
					title= request.POST['title'], 
					description= request.POST['description'],
					content = {
					    "lists": [
					        {
					            "title": "To Do",
					        },
					        {
					            "title": "Doing"
					        },
					        {
					            "title": "Done"
					        }
					    ]
					})
				return redirect(f'/board/{current_board.id}')
			else:
				boards_list = Board.objects.filter(owner_id= request.user.api_key)
				return render(request, 'boards/boards_menu.html', {'boards_list' : boards_list})
		else:
			return render(request, 'boards/not_found.html', {})
	except:
		print(traceback.format_exc())
		return render(request, 'boards/not_found.html', {})


def board_view(request, board_id):
	try:
		if request.user == Board.objects.get(id= board_id).owner:
			data = Board.objects.get(id= board_id).content
			if len(data):
				return render(request, 'boards/board.html', 
					{
						'lists' : [{'title': item['title'], 'stikers' : item['stikers']} if 'stikers' in item else {'title': item['title']}
						 for item in data['lists']],
						 'api_key' : request.user.api_key
					}
				)
			else:
				return render(request, 'boards/board.html')
		else:
			return render(request, 'boards/forbidden.html', {})
	except Board.DoesNotExist:
		return render(request, 'boards/not_found.html', {})

