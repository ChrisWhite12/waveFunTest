import { Box, Stack, TextField } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { putTile } from "./util";

interface TileSelectorProps {}


const TileSelector = ({ }: TileSelectorProps) => {
    const tileAtlas = new Image();
    const tileSize = 16;
    const [tileBuildSize, setTileBuildSize] = useState(1);
    const [selectedTile, setSelectedTile] = useState({ x: 0, y: 0 });

    const draw = () => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        canvas.width = tileAtlas.width;
        canvas.height = tileAtlas.height;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(tileAtlas, 0, 0);
        }

        for (let x = 0; x < tileAtlas.width; x += tileSize) {
            context?.beginPath();
            context?.moveTo(x, 0);
            context?.lineTo(x, tileAtlas.height);
            context?.stroke();
        }

        for (let y = 0; y < tileAtlas.height; y += tileSize) {
            context?.beginPath();
            context?.moveTo(0, y);
            context?.lineTo(tileAtlas.width, y);
            context?.stroke();
        }

    }

    const drawBuilder = () => {
        const canvas = document.getElementById('tileBuilder') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x += tileSize) {
            context?.beginPath();
            context?.moveTo(x, 0);
            context?.lineTo(x, canvas.height);
            context?.stroke();
        }

        for (let y = 0; y < canvas.height; y += tileSize) {
            context?.beginPath();
            context?.moveTo(0, y);
            context?.lineTo(canvas.width, y);
            context?.stroke();
        }
    }

    const handleTileClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xPos = Math.floor(x / tileSize);
        const yPos = Math.floor(y / tileSize);
        setSelectedTile({ x: xPos, y: yPos });
    }

    const handleTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value < 1 || value > 5) {
            return;
        }
        setTileBuildSize(parseInt(event.target.value));
    }

    useEffect(() => {
        tileAtlas.src = '/tileset_arranged.png';
        tileAtlas.onload = () => {
            console.log('tileAtlas loaded');
            draw();
        };
        tileAtlas.onerror = (error) => {
            console.error('Failed to load tileAtlas ', error);
        };      
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, tileSize, tileSize);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(selectedTile.x * tileSize, selectedTile.y * tileSize, tileSize, tileSize);
    }, [selectedTile]);


    useEffect(() => {
        drawBuilder();
    }, [tileBuildSize]);

    return (
        <Stack direction='column' spacing={2}>
            <Stack 
                direction={'row'} 
                sx={{ border: '1px solid black', padding: 2 }}
                justifyContent={'space-between'}    
            >
                <Stack direction='column' spacing={2} alignItems={'center'}>
                    <canvas id="tileSelector" onClick={handleTileClick}></canvas>
                </Stack>
                <Stack>
                    <TextField 
                        label="Tile Size" 
                        value={tileBuildSize}
                        onChange={handleTileSizeChange}
                        type="number"
                    />
                </Stack>
            </Stack>
            <Stack>
                <Box>
                    <canvas id="tileBuilder" width={tileSize * tileBuildSize} height={tileSize * tileBuildSize}></canvas>
                </Box>
            </Stack>
        </Stack>
    );
};

export default TileSelector;