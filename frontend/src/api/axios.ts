
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);


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

export const getMyTileSets = async () => {
    try {
        const response = await axiosInstance.get('api/tilesets/my/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSets:', error);
        throw error;
    }
}

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

export const getTileGroups = async () => {
    try {
        const response = await axiosInstance.get('api/tilegroups/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileGroups:', error);
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

export const getTileGroup = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/tilegroups/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TileGroup:', error);
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

export const getTileSockets = async () => {
    try {
        const response = await axiosInstance.get('api/tilesockets/');
        return response.data;
    } catch (error) {
        console.error('Error fetching TileSockets:', error);
        throw error;
    }
}