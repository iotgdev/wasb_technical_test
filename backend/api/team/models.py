from django.contrib.auth import get_user_model
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    years_of_experience = models.IntegerField()
    introduction = models.TextField()

    class Meta:
        ordering = ['user__username']


class Skill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=100)
    strength = models.IntegerField()


class Hobby(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="hobbies")
    name = models.CharField(max_length=100)
    strength = models.IntegerField()
