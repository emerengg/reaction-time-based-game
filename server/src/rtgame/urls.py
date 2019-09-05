from django.urls import include, path

urlpatterns = [
    path('api/', include('scoreboard.api.urls', namespace='ladder-api')),
]