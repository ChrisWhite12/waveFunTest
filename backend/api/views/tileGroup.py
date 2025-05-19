from django.shortcuts import render
from ..serializer import TileGroupSerializer, TileSerializer 
from rest_framework.permissions import IsAuthenticated
from ..models import TileGroup, Tile
from rest_framework import generics
from rest_framework.response import Response

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
    
    # TODO - get update group, delete group
    