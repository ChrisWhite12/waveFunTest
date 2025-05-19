from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from ..models import Tile
from ..serializer import TileSerializer

class TileCreateView(generics.ListCreateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)
    

class TileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updatedBy=self.request.user.username)

