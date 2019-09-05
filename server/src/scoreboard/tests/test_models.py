from django.test import TestCase
from scoreboard.models import ScoreBoard

class ScoreBoardTest(TestCase):
    """ Test module for Puppy model """

    def setUp(self):
        ScoreBoard.objects.create(name='Johhny', score='100')
        ScoreBoard.objects.create(name='Bravo', score=75)

    def test_puppy_breed(self):
        johhny = ScoreBoard.objects.get(name='Johhny')
        bravo = ScoreBoard.objects.get(name='Bravo')
        self.assertEqual(johhny.get_username(), "Johhny")
        self.assertEqual(bravo.get_username(), "Bravo")