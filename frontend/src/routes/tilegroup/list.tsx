import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getTileGroups } from '../../api'
import { Button, Stack, Typography } from '@mui/material'
import ListCardItem from '../../components/ListCardItem'

export interface TileGroup {
  id: number
  name: string
  description: string
  tile_count: number
  tile_size: number
}

export const Route = createFileRoute('/tilegroup/list')({
  component: RouteComponent,
})

function RouteComponent() {
 const navigate = useNavigate()
  const { data: groupData } = useQuery<TileGroup[]>({
    queryKey: ['groupTiles'],
    queryFn: getTileGroups,
  })

  const handleClick = (id: string) => {
    if (id) {
      navigate({ to: `/tilegroup/detail/${id}` })
    }
  }

  const handleCreate = () => {
    navigate({ to: '/tilegroup/create' })
  }

  if (!groupData || groupData.length === 0) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <h1>Tile Group List</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
          <Button variant='contained' onClick={handleCreate}>
              Create Tile Group
          </Button>
      </Stack>
      <Stack spacing={2} direction='column'>
        {groupData?.map((group) => (
          <ListCardItem handleClick={() => handleClick(group.id.toString())} key={group.id}>
            <Typography variant='h5'>{group.name}</Typography>
          </ListCardItem>
        ))}
      </Stack>
      
    </div>
  )
}
