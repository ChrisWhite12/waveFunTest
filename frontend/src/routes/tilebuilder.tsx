import { Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import TileSelector from '../components/TileSelector'
import { useQuery } from '@tanstack/react-query'
import { getMyTileSets, getTileGroups } from '../api/axios'
import { useEffect } from 'react'

export const Route = createFileRoute('/tilebuilder')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ['myTileSets'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getMyTileSets,
  })

  const { data: groupData } = useQuery({
    queryKey: ['groupTiles'],
    queryFn: getTileGroups,
  })

  if (!data || !groupData) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Stack>
      <Typography>Tile Builder</Typography>
      <TileSelector data={data} groupData={groupData} />
    </Stack>
  )
}
