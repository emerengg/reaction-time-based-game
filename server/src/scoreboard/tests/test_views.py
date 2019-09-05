import json
from rest_framework import status
from django.test import TestCase
from django.urls import reverse as reverse_api
from scoreboard.models import ScoreBoard
from scoreboard.api.serializers import ScoreBoardSerializer


class GetLadderTest(TestCase):
    """ Test module for GET ladder API """

    def setUP(self):
        self.shaco = ScoreBoard.objects.create(name='Shaco', score="100")
        self.jb = ScoreBoard.objects.create(name='jb', score="34")
        self.sion = ScoreBoard.objects.create(name='sion', score="76")
        self.garen = ScoreBoard.objects.create(name='garen', score="130")
        self.ggx = ScoreBoard.objects.create(name='ggx', score="56")

    def test_get_ladder(self, ):
        response = self.client.get(reverse_api('ladder-api:get-post-ladder'), format='json')
        score_board = ScoreBoard.objects.all().order_by('-score')
        serializer = ScoreBoardSerializer(score_board, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
class CreateNewScoreTest(TestCase):
    """ Test module for POST ladder API """

    def setUp(self):
        self.valid_payload = {
            'name': 'Gangplank',
            'score': 77
        }
        self.invalid_payload = {
            'name': '',
            'score': 77
        }

    def test_create_valid_score(self):
        response = self.client.post(
            reverse_api('ladder-api:get-post-ladder'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )

        serializer = ScoreBoardSerializer(response.data)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_score(self):
        response = self.client.post(
            reverse_api('ladder-api:get-post-ladder'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)