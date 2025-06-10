import { Card, CardActionArea, CardContent, Stack } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"

interface TileCardProps {
    tile: {
        id: number
        tilesetId: number
        tileGroupId: number
        size: string
        positionData: { x: number, y: number }[][]
        socketData: any
    }
}


const TileCard = ({ tile }: TileCardProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate({ to: `/tile/detail/${tile.id}` })
    }

    return (
        <Card key={tile.id} sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
                <CardContent>

                <Stack key={tile.id} spacing={2} direction='column'>
                    <p>Size: {tile.size}</p>
                    <p>Position Data: {JSON.stringify(tile.positionData)}</p>
                    <p>Socket Data: {JSON.stringify(tile.socketData)}</p>
                </Stack>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default TileCard