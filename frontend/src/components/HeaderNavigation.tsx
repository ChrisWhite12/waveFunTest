import { Link, Stack, Typography } from "@mui/material"
import { useAuth } from "./AuthProvider";

const HeaderNavigation = () => {
    const { isAuthorized, userId } = useAuth();

    return (
        <Stack direction="row" spacing={2} justifyContent={'space-around'}>
            <Link href="/tileset/list" className="[&.active]:font-bold">
                TileSet
            </Link>
            <Link href="/tilegroup/list" className="[&.active]:font-bold">
                TileGroup
            </Link>
            <Link href="/tilesocket/list" className="[&.active]:font-bold">
                TileSocket
            </Link>
            {!isAuthorized && (
                <>
                    <Link href="/login" className="[&.active]:font-bold">
                        Login
                    </Link>
                    <Link href="/register" className="[&.active]:font-bold">
                        Register
                    </Link>
                </>
            )}
            {isAuthorized && (
                <Typography>Logged in: {userId}</Typography>
            )}
            
        </Stack>
    )
}

export default HeaderNavigation