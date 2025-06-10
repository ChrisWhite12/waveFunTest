import { createFileRoute } from '@tanstack/react-router';
import { createTileSet } from '../../api';
import React from 'react';
import { Stack, TextField } from '@mui/material';
import TileSetCanvas from '../../components/TileSetCanvas';
import ActionRow from '../../components/buttons/ActionRow';

export const Route = createFileRoute('/tileset/create')({
    component: TileSetCreate,
})

function TileSetCreate() {
    const [tileSetName, setTileSetName] = React.useState('');
    const [tileSetImage, setTileSetImage] = React.useState<File | null>(null);
    const [tileSize, setTileSize] = React.useState(8);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setTileSetImage(file);
        }
    }

    const handleTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);
        if (!isNaN(newSize) && newSize >= 8) {
            setTileSize(newSize);
        }
    }

    const handleSubmit = async () => {
        if (tileSetName && tileSetImage) {
            const formData = new FormData();
            formData.append('name', tileSetName);
            formData.append('image', tileSetImage);
            formData.append('tile_size', tileSize.toString());

            try {
                const response = await createTileSet(formData);
                console.log('TileSet created:', response);
            } catch (error) {
                alert('Error creating TileSet');
            }
        }
    }

    return (
        <Stack>
            <Stack direction='row' spacing={2} className="p-4" alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction='column' spacing={2}>
                    <TextField
                        label="TileSet Name"
                        variant="outlined"
                        className="mb-4"
                        onChange={(e) => setTileSetName(e.target.value)}
                        value={tileSetName}
                    />
                    <TextField
                        label="Tile size"
                        variant="outlined"
                        type="number"
                        value={tileSize}
                        className="mb-4"
                        onChange={handleTileSizeChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-4"
                    />
                    <ActionRow handleClick={handleSubmit} variant='Create' />
                </Stack>
                <Stack>
                    <TileSetCanvas
                        imgUrl={tileSetImage ? URL.createObjectURL(tileSetImage) : ''}
                        tileSize={tileSize}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}