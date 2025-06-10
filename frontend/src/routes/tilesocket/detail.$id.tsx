import { Stack, TextField } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { deleteTileSocket, getTileSocket, updateTileSocket } from '../../api'
import { useQuery } from '@tanstack/react-query'
import ActionRow from '../../components/buttons/ActionRow'

export const Route = createFileRoute('/tilesocket/detail/$id')({
  component: RouteComponent,
})


function RouteComponent() {
  const { id } = Route.useParams()
  const { data: socketData } = useQuery({
    queryKey: ['tileSocket', id],
    queryFn: () => getTileSocket(id),
  })
  const navigate = useNavigate()

  const [tileSocketName, setTileSocketName] = useState(socketData?.name || '')
  const [tileSocketDescription, setTileSocketDescription] = useState(socketData?.description || '')

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', tileSocketName)
    formData.append('description', tileSocketDescription)
    await updateTileSocket(id, formData)
    navigate({ to: '/tilesocket/list' })
  }

  const handleDelete = async () => {
    await deleteTileSocket(id)
    navigate({ to: '/tilesocket/list' })
  }

  useEffect(() => {
    if (socketData) {
      setTileSocketName(socketData.name)
      setTileSocketDescription(socketData.description)
    }
  }, [socketData]);

  return (
    <div>
      <h1>Tile Socket Detail</h1>
      <ActionRow handleClick={handleDelete} variant='Delete' />
      <Stack spacing={2} direction='column'>
        <TextField
          label="Tile Socket Name"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={tileSocketName}
          onChange={(e) => setTileSocketName(e.target.value)}
        />

        <TextField
          label="Tile Socket Description"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={tileSocketDescription}
          onChange={(e) => setTileSocketDescription(e.target.value)}
        />
        <ActionRow handleClick={handleSubmit} variant='Save' />
      </Stack>
    </div>
  )
}
