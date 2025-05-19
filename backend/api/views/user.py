from ..serializer import UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import generics

class CreateUserView(generics.CreateAPIView[User]):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]