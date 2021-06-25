from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

from team.models import Profile, Skill, Hobby

TEAM = [
    {
        "name": "Alex",
        "job_title": "CTO",
        "years_of_experience": 100,
        "introduction": "runs things.",
        "hobbies": [
            {
                "name": "Mountain biking",
                "strength": 8,
            },
            {
                "name": "Sitting in the sun, drinking wine and pretending to work",
                "strength": 6
            }
        ],
        "skills": [
            {
                "name": "all of them",
                "strength": 10,
            }
        ]
    },
    {
        "name": "Will",
        "job_title": "Head of UX/UI",
        "years_of_experience": 40,
        "introduction": "designs things.",
        "hobbies": [
            {
                "name": "Dog walking",
                "strength": 6,
            },
            {
                "name": "Horticulture",
                "strength": 8
            }
        ],
        "skills": [
            {
                "name": "javascript",
                "strength": 7,
            },
            {
                "name": "css",
                "strength": 10,
            }
        ]
    },
    {
        "name": "Nathan",
        "job_title": "Head of Engineering",
        "years_of_experience": 10,
        "introduction": "makes things.",
        "hobbies": [
            {
                "name": "Making extravagant technical tests",
                "strength": 4,
            },
            {
                "name": "Sarcasm",
                "strength": 8,
            }
        ]
    },
    {
        "name": "Rob",
        "job_title": "Head of Data science",
        "years_of_experience": 60,
        "introduction": "explains things.",
        "hobbies": [
            {
                "name": "Ballet, would you believe",
                "strength": 6,
            },
            {
                "name": "Telling his wife he didn't go to pizza hut for lunch",
                "strength": 8,
            }
        ],
        "skills": [
            {
                "name": "pandas",
                "strength": 9,
            },
            {
                "name": "scikit",
                "strength": 7,
            }
        ]
    },
    {
        "name": "Marco",
        "job_title": "SVP of Product",
        "years_of_experience": 50,
        "introduction": "demands things.",
        "hobbies": [
            {
                "name": "Running into famous people",
                "strength": 10,
            },
            {
                "name": "Saying 'Got it'",
                "strength": 6
            }
        ],
        "skills": [
            {
                "name": "planning",
                "strength": 7,
            },
            {
                "name": "expectation management",
                "strength": 10,
            }
        ]
    }
]


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        self.stdout.write(self.style.NOTICE('Creating Basic User Profiles'))

        for team_member in TEAM:

            skills = team_member.pop('skills', [])
            hobbies = team_member.pop('hobbies', [])
            name = team_member.pop('name')

            user, ucreated = get_user_model().objects.get_or_create(
                username=name, is_superuser=False, is_staff=False)

            profile, pcreated = Profile.objects.get_or_create(user=user, **team_member)

            for skill in skills:
                Skill.objects.get_or_create(profile=profile, **skill)

            for hobby in hobbies:
                Hobby.objects.get_or_create(profile=profile, **hobby)

        self.stdout.write(self.style.SUCCESS('Created Basic User Profiles!'))

