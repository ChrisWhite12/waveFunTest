from django.shortcuts import render
from ..serializer import TileSocketSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import TileSocket
from rest_framework import generics
from rest_framework.response import Response

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

class TileSocketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TileSocket.objects.all()
    serializer_class = TileSocketSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updatedBy=self.request.user.username)

    def get(self, request, *args, **kwargs):
        tile_socket = self.get_object()
        tile_socket_data = self.get_serializer(tile_socket).data

        return Response(tile_socket_data)