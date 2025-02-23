import { useEffect } from "react";

enum TileType {
    horizontal = 'horizontal',
    vertical = 'vertical',
    topLeft = 'top-left',
    topRight = 'top-right',
    bottomLeft = 'bottom-left',
    bottomRight = 'bottom-right',
    blank = 'blank',
    tUp = 't-up',
    tDown = 't-down',
    tLeft = 't-left',
    tRight = 't-right',
    cross = 'cross'
}

const CanvasBox = () => {
    const tileSize = 16;
    const tileColumn = 16;
    let mapCols = 5;
    let mapRows = 5;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize
    const tileAtlas = new Image();

    let tableCells = new Array(mapCols * mapRows).fill(0).map((_, index) => {
        if (index === 2) {
            return {
                collapsed: true,
                options: [TileType.vertical],
                x: 2,
                y: 0
            };
        }

        if (index === 7 || index === 12) {
            return {
                collapsed: false,
                options: [TileType.horizontal, TileType.vertical],
                x: index % mapCols,
                y: Math.floor(index / mapCols)
            };
        }
        return {
            collapsed: false,
            options: [TileType.horizontal, TileType.vertical, TileType.topLeft, TileType.topRight, TileType.bottomLeft, TileType.bottomRight, TileType.blank, TileType.tUp, TileType.tDown, TileType.tLeft, TileType.tRight, TileType.cross],
            x: index % mapCols,
            y: Math.floor(index / mapCols)
        };
    });

    const roadTileSet = [
        { name: 'horizontal', size: 2, tiles: [[0, 6],[0, 6], [0, 7],[0, 7]], socket: [[1,1], [2,2], [1,1], [2,2]]},
        { name: 'vertical', size: 2, tiles: [[1, 6],[2, 6], [1, 6],[2, 6]], socket: [[2,2], [1,1], [2,2], [1,1]]},
        { name: 'top-left', size: 2, tiles: [[6, 7],[7, 7], [6, 8],[7, 8]], socket: [[2,2], [1,1], [1,1], [2,2]]},
        { name: 'top-right', size: 2, tiles: [[4, 7],[5, 7], [4, 8],[5, 8]], socket: [[2,2], [2,2], [1,1], [1,1]]},
        { name: 'bottom-left', size: 2, tiles: [[6, 5],[7, 5], [6, 6],[7, 6]], socket: [[1,1], [2,2], [2,2], [1,1]]},
        { name: 'bottom-right', size: 2, tiles: [[4, 5],[5, 5], [4, 6],[5, 6]], socket: [[1,1], [1,1], [2,2], [2,2]]},
        { name: 'blank', size: 2, tiles: [[0, 0], [0, 0], [0, 0], [0, 0]], socket: [[1,1], [1,1], [1,1], [1,1]]},
    ]

    const wallTileSet = [
        { name: 'horizontal', size: 1, tiles: [[4, 2]], socket: [[1], [2], [1], [2]]},
        { name: 'vertical', size: 1, tiles: [[3, 1]], socket: [[2], [1], [2], [1]]},
        { name: 'top-left', size: 1, tiles: [[5, 1]], socket: [[2], [1], [1], [2]]},
        { name: 'top-right', size: 1, tiles: [[4, 1]], socket: [[2], [2], [1], [1]]},
        { name: 'bottom-left', size: 1, tiles: [[5, 0]], socket: [[1], [2], [2], [1]]},
        { name: 'bottom-right', size: 1, tiles: [[4, 0]], socket: [[1], [1], [2], [2]]},
        { name: 't-up', size: 1, tiles: [[7, 1]], socket: [[2], [2], [1], [2]]},
        { name: 't-down', size: 1, tiles: [[6, 1]], socket: [[1], [2], [2], [2]]},
        { name: 't-left', size: 1, tiles: [[7, 0]], socket: [[2], [1], [2], [2]]},
        { name: 't-right', size: 1, tiles: [[6, 0]], socket: [[2], [2], [2], [1]]},
        { name: 'cross', size: 1, tiles: [[6, 3]], socket: [[2], [2], [2], [2]]},
    ]

    const outcomes = {
        [TileType.horizontal]: {
            "top": [TileType.horizontal, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.horizontal, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
        [TileType.vertical]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.vertical, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.vertical, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
        [TileType.topLeft]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        },
        [TileType.topRight]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        },
        [TileType.bottomLeft]: {
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
        [TileType.bottomRight]: {
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        },
        [TileType.blank]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
        [TileType.tUp]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        },
        [TileType.tDown]: {
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        },
        [TileType.tLeft]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
        [TileType.tRight]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        },
        [TileType.cross]: {
            "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
            "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
            "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
            "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        },
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

        const tileCopy = tableCells.map(cell => ({ ...cell }));
        const sortedTiles = tileCopy.flat().sort((a, b) => a.options.length - b.options.length);

        const lowestOptions = sortedTiles.filter(tile => tile.collapsed === false).reduce((acc, curr) => {
            if (acc.length === 0) {
                acc.push(curr);
                return acc;
            }
            if (acc[0].options.length === curr.options.length) {
                acc.push(curr);
                return acc;
            }
            return acc;
        }, [] as any[]);

        const randomTile = lowestOptions[Math.floor(Math.random() * lowestOptions.length)];
        const randTileIndex = Math.floor(Math.random() * randomTile.options.length)
        tableCells[randomTile.y * mapCols + randomTile.x].collapsed = true;
        tableCells[randomTile.y * mapCols + randomTile.x].options = [randomTile.options[randTileIndex]];


        // draw combination of tiles
        for (let col = 0; col < mapHeight; col += tileSize) {
            for (let row = 0; row < mapWidth; row += tileSize) {
                const tableCell = tableCells[mapIndex];
                if (tableCell.collapsed) {
                    const tile = wallTileSet.find(tile => tile.name === tableCell.options[0]);
                    console.log('tile', tile);
                    if (!tile) {
                        console.error('Tile not found');
                        return;
                    }
                    putTile(tile.tiles, row, col, ctx, tile.size);
                    mapIndex++;
                    continue;
                } else {
                    ctx.font = '8px Arial';
                    ctx.fillStyle = 'black';
                    ctx.fillText(tableCell.options.length.toString(), row + tileSize / 2, col + tileSize / 2);
                    mapIndex++;
                }
            }
        }

        const nextTiles = tableCells.map((cell, index) => {
            if (cell.collapsed) {
                return cell;
            } else {

                const col = index % mapCols;
                const row = Math.floor(index / mapCols);
                const validOptions = [TileType.horizontal, TileType.vertical, TileType.topLeft, TileType.topRight, TileType.bottomLeft, TileType.bottomRight, TileType.blank, TileType.tUp, TileType.tDown, TileType.tLeft, TileType.tRight, TileType.cross];
                const outOptions: TileType[] = []
                //look for top
                if (row > 0) {
                    const topCell = tableCells[index - mapCols];
                    if (!topCell.collapsed) {
                        validOptions.forEach(option => {
                            if (outcomes[option].top.includes(topCell.options[0])) {
                                outOptions.push(option);
                            }
                        });
                    }
                }

                //look for bottom
                if (row < mapRows - 1) {
                    const bottomCell = tableCells[index + mapCols];
                    if (!bottomCell.collapsed) {
                        validOptions.forEach(option => {
                            if (outcomes[option].bottom.includes(bottomCell.options[0])) {
                                outOptions.push(option);
                            }
                        });
                    }
                }

                //look for left
                if (col > 0) {
                    const leftCell = tableCells[index - 1];
                    if (!leftCell.collapsed) {
                        validOptions.forEach(option => {
                            if (outcomes[option].left.includes(leftCell.options[0])) {
                                outOptions.push(option);
                            }
                        });
                    }
                }

                //look for right
                if (col < mapCols - 1) {
                    const rightCell = tableCells[index + 1];
                    if (!rightCell.collapsed) {
                        validOptions.forEach(option => {
                            if (outcomes[option].right.includes(rightCell.options[0])) {
                                outOptions.push(option);
                            }
                        });
                    }
                }

                //filter out duplicates
                const uniqueOptions = Array.from(new Set(outOptions));


                return {
                    collapsed: uniqueOptions.length == 1,
                    options: uniqueOptions as TileType[],
                    x: col,
                    y: row
                };
            }
        });
        console.log('nextTiles', nextTiles);

        tableCells = nextTiles;

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