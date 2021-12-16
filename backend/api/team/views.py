from rest_framework import viewsets, filters

from team.models import Profile
from team.serializers import ProfileRetrieveSerializer, ProfileListSerializer


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = Profile.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['user__username', ]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProfileListSerializer

        return ProfileRetrieveSerializer
