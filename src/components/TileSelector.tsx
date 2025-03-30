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
        const selectCanvas = document.getElementById('selectSquare') as HTMLCanvasElement;
        canvas.width = tileAtlas.width;
        canvas.height = tileAtlas.height;
        selectCanvas.width = tileAtlas.width;
        selectCanvas.height = tileAtlas.height;
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

    const handleTileBuildClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas1 = document.getElementById('tileBuilder') as HTMLCanvasElement;
        const rect = canvas1.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xPos = Math.floor(x / tileSize);
        const yPos = Math.floor(y / tileSize);
        const ctx1 = canvas1.getContext('2d');
        if (!ctx1) {
            return;
        }
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        // TODO - having trouble placing the tile in the right position
        putTile([[0,0]], xPos, yPos, ctx1, 1, tileSize, tileAtlas);
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
        const canvas = document.getElementById('selectSquare') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const previewCanvas = document.getElementById('tilePreview') as HTMLCanvasElement;
        const previewCtx = previewCanvas.getContext('2d');
        if (!ctx || !previewCtx) {
            return;
        }
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(selectedTile.x * tileSize, selectedTile.y * tileSize, tileSize, tileSize);
    }, [selectedTile]);


    useEffect(() => {
        drawBuilder();
    }, [tileBuildSize]);

    return (
        <Stack direction='column' spacing={2} sx={{ flex: 1, minHeight: '600px' }}>
            <Stack 
                direction={'row'} 
                sx={{ padding: 2, flex: 1}}
                justifyContent={'space-between'}    
            >
                <Stack sx={{ position: 'relative', padding: 2, flex: 1 }}>
                    <canvas id="tileSelector" style={{ position: "absolute" }}></canvas>
                    <canvas id="selectSquare" onClick={handleTileClick} style={{ position: "absolute", zIndex: 1 }}></canvas>
                    <Box>
                        <canvas id="tilePreview" width={tileSize} height={tileSize}></canvas>
                    </Box>
                </Stack>
                <Stack spacing={2} sx={{ flex: 1 }}>
                    <TextField 
                        label="Tile Size" 
                        value={tileBuildSize}
                        onChange={handleTileSizeChange}
                        type="number"
                    />
                    <Box>
                        <canvas id="tileBuilder" onClick={handleTileBuildClick} width={tileSize * tileBuildSize} height={tileSize * tileBuildSize}></canvas>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default TileSelector;