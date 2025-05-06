import { Link, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { axiosInstance } from "../api/axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    user_id: string;
    exp: number;
}

const HeaderNavigation = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    
    useEffect(() => {
        auth().catch(() => {
            setIsAuthorized(false)
            setUserId(null);
        })
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await axiosInstance.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
                setUserId(null);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            setUserId(null);
            return;
        }
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.user_id);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (!tokenExpiration || tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };
    
    
    return (
        <Stack direction="row" spacing={2} justifyContent={'space-around'}>
            <Link href="/tilebuilder" className="[&.active]:font-bold">
                Tile Builder
            </Link>
            <Link href="/generator" className="[&.active]:font-bold">
                Generator
            </Link>
            <Link href="/tileset/create" className="[&.active]:font-bold">
                Create TileSet
            </Link>
            <Link href="/tilegroup/list" className="[&.active]:font-bold">
                TileGroup List
            </Link>
            <Link href="/tilesocket/list" className="[&.active]:font-bold">
                TileSocket List
            </Link>
            <Link href="/tilesocket/create" className="[&.active]:font-bold">
                Create TileSocket
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