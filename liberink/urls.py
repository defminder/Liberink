
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('grappelli/', include('grappelli.urls')), # grappelli URLS
    path('admin/', admin.site.urls), # admin site
    path('', include('main.urls')),
    path('', include('register.urls')),
    path('', include('boards.urls')),
    path('', include('api.urls')),
]
