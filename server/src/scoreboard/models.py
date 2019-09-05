from django.db import models

class ScoreBoard(models.Model):
    name = models.CharField(max_length=10)
    score = models.IntegerField()

    def get_username(self):
        return self.name