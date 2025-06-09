
import { Stack } from "@mui/material";
import { useEffect, useRef } from "react";

interface TileSetCanvasProps {
    // Define any props you need here
    imgUrl: string;
    tileSize: number;
}

const TileSetCanvas = ({imgUrl, tileSize}: TileSetCanvasProps) => {
    const tileAtlas = useRef(new Image());


    const draw = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        canvas.width = tileAtlas.current.width;
        canvas.height = tileAtlas.current.height;
        const context = canvas.getContext('2d');
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

    useEffect(() => {
        if (imgUrl) {
            tileAtlas.current.src = imgUrl;
            tileAtlas.current.onload = () => {
                draw();
            }
        }
    }, [imgUrl, tileSize]);


    return (
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
    )
}

export default TileSetCanvas;