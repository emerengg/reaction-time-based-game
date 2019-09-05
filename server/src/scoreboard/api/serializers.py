from rest_framework import serializers

from scoreboard.models import ScoreBoard

class ScoreBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreBoard
        fields = ['id', 'name', 'score']
        read_only_fields = ['id']