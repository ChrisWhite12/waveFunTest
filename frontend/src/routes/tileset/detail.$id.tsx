import { Stack, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTileSet, getTileSet, updateTileSet } from '../../api'
import DeleteRow from '../../components/DeleteRow'
import SaveRow from '../../components/SaveRow'
import { useEffect, useState } from 'react'

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
    }
  }, [tilesetData]);


  return (
    <Stack spacing={2} direction='column'>
      <h1>Tileset Detail</h1>
      <DeleteRow handleDelete={handleDelete} />
      <p>Tileset ID: {tilesetData?.id}</p>
      <TextField
        label="Tileset Name"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={tilesetName}
        onChange={(e) => setTileSetName(e.target.value)}
      />
      <SaveRow handleSave={handleSubmit} />
    </Stack>
  )
}
