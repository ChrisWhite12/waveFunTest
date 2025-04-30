import { Link, Stack } from "@mui/material"

const HeaderNavigation = () => {
    
    
    return (
        <Stack direction="row" spacing={2} justifyContent={'space-around'}>
            <Link href="/" className="[&.active]:font-bold">
                Home
            </Link>
            <Link href="/tilebuilder" className="[&.active]:font-bold">
                Tile Builder
            </Link>
            <Link href="/generator" className="[&.active]:font-bold">
                Generator
            </Link>
        </Stack>
    )
}

export default HeaderNavigation