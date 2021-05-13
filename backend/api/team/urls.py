from rest_framework.routers import SimpleRouter

from team.views import ProfileViewSet

router = SimpleRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = router.urls
