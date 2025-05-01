from django.shortcuts import render
from .serializer import TilesetSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Tileset
from django.contrib.auth.models import User
from rest_framework import generics

# Create your views here.

class TileSetListCreateView(generics.ListCreateAPIView[Tileset]):
    queryset = Tileset.objects.all()
    serializer_class = TilesetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print('user in perform_create:', self.request.user)
        serializer.save(createdBy=self.request.user)

class MyTilesetListView(generics.ListAPIView[Tileset]):
    serializer_class = TilesetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tileset.objects.filter(createdBy=user)

class CreateUserView(generics.CreateAPIView[User]):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
