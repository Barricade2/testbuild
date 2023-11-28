from django.urls import path, include



urlpatterns = [
    path('', include('app.main.urls')), # Получает всех из backend
#   path('movie/', include('apps.movie.urls')),
#   path('game/', include('apps.game.urls')),
]