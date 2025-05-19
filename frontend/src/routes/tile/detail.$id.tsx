import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTile } from '../../api'

export const Route = createFileRoute('/tile/detail/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: tileData } = useQuery({
    queryKey: ['tile', id],
    queryFn: () => getTile(id),
  })

  if (!tileData) {
    return <div>Loading...</div>
  }

  return (
    <Stack spacing={2} direction='column'>
      <h1>Tile Detail</h1>
      <h2>{tileData?.name}</h2>
      <p>Tile ID: {tileData?.id}</p>
    </Stack>
  )
}
