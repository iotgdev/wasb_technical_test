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


class ProfileRetrieveSerializer(ProfileListSerializer):

    average_skill_proficiency = serializers.SerializerMethodField()
    skills = SkillSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)

    @staticmethod
    def get_average_skill_proficiency(profile):
        skill_strengths = []
        for skill in profile.skills.all():
            skill_strengths.append(skill.strength)

        return sum(skill_strengths) / len(skill_strengths)
