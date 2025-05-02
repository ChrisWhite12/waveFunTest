
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("tilesets/", views.TileSetListCreateView.as_view(), name="tileset-list-create"),
    path("tilesets/my/", views.MyTilesetListView.as_view(), name="my-tileset-list"),
    path("tilegroups/", views.TileGroupListCreateView.as_view(), name="tilegroup-list-create"),
    path("tiles/", views.TileCreateView.as_view(), name="tile-create"),
]