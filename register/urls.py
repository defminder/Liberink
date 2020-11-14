from django.urls import path
from django.contrib.auth.views import LoginView
from . import views


urlpatterns = [
    path('registration', views.registration, name='registration'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout')
]