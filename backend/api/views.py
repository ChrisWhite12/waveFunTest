from django.shortcuts import render
from .serializer import TilesetSerializer, UserSerializer, TileGroupSerializer, TileSerializer, TileSocketSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Tileset, TileGroup, Tile, TileSocket
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response

# Create your views here.


class CreateUserView(generics.CreateAPIView[User]):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
