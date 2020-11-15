from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

from boards.models import Board
from boards.serializers import BoardSerializer


@api_view(['PUT'])
def update_list_title(request, board_id):
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
			board_data['lists'][request.data['list_id']]['title'] = request.data['title']
			board_serializer = BoardSerializer(board, data= board_data) 
			if board_serializer.is_valid():
				board_serializer.save()
	        #if tutorial_serializer.is_valid(): 
	            #tutorial_serializer.save() 
	            #return JsonResponse(tutorial_serializer.data) 
			return JsonResponse({'message': 'Content successfully updated'}, status=status.HTTP_200_OK)
			#return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)