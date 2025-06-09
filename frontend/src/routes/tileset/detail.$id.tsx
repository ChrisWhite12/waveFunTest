import { Stack, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTileSet, getTileSet, updateTileSet } from '../../api'
import DeleteRow from '../../components/DeleteRow'
import SaveRow from '../../components/SaveRow'
import { useEffect, useState } from 'react'
import TileSetCanvas from '../../components/TileSetCanvas'

export const Route = createFileRoute('/tileset/detail/$id')({
  component: RouteComponent,
})

// TODO fix image display issue on input
function RouteComponent() {
  const { id } = Route.useParams()
  const { data: tilesetData } = useQuery({
    queryKey: ['tileset', id],
    queryFn: () => getTileSet(id),
  })
  const navigate = useNavigate()
  const [tilesetName, setTileSetName] = useState(tilesetData?.name || '')
  const [tileSize, setTileSize] = useState(8)
  const [tileSetImage, setTileSetImage] = useState<string | null>(null);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setTileSetImage(file.name);
  //   }
  // }

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
      if (tilesetData.image) {
        const imageName = tilesetData.image;
        setTileSetImage(imageName);
      } else {
        setTileSetImage(null);
      }
    }
  }, [tilesetData]);


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
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
            value={tileSetImage ?? ''} // Display file name if selected
          /> */}
          <SaveRow handleSave={handleSubmit} />
        </Stack>
        <Stack>
          <TileSetCanvas
            imgUrl={tileSetImage ?? ''}
            tileSize={tileSize}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
