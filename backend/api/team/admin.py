from django.contrib import admin

from team.models import Skill, Hobby, Profile


class SkillInline(admin.TabularInline):
    model = Skill


class HobbyInline(admin.TabularInline):
    model = Hobby


class ProfileAdmin(admin.ModelAdmin):

    inlines = (SkillInline, HobbyInline)


admin.site.register(Profile, ProfileAdmin)
