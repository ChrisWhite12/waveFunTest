from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from ..models import Tile
from ..serializer import TileSerializer

class TileCreateView(generics.CreateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)

# TODO - get many/one tile, update tile, delete tile