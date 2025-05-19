import { Button, Stack } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getTiles, Tile } from '../../api'
import { useQuery } from '@tanstack/react-query'
import ListCardItem from '../../components/ListCardItem'

export const Route = createFileRoute('/tile/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleCreate = () => {
    navigate({ to: '/tile/create' })
  }

  const { data: tileData } = useQuery<Tile[]>({
    queryKey: ['tiles'],
    queryFn: () => getTiles(),
  })


  return (
    <div>
      <h1>Tile List</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
          <Button variant='contained' onClick={handleCreate}>
              Create Tile
          </Button>
      </Stack>
        <Stack spacing={2}>
          {tileData?.map((tile) => (
            <ListCardItem handleClick={() => navigate({ to: `/tile/detail/${tile.id}` })} key={tile.id}>
              Tile ID: {tile.id}
            </ListCardItem>
          ))}
        </Stack>
    </div>
  )
}
