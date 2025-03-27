import { Stack, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import CanvasBox from '../components/CanvasBox'

export const Route = createFileRoute('/generator')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack>
      <Typography>Generator</Typography>
      <CanvasBox />
    </Stack>
  )
}
