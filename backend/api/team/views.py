from rest_framework import viewsets

from team.models import Profile
from team.serializers import ProfileRetrieveSerializer, ProfileListSerializer


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = Profile.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProfileListSerializer
        return ProfileRetrieveSerializer
