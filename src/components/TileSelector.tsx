import { Stack } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import { putTile } from "./util";

interface TileSelectorProps {}


const TileSelector = ({ }: TileSelectorProps) => {
    const tileAtlas = new Image();
    const tileSize = 16;

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

    const handleTileClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const tileX = Math.floor(x / tileSize);
        const tileY = Math.floor(y / tileSize);
        const selectedTileCanvas = document.getElementById('selectedTile') as HTMLCanvasElement;
        const ctx = selectedTileCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, tileSize, tileSize);
        putTile([[tileX, tileY]], 0, 0, ctx, 1, tileSize, tileAtlas);
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

    return (
        <Stack direction='row' spacing={2} alignItems={'center'}>
            <canvas id="tileSelector" onClick={handleTileClick}></canvas>
            <canvas id="selectedTile" width={tileSize} height={tileSize}></canvas>
        </Stack>
    );
};

export default TileSelector;