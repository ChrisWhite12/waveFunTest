from django.shortcuts import render
from .serializer import TilesetSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from .models import Tileset
from django.contrib.auth.models import User
from rest_framework import generics

# Create your views here.

class TileSetListCreateView(generics.ListCreateAPIView):
    queryset = Tileset.objects.all()
    serializer_class = TilesetSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
