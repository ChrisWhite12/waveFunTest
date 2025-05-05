import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { getTileGroups } from '../../api/axios'
import { Card, Stack, Typography } from '@mui/material'

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

  if (!groupData || groupData.length === 0) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <h1>Tile Group List</h1>
      <Stack spacing={2} direction='column'>
        {groupData.map((group) => (
          <Card key={group.id} sx={{ padding: 2 }} onClick={() => handleClick(group.id.toString())}>
            <Typography variant='h5'>{group.name}</Typography>
          </Card>
        ))}
      </Stack>
      
    </div>
  )
}
