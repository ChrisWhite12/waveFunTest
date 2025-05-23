import { Button, Stack } from "@mui/material"

interface SaveRowProps {
    handleSave: () => void
}

const SaveRow = ({handleSave} : SaveRowProps) => {

    return (
        <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
            <Button onClick={handleSave} variant='contained'>
                Save
            </Button>
        </Stack>
    )
}

export default SaveRow