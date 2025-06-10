import { Button, Stack } from "@mui/material"

interface ActionRowProps {
    handleClick: () => void
    variant?: 'Create' | 'Save' | 'Delete'
}

const ActionRow = ({handleClick, variant} : ActionRowProps) => {
    const buttonColor = variant === 'Delete' ? 'error' : 'primary'

    return (
        <Stack spacing={2} direction='row' justifyContent='end' sx={{ py: 2 }}>
            <Button onClick={handleClick} variant='contained' color={buttonColor}>
                {variant}
            </Button>
        </Stack>
    )
}

export default ActionRow