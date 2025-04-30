import { Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import TileSelector from '../components/TileSelector'

export const Route = createFileRoute('/tilebuilder')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack>
      <Typography>Tile Builder</Typography>
      <TileSelector />
    </Stack>
  )
}
