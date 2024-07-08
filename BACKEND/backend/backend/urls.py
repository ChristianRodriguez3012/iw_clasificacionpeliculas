# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from movies.views import MovieViewSet

router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # Otras URLs de tu aplicación
]
