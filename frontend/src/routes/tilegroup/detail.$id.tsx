import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTileGroup, getTileGroup, updateTileGroup } from '../../api'
import { TileGroup } from './list'
import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import DeleteRow from '../../components/DeleteRow'
import TileCard from '../../components/TileCard'
import SaveRow from '../../components/SaveRow'

interface Tiles {
  id: number
  tilesetId: number
  tileGroupId: number
  size: string
  positionData: { x: number, y: number }[][];
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
    queryKey: ['groupTile', id],
    queryFn: () => getTileGroup(id),
  })
  const [groupName, setGroupName] = useState(groupData?.tile_group.name || '')

  const navigate = useNavigate()

  const handleDelete = async () => {
    await deleteTileGroup(id)
    navigate({ to: '/tilegroup/list' })
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', groupName)
    await updateTileGroup(id, formData)
  }

  if (!groupData) {
    return <div>Loading...</div>
  }

  return (
    <Stack spacing={2} direction='column'>
      <h1>Tile Group Detail</h1>
      <DeleteRow handleDelete={handleDelete} />
      <h2>{groupData?.tile_group.name}</h2>
      <TextField
        label="Tile Group Name"
        fullWidth
        className="mb-4"
        value={groupData?.tile_group.name}
        onChange={(e => setGroupName(e.target.value))}
      />
      <p>ID: {groupData?.tile_group.id}</p>
      <Stack spacing={2} direction='row' style={{ flexWrap: 'wrap', display: 'flex' }}>
        {groupData?.tiles.map((tile) => (
            <TileCard tile={tile} key={tile.id} />
        ))}
      </Stack>
      <SaveRow handleSave={handleSubmit} />
    </Stack>
  )
}
