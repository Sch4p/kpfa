class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"