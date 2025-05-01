import { createFileRoute } from '@tanstack/react-router';
import { createTileSet } from '../../api/axios';
import React from 'react';
import { TextField } from '@mui/material';

export const Route = createFileRoute('/tileset/create')({
    component: TileSetCreate,
})

function TileSetCreate() {
    const [tileSetName, setTileSetName] = React.useState('');
    const [tileSetImage, setTileSetImage] = React.useState<File | null>(null);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Create a New TileSet</h1>
            <TextField
                label="TileSet Name"
                variant="outlined"
                className="mb-4"
                onChange={(e) => setTileSetName(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setTileSetImage(e.target.files[0]);
                    }
                }}
                className="mb-4"            
            />
            <button
                onClick={async () => {
                    if (tileSetName && tileSetImage) {
                        const formData = new FormData();
                        formData.append('name', tileSetName);
                        formData.append('image', tileSetImage);

                        try {
                            const response = await createTileSet(formData);
                            console.log('TileSet created:', response);
                            alert('TileSet created successfully!');
                        } catch (error) {
                            console.error('Error creating TileSet:', error);
                            alert('Error creating TileSet');
                        }
                    }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create TileSet
            </button>
        </div>
    )
}