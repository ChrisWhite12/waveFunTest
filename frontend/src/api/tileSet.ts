import { axiosInstance } from "./axios";

export const getMyTileSets = async () => {
    try {
        const response = await axiosInstance.get('api/tilesets/my/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSets:', error);
        throw error;
    }
}

export const getTileSets = async () => {
    try {
        const response = await axiosInstance.get('api/tilesets/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSets:', error);
        throw error;
    }
}

export const getTileSet = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/tilesets/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSet:', error);
        throw error;
    }
}

export const createTileSet = async (data: FormData) => {
    try {
        const response = await axiosInstance.post('api/tilesets/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating TileSet:', error);
        throw error;
    }
}

export const updateTileSet = async (id: string, data: FormData) => {
    try {
        const response = await axiosInstance.put(`api/tilesets/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating TileSet:', error);
        throw error;
    }
}
