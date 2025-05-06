
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("tilesets/", views.TileSetListCreateView.as_view(), name="tileset-list-create"),
    path("tilesets/my/", views.MyTilesetListView.as_view(), name="my-tileset-list"),
    path("tilegroups/", views.TileGroupListCreateView.as_view(), name="tilegroup-list-create"),
    path("tilegroups/<int:pk>/", views.TileGroupDetailView.as_view(), name="tilegroup-detail"),
    path("tiles/", views.TileCreateView.as_view(), name="tile-create"),
    path("tilesockets/", views.TileSocketListCreateView.as_view(), name="tilesocket-list-create"),
]