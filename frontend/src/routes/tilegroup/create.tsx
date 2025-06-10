import { Stack, TextField } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { createTileGroup } from '../../api'
import ActionRow from '../../components/buttons/ActionRow'

export const Route = createFileRoute('/tilegroup/create')({
  component: RouteComponent,
})

// TODO add fields for name
function RouteComponent() {
  const [tileGroupName, setTileGroupName] = useState('')

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', tileGroupName)
    await createTileGroup(formData)
  }

  return (
    <Stack spacing={2} direction='column'>
      <h1>Create Tile Group</h1>
      <Stack spacing={2} direction='column'>
        <TextField
          label="Tile Group Name"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={tileGroupName}
          onChange={(e) => setTileGroupName(e.target.value)}
        />
        <ActionRow handleClick={handleSubmit} variant='Create' />
      </Stack>
    </Stack>
  )
}
