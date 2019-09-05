from django.urls import path
from .views import LadderListAPIView

app_name = 'ladder'

urlpatterns = [
    path('ladder/', LadderListAPIView.as_view(), name="get-post-ladder")
]