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
            <Link href="/tileset" className="[&.active]:font-bold">
                TileSets
            </Link>
            <Link href="/tileset/create" className="[&.active]:font-bold">
                Create TileSet
            </Link>
            <Link href="/login" className="[&.active]:font-bold">
                Login
            </Link>
            <Link href="/register" className="[&.active]:font-bold">
                Register
            </Link>
        </Stack>
    )
}

export default HeaderNavigation