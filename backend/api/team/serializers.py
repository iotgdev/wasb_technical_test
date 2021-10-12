from django.db.models import Max

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
    average_hobby_strength = serializers.SerializerMethodField()
    maximum_passion = serializers.SerializerMethodField()
    skills = SkillSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)

    @staticmethod
    def get_maximum_passion(profile):
        max_passion = profile.hobbies.all().aggregate(Max('strength'))
        return max_passion['strength__max']

    @staticmethod
    def calc_average_strengths(instance):
        avg_strengths = []
        for data in instance:
            avg_strengths.append(data.strength)

        return sum(avg_strengths) / len(avg_strengths) if len(avg_strengths) > 0 else 0

    def get_average_hobby_strength(self, profile):
        hobbies = profile.hobbies.all()

        return self.calc_average_strengths(hobbies)

    def get_average_skill_proficiency(self, profile):
        skills = profile.skills.all()

        return round(self.calc_average_strengths(skills), 2)
