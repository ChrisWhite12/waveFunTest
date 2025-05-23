import { Card, CardActions, CardContent, Stack } from "@mui/material"

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

    return (
        // TODO: card item
        <Card key={tile.id} sx={{ maxWidth: 300 }}>
            <CardContent>
                <Stack key={tile.id} spacing={2} direction='column'>
                    <p>Size: {tile.size}</p>
                    <p>Position Data: {JSON.stringify(tile.positionData)}</p>
                    <p>Socket Data: {JSON.stringify(tile.socketData)}</p>
                </Stack>
            </CardContent>
            <CardActions></CardActions>
        </Card>

    )
}

export default TileCard