import { useEffect } from "react";

const CanvasBox = () => {
    const tileSize = 16;
    const tileColumn = 16;
    let mapCols = 20;
    let mapRows = 20;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize
    const tileAtlas = new Image();

    const tileSet = [
        { name: 'horizontal', size: 2, tiles: [[0, 6],[0, 6], [0, 7],[0, 7]], socket: [[1,1], [2,2], [1,1], [2,2]]},
        { name: 'vertical', size: 2, tiles: [[1, 6],[2, 6], [1, 6],[2, 6]], socket: [[2,2], [1,1], [2,2], [1,1]]},
        { name: 'top-left', size: 2, tiles: [[6, 7],[7, 7], [6, 8],[7, 8]], socket: [[2,2], [1,1], [1,1], [2,2]]},
        { name: 'top-right', size: 2, tiles: [[4, 7],[5, 7], [4, 8],[5, 8]], socket: [[2,2], [2,2], [1,1], [1,1]]},
        { name: 'bottom-left', size: 2, tiles: [[6, 5],[7, 5], [6, 6],[7, 6]], socket: [[1,1], [2,2], [2,2], [1,1]]},
        { name: 'bottom-right', size: 2, tiles: [[4, 5],[5, 5], [4, 6],[5, 6]], socket: [[1,1], [1,1], [2,2], [2,2]]},
        { name: 'blank', size: 2, tiles: [[0, 0], [0, 0], [0, 0], [0, 0]], socket: [[1,1], [1,1], [1,1], [1,1]]},
    ]

    const collapsedTileSet = new Array(mapCols * mapRows).fill(0);

    const outcomes = {
        "horizontal": {
            "top": ["horizontal", "top-left", "top-right", "blank"],
            "bottom": ["horizontal", "bottom-left", "bottom-right", "blank"],
            "left": ["horizontal", "top-left", "bottom-left", "blank"],
            "right": ["horizontal", "top-right", "bottom-right", "blank"],
        },
        "vertical": {
            "top": ["vertical", "top-left", "top-right", "blank"],
            "bottom": ["vertical", "bottom-left", "bottom-right", "blank"],
            "left": ["vertical", "top-left", "bottom-left", "blank"],
            "right": ["vertical", "top-right", "bottom-right", "blank"],
        },
        "top-left": {
            "top": ["vertical", "top-left", "top-right", "blank"],
            "bottom": ["horizontal", "bottom-left", "bottom-right", "blank"],
            "left": ["horizontal", "top-left", "bottom-left", "blank"],
            "right": ["vertical", "top-right", "bottom-right", "blank"],
        },
        "top-right": {
            "top": ["vertical", "top-left", "top-right", "blank"],
            "bottom": ["horizontal", "bottom-left", "bottom-right", "blank"],
            "left": ["vertical", "top-left", "bottom-left", "blank"],
            "right": ["horizontal", "top-right", "bottom-right", "blank"],
        },
        "bottom-left": {
            "top": ["horizontal", "top-left", "top-right", "blank"],
            "bottom": ["vertical", "bottom-left", "bottom-right", "blank"],
            "left": ["horizontal", "top-left", "bottom-left", "blank"],
            "right": ["vertical", "top-right", "bottom-right", "blank"],
        },
        "bottom-right": {
            "top": ["horizontal", "top-left", "top-right", "blank"],
            "bottom": ["vertical", "bottom-left", "bottom-right", "blank"],
            "left": ["vertical", "top-left", "bottom-left", "blank"],
            "right": ["horizontal", "top-right", "bottom-right", "blank"],
        },
        "blank": {
            "top": ["horizontal", "top-left", "top-right", "blank"],
            "bottom": ["horizontal", "bottom-left", "bottom-right", "blank"],
            "left": ["horizontal", "top-left", "bottom-left", "blank"],
            "right": ["horizontal", "top-right", "bottom-right", "blank"],
        }
    }

    function putTile( tiles: number[][], row: number, col: number, ctx: CanvasRenderingContext2D, size: number) {
        tiles.forEach((tileData, index) => {
            const sourceX = tileData[0] * tileSize;
            const sourceY = tileData[1] * tileSize;
            ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize, tileSize, row + (index % size) * tileSize, col + Math.floor(index / size) * tileSize, tileSize, tileSize);
        });
    }

    function draw() {
        let mapIndex = 0;
        
        const canvas = document.querySelector('canvas');
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        // draw combination of tiles
        for (let col = 0; col < mapHeight; col += tileSize * 2) {
            for (let row = 0; row < mapWidth; row += tileSize * 2) {
                const tile = tileSet[mapIndex % tileSet.length];
                console.log(row, col, tile);
                putTile(tile.tiles, row, col, ctx, tile.size);
                mapIndex++;
            }
        }

        // for (let col = 0; col < mapHeight; col += tileSize * 2) {
        //     for (let row = 0; row < mapWidth; row += tileSize * 2) {
        //         // if (col == 32) {
        //         //     horizontal(ctx, row, col);
        //         //     continue;
        //         // }
        //         // if (col == 16*3) {
        //         //     continue;
        //         // }
        //         // const randNumX = Math.floor(Math.random() * 4);
        //         // const randNumY = Math.floor(Math.random() * 4);
        //         // console.log('tileVal', randNumX % tileColumn, randNumY % tileColumn);
        //         // sourceY = randNumY % tileColumn * tileSize;
        //         // sourceX = (randNumX % tileColumn) * tileSize;
        //         // console.log('source -- ',sourceX, sourceY);
        //         const tile = tileSet[mapIndex % tileSet.length];
        //         const tileIndex = Math.floor(Math.random() * tile.tiles.length);
        //         const tileData = tile.tiles[tileIndex];
        //         sourceX = tileData[0] * tileSize;
        //         sourceY = tileData[1] * tileSize;
        //         ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize * 2, tileSize * 2, row, col, tileSize * 2, tileSize * 2);
        //         mapIndex = mapIndex + 2;

        //     }
        // }
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