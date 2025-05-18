import { Button, Stack } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/tileset/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleCreate = () => {
    navigate({ to: '/tileset/create' })
  }


  return (
    <div>
      <h1>Tileset List</h1>
      <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
          <Button variant='contained' onClick={handleCreate}>
              Create Tileset
          </Button>
      </Stack>
    </div>
  )
}
