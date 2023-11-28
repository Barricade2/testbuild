from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetCompleteView
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap, index as sitemap_index

from app.main.views import home

app_name = 'movie'
urlpatterns = [
    path('',home, name='home'),
]