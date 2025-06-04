import { Stack, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTileSet, getTileSet, updateTileSet } from '../../api'
import DeleteRow from '../../components/DeleteRow'
import SaveRow from '../../components/SaveRow'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/tileset/detail/$id')({
  component: RouteComponent,
})

// TODO add tile size and image
function RouteComponent() {
  const { id } = Route.useParams()
  const { data: tilesetData } = useQuery({
    queryKey: ['tileset', id],
    queryFn: () => getTileSet(id),
  })
  const navigate = useNavigate()
  const [tilesetName, setTileSetName] = useState(tilesetData?.name || '')
  const [tileSize, setTileSize] = useState(8)
  const [tileSetImage, setTileSetImage] = useState<File | null>(null);
  const tileAtlas = useRef(new Image());

  const draw = (size: number) => {
    console.log('draw');
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    canvas.width = tileAtlas.current.width;
    canvas.height = tileAtlas.current.height;
    if (context) {
      context.drawImage(tileAtlas.current, 0, 0);
    }
    for (let x = 0; x < tileAtlas.current.width; x += size) {
      context?.beginPath();
      context?.moveTo(x, 0);
      context?.lineTo(x, tileAtlas.current.height);
      context?.stroke();
    }

    for (let y = 0; y < tileAtlas.current.height; y += size) {
      context?.beginPath();
      context?.moveTo(0, y);
      context?.lineTo(tileAtlas.current.width, y);
      context?.stroke();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTileSetImage(file);
      draw(tileSize)
    }
  }

  const handleTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value)
    if (!isNaN(newSize) && newSize >= 8) {
      setTileSize(newSize)
    }
  }

  const handleDelete = async () => {
    await deleteTileSet(id)
    navigate({ to: '/tileset/list' })
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', tilesetName)
    await updateTileSet(id, formData)
  }



  useEffect(() => {
    if (tilesetData) {
      setTileSetName(tilesetData.name)
      setTileSize(tilesetData.tile_size || 8)
      // TODO fix image display issue
    }
  }, [tilesetData]);

  useEffect(() => {
    console.log('tileSetImage', tileSetImage);
    if (tileSetImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        tileAtlas.current.src = e.target?.result as string;
        tileAtlas.current.onload = () => {
          draw(tileSize);
        }
      };
      reader.readAsDataURL(tileSetImage);
    }

  }, [tileSize, tileSetImage]);

  return (
    <Stack spacing={2} direction='column'>
      <DeleteRow handleDelete={handleDelete} />
      <Stack direction='row' spacing={2} className="p-4" alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction='column' spacing={2}>
          <Typography>Tileset ID: {tilesetData?.id}</Typography>
          <TextField
            label="Tileset Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={tilesetName}
            onChange={(e) => setTileSetName(e.target.value)}
          />
          <TextField
            label="Tile size"
            variant="outlined"
            type="number"
            value={tileSize}
            className="mb-4"
            onChange={handleTileSizeChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
            value={tileSetImage ? tileSetImage.name : ''} // Display file name if selected
          />
          <SaveRow handleSave={handleSubmit} />
        </Stack>
        <Stack>
          <canvas
            id="canvas"
            width="500"
            height="500"
            style={{
              border: '1px solid black',
              marginTop: '20px',
            }}
          ></canvas>
        </Stack>
      </Stack>
    </Stack>
  )
}
