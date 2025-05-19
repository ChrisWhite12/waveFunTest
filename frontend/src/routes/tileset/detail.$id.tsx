import { Button, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTileSet, getTileSet } from '../../api'

export const Route = createFileRoute('/tileset/detail/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: tilesetData } = useQuery({
    queryKey: ['tileset', id],
    queryFn: () => getTileSet(id),
  })
  const navigate = useNavigate()
  const handleDelete = async () => {
    await deleteTileSet(id)
    navigate({ to: '/tileset/list' })
  }


  return (
    <Stack spacing={2} direction='column'>
      <h1>Tileset Detail</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
        <Button onClick={handleDelete} variant='contained' color='error'>
          Delete
        </Button>
      </Stack>
      <h2>{tilesetData?.name}</h2>
      <p>Tileset ID: {tilesetData?.id}</p>

    </Stack>
  )
}
