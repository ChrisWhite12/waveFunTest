import { axiosInstance } from "./axios";

// TODO - handle errors with state management
export const tokenRefresh = async ( refreshToken: string) => {
    const res = await axiosInstance.post("/api/token/refresh/", {
        refresh: refreshToken,
    });
    return res;
}