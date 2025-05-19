from django.shortcuts import render
from ..serializer import TileSocketSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import TileSocket
from rest_framework import generics

class TileSocketListCreateView(generics.ListCreateAPIView):
    queryset = TileSocket.objects.all()
    serializer_class = TileSocketSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user.username)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        print('TileSocketListCreateView context:', context)
        return context
    
# TODO - get one tilesocket, update tilesocket, delete tilesocket
