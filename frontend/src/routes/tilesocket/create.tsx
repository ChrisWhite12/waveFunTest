import { Button, Stack, TextField } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { createTileSocket } from "../../api/axios"


export const Route = createFileRoute('/tilesocket/create')({
    component: RouteComponent,
})

function RouteComponent() {
    const [tileSocketName, setTileSocketName] = useState('')
    const [tileSocketDescription, setTileSocketDescription] = useState('')

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', tileSocketName)
        formData.append('description', tileSocketDescription)
        await createTileSocket(formData)
    }

    return (
        <div>
            <h1>Create Tile Socket</h1>
            <Stack spacing={2} direction='column'>
                <TextField
                    label="Tile Socket Name"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={tileSocketName}
                    onChange={(e) => setTileSocketName(e.target.value)}
                />

                <TextField
                    label="Tile Socket Description"
                    variant="outlined"
                    fullWidth
                    className="mb-4"
                    value={tileSocketDescription}
                    onChange={(e) => setTileSocketDescription(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create
                </Button>
            </Stack>
        </div>
    )
}