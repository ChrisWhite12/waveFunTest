from django.db import models

# Create your models here.
class Tileset(models.Model):
    image = models.ImageField(upload_to='tilesets/')
    createdBy = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    tile_size = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class TileGroup(models.Model):
    name = models.CharField(max_length=255)
    createdBy = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Tile(models.Model):
    tilesetId = models.ForeignKey(Tileset, on_delete=models.CASCADE)
    tileGroupId = models.ForeignKey(TileGroup, on_delete=models.CASCADE)
    size = models.CharField(max_length=255)
    positionData = models.JSONField()
    socketData = models.JSONField()
    createdBy = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tile {self.id} in {self.tilesetId.name}"

class TileSocket(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    createdBy = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

