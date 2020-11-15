from django.urls import path
from django.contrib.auth.views import LoginView
from . import views

urlpatterns = [
	path(r'board/<board_id>', views.board_view, name='board_view'),
	path(r'<username>', 
	                views.profile_view,
	                name='profile_view')
    
]