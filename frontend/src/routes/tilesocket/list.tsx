import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { getTileSockets } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { Stack } from "@mui/material"
import ListCardItem from "../../components/ListCardItem"
import ActionRow from "../../components/buttons/ActionRow"

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

    const navigate = useNavigate()

    const handleClick = (id: string) => {
        if (id) {
            navigate({ to: `/tilesocket/detail/${id}` })
        }
    }

    const handleCreate = () => {
        navigate({ to: '/tilesocket/create' })
    }

    if (!data || data.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>List Tile Socket</h1>
            <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
                <ActionRow handleClick={handleCreate} variant='Create' />
            </Stack>
            <Stack spacing={2} direction='column'>
                {data.map((socket) => (
                    <ListCardItem key={socket.id} handleClick={() => handleClick(socket.id.toString())}>
                            <h2>{socket.name}</h2>
                            <p>{socket.description}</p>
                    </ListCardItem>
                ))}
            </Stack>
        </div>
    )
}