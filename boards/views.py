from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

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
		u = User.objects.get(username=username)
		if request.user.username == username:
			if request.method == 'POST':
				user = User.objects.get(id = request.user.id)
				Board.objects.create(id = uuid.uuid4(), owner= user, title= request.POST['title'], description= request.POST['description'])
				boards_list = Board.objects.all()
				return render(request, 'boards/boards_menu.html', {'boards_list' : boards_list})
			else:
				boards_list = Board.objects.all()
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
			return render(request, 'boards/board.html', 
				{
					'lists_titles' : [item['title'] for item in data['lists']]
				}
			)
		else:
			return render(request, 'boards/forbidden.html', {})
	except Board.DoesNotExist:
		return render(request, 'boards/not_found.html', {})

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def board_api(request, board_id):
	try:
		try: 
			board = Board.objects.get(id = board_id) 
		except Tutorial.DoesNotExist: 
			return JsonResponse({'message': 'The board does not exist'}, status=status.HTTP_404_NOT_FOUND) 
		
		if request.method == 'POST':
			if request.user == board.owner:
				board = Board.objects.get(id= board_id)
				board.content = request.data
				board.save()
				return JsonResponse({'message': 'Content successfully updated'}, status=status.HTTP_200_OK)
			else:
				return JsonResponse({'message': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)

		elif request.method == 'PUT':
			board_data = board.content
			print(board_data)
			print(request.data['list_id'])
			board_data['lists'][request.data['list_id']]['title'] = request.data['title']
			print(request.data['title'])
			board_serializer = BoardSerializer(board, data= board_data) 
			if board_serializer.is_valid():
				board_serializer.save()
			print(board_data)
	        #if tutorial_serializer.is_valid(): 
	            #tutorial_serializer.save() 
	            #return JsonResponse(tutorial_serializer.data) 
			return JsonResponse({'message': 'Content successfully updated'}, status=status.HTTP_200_OK)
			#return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)