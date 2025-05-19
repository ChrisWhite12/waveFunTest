import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getTileGroup } from '../../api'
import { TileGroup } from './list'
import { Stack } from '@mui/material'

interface Tiles {
  id: number
  tilesetId: number
  tileGroupId: number
  size: string
  positionData: {x: number, y: number}[][];
  socketData: any;
}

interface TileGroupDetail {
  tile_group: TileGroup
  tiles: Tiles[]
}

export const Route = createFileRoute('/tilegroup/detail/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: groupData } = useQuery<TileGroupDetail>({
    queryKey: ['groupTiles'],
    queryFn: () => getTileGroup(id),
  })

  return (
    <Stack spacing={2} direction='column'>
      <h1>Tile Group Detail</h1>
      <h2>{groupData?.tile_group.name}</h2>
      <p>Tile ID: {groupData?.tile_group.id}</p>
      <Stack spacing={2} direction='column'>
        {groupData?.tiles.map((tile) => (
          <Stack key={tile.id} spacing={2} direction='column'>
            <h3>Tile ID: {tile.id}</h3>
            <p>Tileset ID: {tile.tilesetId}</p>
            <p>Tile Group ID: {tile.tileGroupId}</p>
            <p>Size: {tile.size}</p>
            <p>Position Data: {JSON.stringify(tile.positionData)}</p>
            <p>Socket Data: {JSON.stringify(tile.socketData)}</p>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
