import { axiosInstance } from "./axios";

export const getTileSockets = async () => {
    try {
        const response = await axiosInstance.get('api/tilesockets/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSockets:', error);
        throw error;
    }
}

export const getTileSocket = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/tilesockets/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSocket:', error);
        throw error;
    }
}

export const createTileSocket = async (data: FormData) => {
    try {
        const response = await axiosInstance.post('api/tilesockets/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating TileSocket:', error);
        throw error;
    }
}

export const updateTileSocket = async (id: string, data: FormData) => {
    try {
        const response = await axiosInstance.put(`api/tilesockets/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating TileSocket:', error);
        throw error;
    }
}

export const deleteTileSocket = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`api/tilesockets/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting TileSocket:', error);
        throw error;
    }
}

