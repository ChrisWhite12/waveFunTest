import { createFileRoute } from "@tanstack/react-router"
import { getTileSockets } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"
import { Card, Stack } from "@mui/material"

interface TileSocket {
    id: number
    name: string
    description: string
}

export const Route = createFileRoute('/tilesocket/list')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data } = useQuery<TileSocket[]>({
        queryKey: ['tileSockets'],
        queryFn: getTileSockets,
    })

    if (!data || data.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>List Tile Socket</h1>
            <Stack spacing={2} direction='column'>
                {data.map((socket) => (
                    <Card sx={{ padding: 2, width: '100%' }}>
                        <Stack key={socket.id} direction='row' spacing={2} alignItems='center' justifyContent={'space-between'}>
                            <h2>{socket.name}</h2>
                            <p>{socket.description}</p>
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </div>
    )
}