import { Button, Stack } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/tile/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleCreate = () => {
    navigate({ to: '/tile/create' })
  }


  return (
    <div>
      <h1>Tile List</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
          <Button variant='contained' onClick={handleCreate}>
              Create Tile
          </Button>
      </Stack>
    </div>
  )
}
