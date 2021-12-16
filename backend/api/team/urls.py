from rest_framework.routers import SimpleRouter

from .views import ProfileViewSet

router = SimpleRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = router.urls
