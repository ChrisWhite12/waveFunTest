from ..serializer import TilesetSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import Tileset
from rest_framework import generics

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
    
    # TODO - get one tileset, get tilesets, update tileset, delete tileset
