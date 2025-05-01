from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tileset, TileGroup, Tile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class TilesetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tileset
        fields = ["id", "image", "createdBy", "createdAt", "updatedAt", "name", "tile_size"]
        read_only_fields = ["createdBy", "createdAt", "updatedAt"]
        extra_kwargs = {
            "image": {"required": True},
            "name": {"required": True},
            "tile_size": {"required": True},
        }

    def create(self, validated_data):
        print('validated data in tileset serializer:', validated_data)
        validated_data["createdBy"] = self.context["request"].user.username
        return super().create(validated_data)

class TileGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TileGroup
        fields = ["id", "name", "createdBy", "createdAt", "updatedAt"]
        read_only_fields = ["createdBy", "createdAt", "updatedAt"]
        extra_kwargs = {
            "name": {"required": True},
        }

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = ["id", "tilesetId", "tileGroupId", "size", "positionData", "socketData", "createdBy", "createdAt", "updatedAt"]
        read_only_fields = ["createdBy", "createdAt", "updatedAt"]
        extra_kwargs = {
            "tilesetId": {"required": True},
            "tileGroupId": {"required": True},
            "size": {"required": True},
            "positionData": {"required": True},
            "socketData": {"required": True},
        }