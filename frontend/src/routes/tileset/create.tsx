import { createFileRoute } from '@tanstack/react-router';
import { createTileSet } from '../../api';
import React, { useEffect } from 'react';
import { Stack, TextField } from '@mui/material';

export const Route = createFileRoute('/tileset/create')({
    component: TileSetCreate,
})

function TileSetCreate() {
    const [tileSetName, setTileSetName] = React.useState('');
    const [tileSetImage, setTileSetImage] = React.useState<File | null>(null);
    const [tileSize, setTileSize] = React.useState(8);
    const tileAtlas = React.useRef(new Image());

    const draw = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = tileAtlas.current.width;
        canvas.height = tileAtlas.current.height;
        if (context) {
            context.drawImage(tileAtlas.current, 0, 0);
        }
        for (let x = 0; x < tileAtlas.current.width; x += tileSize) {
            context?.beginPath();
            context?.moveTo(x, 0);
            context?.lineTo(x, tileAtlas.current.height);
            context?.stroke();
        }

        for (let y = 0; y < tileAtlas.current.height; y += tileSize) {
            context?.beginPath();
            context?.moveTo(0, y);
            context?.lineTo(tileAtlas.current.width, y);
            context?.stroke();
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setTileSetImage(file);
            draw()
        }
    }

    const handleTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);
        if (!isNaN(newSize) && newSize >= 8) {
            setTileSize(newSize);
        }
    }

    useEffect(() => {
        if (tileSetImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                tileAtlas.current.src = e.target?.result as string;
                tileAtlas.current.onload = () => {
                    draw();
                }
            };
            reader.readAsDataURL(tileSetImage);
        }
        
    }, [tileSize, tileSetImage]);

    return (
        <Stack>
            <h1 className="text-4xl font-bold mb-4">Create a New TileSet</h1>
            <Stack direction='row' spacing={2} className="p-4" alignItems={'center'} justifyContent={'space-between'}>
                <Stack>
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
                    <button
                        onClick={async () => {
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
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create TileSet
                    </button>
                </Stack>
                <Stack>
                    <canvas
                        id="canvas"
                        width="500"
                        height="500"
                        style={{
                            border: '1px solid black',
                            marginTop: '20px',
                        }}
                    ></canvas>
                </Stack>
            </Stack>
        </Stack>
    )
}