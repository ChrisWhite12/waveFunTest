import { axiosInstance } from "./axios";

export const getTileGroups = async () => {
    try {
        const response = await axiosInstance.get('api/tilegroups/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileGroups:', error);
        throw error;
    }
}

export const getTileGroup = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/tilegroups/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TileGroup:', error);
        throw error;
    }
}

export const createTileGroup = async (data: FormData) => {
    try {
        const response = await axiosInstance.post('api/tilegroups/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating TileGroup:', error);
        throw error;
    }
}

export const updateTileGroup = async (id: string, data: FormData) => {
    try {
        const response = await axiosInstance.put(`api/tilegroups/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating TileGroup:', error);
        throw error;
    }
}

export const deleteTileGroup = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`api/tilegroups/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting TileGroup:', error);
        throw error;
    }
}