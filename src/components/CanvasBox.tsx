import { useEffect } from "react";

const CanvasBox = () => {
    const tileSize = 16;
    const tileColumn = 16;
    let mapCols = 60;
    let mapRows = 40;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize
    const tileAtlas = new Image();

    function draw() {
        let mapIndex = 0;
        let sourceX = 0;
        let sourceY = 0;
        
        const canvas = document.querySelector('canvas');
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        for (let col = 0; col < mapHeight; col += tileSize) {
            for (let row = 0; row < mapWidth; row += tileSize) {
                const randNum = Math.floor(Math.random() * 2);
                console.log('tileVal', randNum, col, row);
                sourceY = Math.floor(randNum/tileColumn) * tileSize;
                sourceX = (randNum % tileColumn) * tileSize;
                console.log('source -- ',sourceX, sourceY);
                ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize, tileSize, row, col, tileSize, tileSize);
                mapIndex++;
            }
        }
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
        <div className="canvas-box">
            <canvas height={mapHeight} width={mapWidth} style={{ border: '1px solid black' }} />
        </div>
    );
}

export default CanvasBox;