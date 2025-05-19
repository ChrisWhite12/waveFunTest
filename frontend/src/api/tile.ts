import { axiosInstance } from "./axios";

export const createTile = async (data: FormData) => {
    try {
        const response = await axiosInstance.post('api/tiles/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Tile:', error);
        throw error;
    }
}

export const getTiles = async (groupId?: string) => {
    try {
        const response = await axiosInstance.get('api/tiles/', {
            params: {
                group: groupId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Tiles:', error);
        throw error;
    }
}

export const getTile = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/tiles/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Tile:', error);
        throw error;
    }
}

export const updateTile = async (id: string, data: FormData) => {
    try {
        const response = await axiosInstance.put(`api/tiles/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating Tile:', error);
        throw error;
    }
}

export const deleteTile = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`api/tiles/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Tile:', error);
        throw error;
    }
}