import { Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import TileSelector from '../components/TileSelector'
import { useQuery } from '@tanstack/react-query'
import { getMyTileSets } from '../api/axios'
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

  useEffect(() => {
    console.log('data', data);
  },[data])


  return (
    <Stack>
      <Typography>Tile Builder</Typography>
      <TileSelector />
    </Stack>
  )
}
