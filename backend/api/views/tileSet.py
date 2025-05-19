from ..serializer import TilesetSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import Tileset
from rest_framework import generics

class TileSetListCreateView(generics.ListCreateAPIView[Tileset]):
    queryset = Tileset.objects.all()
    serializer_class = TilesetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # if query contains userId, filter by userId
        userId = self.request.query_params.get('userId')
        if userId:
            return Tileset.objects.filter(createdBy=userId)
        return Tileset.objects.all()

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

class TileSetDetailView(generics.RetrieveUpdateDestroyAPIView[Tileset]):
    queryset = Tileset.objects.all()
    serializer_class = TilesetSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updatedBy=self.request.user)