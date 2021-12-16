from django.db.models import Avg
from rest_framework import serializers

from .models import Profile, Skill, Hobby


class MaximumPassionSerializer(serializers.Serializer):
    maximum_passion = serializers.SerializerMethodField()

    @staticmethod
    def get_maximum_passion(obj):
        try:
            maximum_passion = int(obj)
            return maximum_passion
        except ValueError:
            return 0


class ProfileListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True, source='user.username')

    class Meta:
        model = Profile
        exclude = ('user',)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('name', 'strength')


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ('name', 'strength')


class ProfileRetrieveSerializer(ProfileListSerializer):
    average_skill_proficiency = serializers.SerializerMethodField()
    skills = SkillSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)

    @staticmethod
    def get_average_skill_proficiency(profile):
        return Profile.objects.aggregate(Avg('skills'))
