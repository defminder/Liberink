from rest_framework import serializers
from boards.models import Board

class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ['content']
