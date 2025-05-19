
from django.contrib import admin
from django.urls import path
from .views.tile import TileCreateView, TileDetailView
from .views.tileSet import TileSetListCreateView, TileSetDetailView
from .views.tileSocket import TileSocketListCreateView, TileSocketDetailView
from .views.tileGroup import TileGroupListCreateView, TileGroupDetailView

urlpatterns = [
    path("tiles/", TileCreateView.as_view(), name="tile-create"),
    path("tiles/<int:pk>/", TileDetailView.as_view(), name="tile-detail"),

    path("tilesets/", TileSetListCreateView.as_view(), name="tileset-list-create"),
    path("tilesets/<int:pk>/", TileSetDetailView.as_view(), name="tileset-detail"),
    
    path("tilesockets/", TileSocketListCreateView.as_view(), name="tilesocket-list-create"),
    path("tilesockets/<int:pk>/", TileSocketDetailView.as_view(), name="tilesocket-detail"),

    path("tilegroups/", TileGroupListCreateView.as_view(), name="tilegroup-list-create"),
    path("tilegroups/<int:pk>/", TileGroupDetailView.as_view(), name="tilegroup-detail"),
]

# TODO - get one/many tileInfo, update tileInfo, delete tileInfo