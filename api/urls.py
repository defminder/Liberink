from django.urls import path
from . import views

urlpatterns = [
	path(r'api/board/<board_id>/update_list_title', views.update_list_title, name='update_list_title'),
	
]