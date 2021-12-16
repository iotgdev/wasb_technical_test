from rest_framework import viewsets

from .models import Profile
from .serializers import ProfileRetrieveSerializer, ProfileListSerializer, MaximumPassionSerializer


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = Profile.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ProfileListSerializer
        return ProfileRetrieveSerializer

    def get_queryset(self, **kwargs):
        qs = super().get_queryset(**kwargs)
        maximum_passion_query = self.request.GET.get('maximum_passion')
        if maximum_passion_query:
            maximum_passion = MaximumPassionSerializer(maximum_passion_query).data['maximum_passion']
            if maximum_passion > 0:
                return qs.filter(hobbies__strength=int(maximum_passion))
        else:
            return qs
