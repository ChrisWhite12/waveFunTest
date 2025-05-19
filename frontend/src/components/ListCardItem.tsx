import { Card, Stack } from "@mui/material"
import { PropsWithChildren } from "react"

interface ListCardItemProps extends PropsWithChildren {
    handleClick: () => void
}


const ListCardItem = ({ handleClick, children }: ListCardItemProps) => {
    
    return (
        <Card onClick={handleClick} sx={{ padding: 2 }}>
            <Stack direction='row' spacing={2} alignItems='center' justifyContent={'space-between'}>
                {children}
            </Stack>
        </Card>
    )
}

export default ListCardItem