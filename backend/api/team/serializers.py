from rest_framework import serializers

from team.models import Profile, Skill, Hobby


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


def get_average_strengths(profile, prop):
    strengths = []

    for skill in getattr(profile, prop).all():
        strengths.append(skill.strength)

    return sum(strengths) / len(strengths) if strengths else None


class ProfileRetrieveSerializer(ProfileListSerializer):

    average_skill_proficiency = serializers.SerializerMethodField()
    passion = serializers.SerializerMethodField()
    approx_age = serializers.SerializerMethodField()
    maximum_passion = serializers.SerializerMethodField()

    skills = SkillSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)

    @staticmethod
    def get_average_skill_proficiency(profile):
        return get_average_strengths(profile, 'skills')

    @staticmethod
    def get_passion(profile):
        return get_average_strengths(profile, 'hobbies')

    @staticmethod
    def get_maximum_passion(profile):
        return max([passion.strength for passion in profile.hobbies.all()])

    @staticmethod
    def get_approx_age(profile):
        approx_age = 'probably a responsible adult'

        if profile.years_of_experience > 60:
            approx_age = 'ancient'
        elif profile.years_of_experience < 30:
            approx_age = 'barely out of diapers'
        elif profile.years_of_experience > 40:
            approx_age = 'old'

        return approx_age
