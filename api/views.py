from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
import traceback
from boards.models import Board
from boards.serializers import BoardSerializer

def is_int(x):
	try:
		int(x)
		return True
	except TypeError:
		return False

@api_view(['PUT'])
def update_list_title(request):
	try:
		required_args = ['key', 'board_id', 'list_id', 'title']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id']) 
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				if (is_int(request.data['list_id'])) and (0 <= request.data['list_id'] < len(board_data['lists'])):
					board_serializer = BoardSerializer(board, data= board_data) 
					if board_serializer.is_valid():
						board_serializer.save()
						return JsonResponse({'message': 'List title successfully updated'}, status=status.HTTP_200_OK)
					else:
						return JsonResponse({'message': 'List title updated. Title invalid.'}, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Content not updated. List id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_list(request):
	try:
		required_args = ['key', 'board_id']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id'])
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				board_data['lists'].append({'title' : '', 'stickers' : []})
				board_serializer = BoardSerializer(board, data= board_data) 
				if board_serializer.is_valid():
					board_serializer.save()
					return JsonResponse({'message': 'List created successfully created.'}, status=status.HTTP_200_OK)
				else:
					return JsonResponse(board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_list(request):
	try:
		required_args = ['key', 'board_id', 'list_id']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id'])
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				if (is_int(request.data['list_id'])) and (0 <= request.data['list_id'] < len(board_data['lists'])):
					board_data['lists'].remove(board_data['lists'][request.data['list_id']])
					board_serializer = BoardSerializer(board, data= board_data) 
					if board_serializer.is_valid():
						board_serializer.save()
						return JsonResponse({'message': 'List successfully deleted.'}, status=status.HTTP_200_OK)
					else:
						return JsonResponse({'message': 'List not updated. API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
				else:
					return JsonResponse({'message': 'Content not updated. List id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_sticker(request):
	try:
		required_args = ['key', 'board_id', 'list_id']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id'])
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				if (is_int(request.data['list_id'])) and (0 <= request.data['list_id'] < len(board_data['lists'])):
					if 'stickers' in board_data['lists'][request.data['list_id']]:
						board_data['lists'][request.data['list_id']]['stickers'].append({'text' : ''})
					else:
						board_data['lists'][request.data['list_id']]['stickers'] = [{'text' : ''}]

					board_serializer = BoardSerializer(board, data= board_data) 
					if board_serializer.is_valid():
						board_serializer.save()
						return JsonResponse({'message': 'Stiker successfully added'}, status=status.HTTP_200_OK)
					else:
						return JsonResponse({'message': 'Stiker not added. Title invalid.'}, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Stiker not added. List id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def update_sticker_text(request):
	try:
		required_args = ['key', 'board_id', 'list_id', 'sticker_id','text']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id']) 
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				if (is_int(request.data['list_id'])) and (0 <= request.data['list_id'] < len(board_data['lists'])):
					if 'stickers' not in board_data['lists'][request.data['list_id']]:
						board_data['lists'][request.data['list_id']]['stickers'] = []
					if (is_int(request.data['sticker_id'])) and (0 <= request.data['sticker_id'] < len(board_data['lists'][request.data['list_id']]['stickers'])):
						board_data['lists'][request.data['list_id']]['stickers'][request.data['sticker_id']]['text'] = request.data['text']
						board_serializer = BoardSerializer(board, data= board_data) 
						if board_serializer.is_valid():
							board_serializer.save()
							return JsonResponse({'message': 'Stickers successfully updated'}, status=status.HTTP_200_OK)
						else:
							return JsonResponse({'message': 'Stickers updated. Title invalid.'}, status=status.HTTP_400_BAD_REQUEST)
					else:
						return JsonResponse({'message': 'Content not updated. Sticker id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Content not updated. List id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found.'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_sticker(request):
	try:
		required_args = ['key', 'board_id', 'list_id', 'sticker_id']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id'])
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content
				if (is_int(request.data['list_id'])) and (0 <= request.data['list_id'] < len(board_data['lists'])):
					if 'stickers' not in board_data['lists'][request.data['list_id']]:
						board_data['lists'][request.data['list_id']]['stickers'] = []
					if (is_int(request.data['sticker_id'])) and (0 <= request.data['sticker_id'] < len(board_data['lists'][request.data['list_id']]['stickers'])):
						board_data['lists'][request.data['list_id']]['stickers'].remove(
							board_data['lists'][request.data['list_id']]['stickers'][request.data['sticker_id']]
						)
						board_serializer = BoardSerializer(board, data= board_data) 
						if board_serializer.is_valid():
							board_serializer.save()
							return JsonResponse({'message': 'Sticker successfully deleted'}, status=status.HTTP_200_OK)
						else:
							return JsonResponse(board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
					else:
						return JsonResponse({'message': 'Content not updated. Sticker id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Content not updated. List id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PUT'])
def update_sticker_postition(request):
	try:
		required_args = ['key', 'board_id', 'old_list_id', 'old_sticker_id', 'new_list_id', 'new_sticker_id']
		if all(arg in required_args for arg in request.data):
			board = Board.objects.get(id = request.data['board_id']) 
			if str(board.owner.api_key) == str(request.data['key']):
				board_data = board.content	
				if (is_int(request.data['old_list_id'])) and (0 <= request.data['old_list_id'] < len(board_data['lists'])):
					if (is_int(request.data['new_list_id'])) and (0 <= request.data['new_list_id'] < len(board_data['lists'])):
						if (is_int(request.data['old_sticker_id'])) and (0 <= request.data['old_sticker_id'] < len(board_data['lists'][request.data['old_list_id']]['stickers'])):
							if (is_int(request.data['new_sticker_id'])) and (0 <= request.data['new_sticker_id'] < len(board_data['lists'][request.data['new_list_id']]['stickers']) + 1):
								sticker = board_data['lists'][request.data['old_list_id']]['stickers'][request.data['old_sticker_id']]
								board_data['lists'][request.data['old_list_id']]['stickers'].remove(board_data['lists'][request.data['old_list_id']]['stickers'][request.data['old_sticker_id']])
								board_data['lists'][request.data['new_list_id']]['stickers'].insert(request.data['new_sticker_id'], sticker)
								board_serializer = BoardSerializer(board, data= board_data) 
								if board_serializer.is_valid():
									board_serializer.save()
									return JsonResponse({'message': 'Sticker posititon successfully updated'}, status=status.HTTP_200_OK)
								else:
									return JsonResponse({'message': 'Sticker posititon not updated'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
							else:
								return JsonResponse({'message': 'Sticker posititon not updated. New sticker id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
						else:
							return JsonResponse({'message': 'Sticker posititon not updated. Old sticker id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
					else:
						return JsonResponse({'message': 'Sticker posititon not updated. New list id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Sticker posititon not updated. Old list id invalid.'}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return JsonResponse({'message': 'API key for this board invalid.'}, status=status.HTTP_403_FORBIDDEN)
		else:
			return JsonResponse({'message': 'Not enough arguments.'}, status=status.HTTP_400_BAD_REQUEST)
	except Board.DoesNotExist: 
		return JsonResponse({'message': 'Board not found.'}, status=status.HTTP_404_NOT_FOUND)
	except:
		print(traceback.format_exc())
		return JsonResponse({'message': 'Server API error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  	