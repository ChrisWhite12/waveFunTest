

export function putTile( tiles: number[][], row: number, col: number, ctx: CanvasRenderingContext2D, size: number, tileSize: number, tileAtlas: HTMLImageElement) {
    tiles.forEach((tileData, index) => {
        const sourceX = tileData[0] * tileSize;
        const sourceY = tileData[1] * tileSize;
        ctx.drawImage(tileAtlas, sourceX, sourceY, tileSize, tileSize, row + (index % size) * tileSize, col + Math.floor(index / size) * tileSize, tileSize, tileSize);
    });
}
