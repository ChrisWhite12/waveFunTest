import { Button, Stack } from "@mui/material"

interface DeleteRowProps {
    handleDelete: () => void
}

const DeleteRow = ({handleDelete} : DeleteRowProps) => {

    return (
        <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
            <Button onClick={handleDelete} variant='contained' color='error'>
                Delete
            </Button>
        </Stack>
    )
}

export default DeleteRow