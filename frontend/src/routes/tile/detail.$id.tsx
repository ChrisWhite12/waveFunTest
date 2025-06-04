import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteTile, getTile, updateTile } from '../../api'
import DeleteRow from '../../components/DeleteRow'
import SaveRow from '../../components/SaveRow'
import { useEffect } from 'react'

export const Route = createFileRoute('/tile/detail/$id')({
  component: RouteComponent,
})

// TODO test edit - add fields
// <TileSelector data={data} groupData={groupData} /> ?
function RouteComponent() {
  const { id } = Route.useParams()
  const { data: tileData } = useQuery({
    queryKey: ['tile', id],
    queryFn: () => getTile(id),
  })

  const navigate = useNavigate()

  useEffect(() => {
    console.log('tileData', tileData);
  }, [tileData]);

  const handleDelete = async () => {
    await deleteTile(id)
    navigate({ to: '/tile/list' })
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', tileData?.name || '')
    await updateTile(id, formData)
  }


  if (!tileData) {
    return <div>Loading...</div>
  }

  return (
    <Stack spacing={2} direction='column'>
      <h1>Tile Detail</h1>
      <DeleteRow handleDelete={handleDelete} />
      <p>Tile ID: {tileData?.id}</p>
      <h2>{tileData?.name}</h2>
      {/* TODO show tile info and sockets */}
      <SaveRow handleSave={handleSubmit} />
    </Stack>
  )
}
