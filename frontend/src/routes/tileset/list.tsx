import { Stack } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getTileSets, TileSet } from '../../api'
import { useQuery } from '@tanstack/react-query'
import ListCardItem from '../../components/ListCardItem'
import ActionRow from '../../components/buttons/ActionRow'

export const Route = createFileRoute('/tileset/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const { data: tilesetData } = useQuery<TileSet[]>({
    queryKey: ['tilesets'],
    queryFn: getTileSets,
  })

  const handleCreate = () => {
    navigate({ to: '/tileset/create' })
  }


  return (
    <div>
      <h1>Tileset List</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
          <ActionRow handleClick={handleCreate} variant='Create' />
      </Stack>
      <Stack spacing={2} direction='column'>
        {tilesetData?.map((tileset) => (
          <ListCardItem handleClick={() => navigate({ to: `/tileset/detail/${tileset.id}` })} key={tileset.id}>
            <h3>Tileset ID: {tileset.id}</h3>
            <p>Name: {tileset.name}</p>
          </ListCardItem>
        ))}
      </Stack>
    </div>
  )
}
