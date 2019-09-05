from rest_framework import viewsets

from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response

from scoreboard.models import ScoreBoard
from .serializers import ScoreBoardSerializer


class LadderListAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    queryset = ScoreBoard.objects.all()
    serializer_class = ScoreBoardSerializer

    def get(self, request):
        qs = super().get_queryset().order_by('-score')
        serializer = ScoreBoardSerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
