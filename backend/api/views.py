from django.shortcuts import render
from .serializer import TilesetSerializer, UserSerializer, TileGroupSerializer, TileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Tileset, TileGroup, Tile
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response

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

class TileGroupListCreateView(generics.ListCreateAPIView):
    queryset = TileGroup.objects.all()
    serializer_class = TileGroupSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        print('TileGroupListCreateView context:', context)
        return context

class TileCreateView(generics.CreateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)

class TileGroupDetailView(generics.RetrieveAPIView):
    queryset = TileGroup.objects.all()
    serializer_class = TileGroupSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updatedBy=self.request.user.username)

    def get(self, request, *args, **kwargs):
        tile_group = self.get_object()
        tile_group_data = self.get_serializer(tile_group).data

        tiles = Tile.objects.filter(tileGroupId=tile_group)
        tiles_data = TileSerializer(tiles, many=True).data

        response_data = {
            "tile_group": tile_group_data,
            "tiles": tiles_data
        }

        return Response(response_data)