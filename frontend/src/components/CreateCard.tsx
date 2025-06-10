import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"


const CreateCard = () => {
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate({ to: `/tile/create` })
    }

    return (
        // TODO: card item to button
        <Card sx={{ width: '100%'}}>
            <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
                <CardContent>
                <Stack spacing={2} direction='column'>
                    <Typography variant="body1" component="div">
                        Create New Tile
                    </Typography>
                </Stack>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default CreateCard