import { useEffect, useState } from "react";
import { putTile } from "./util";

enum TileType {
    horizontal = 'horizontal',
    vertical = 'vertical',
    topLeft = 'top-left',
    topRight = 'top-right',
    bottomLeft = 'bottom-left',
    bottomRight = 'bottom-right',
    blank = 'blank',
    // tUp = 't-up',
    // tDown = 't-down',
    // tLeft = 't-left',
    // tRight = 't-right',
    // cross = 'cross'
}

type TileDirection = 'top' | 'bottom' | 'left' | 'right';

interface TableCell {
    collapsed: boolean;
    options: TileType[];
    x: number;
    y: number;
}

const CanvasBox = () => {
    const tileSize = 16;
    const tileColumn = 16;
    let mapCols = 10;
    let mapRows = 10;
    let mapHeight = mapRows * tileSize;
    let mapWidth = mapCols * tileSize
    const tileAtlas = new Image();
    const [tilesCollapsed, setTilesCollapsed] = useState(false);
    const [timer, setTimer] = useState(0);

    let tableCells = new Array(mapCols * mapRows).fill(0).map((_, index) => {
        return {
            collapsed: false,
            options: [TileType.horizontal, TileType.vertical, TileType.topLeft, TileType.topRight, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
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
        { name: 'blank', size: 1, tiles: [[0, 0]], socket: [[1], [1], [1], [1]]},
        { name: 't-up', size: 1, tiles: [[7, 1]], socket: [[2], [2], [1], [2]]},
        { name: 't-down', size: 1, tiles: [[6, 1]], socket: [[1], [2], [2], [2]]},
        { name: 't-left', size: 1, tiles: [[7, 0]], socket: [[2], [1], [2], [2]]},
        { name: 't-right', size: 1, tiles: [[6, 0]], socket: [[2], [2], [2], [1]]},
        { name: 'cross', size: 1, tiles: [[6, 3]], socket: [[2], [2], [2], [2]]},
    ]

    const top0 = [TileType.horizontal, TileType.bottomLeft, TileType.bottomRight, TileType.blank];
    const top1 = [TileType.vertical, TileType.topLeft, TileType.topRight];

    const bottom0 = [TileType.horizontal, TileType.topLeft, TileType.topRight, TileType.blank];
    const bottom1 = [TileType.vertical, TileType.bottomLeft, TileType.bottomRight];

    const left0 = [TileType.vertical, TileType.topRight, TileType.bottomRight, TileType.blank];
    const left1 = [TileType.horizontal, TileType.topLeft, TileType.bottomLeft];
    
    const right0 = [TileType.vertical, TileType.bottomLeft, TileType.topLeft, TileType.blank];
    const right1 = [TileType.horizontal, TileType.topRight, TileType.bottomRight];


    const outcomes = {
        [TileType.horizontal]: {
            "top": top0,
            "bottom": bottom0,
            "left": left1,
            "right": right1,
        },
        [TileType.vertical]: {
            "top": top1,
            "bottom": bottom1,
            "left": left0,
            "right": right0,
        },
        [TileType.topLeft]: {
            "top": top0,
            "bottom": bottom1,
            "left": left0,
            "right": right1,
        },
        [TileType.topRight]: {
            "top": top0,
            "bottom": bottom1,
            "left": left1,
            "right": right0,
        },
        [TileType.bottomLeft]: {
            "top": top1,
            "bottom": bottom0,
            "left": left0,
            "right": right1,
        },
        [TileType.bottomRight]: {
            "top": top1,
            "bottom": bottom0,
            "left": left1,
            "right": right0,
        },
        [TileType.blank]: {
            "top": top0,
            "bottom": bottom0,
            "left": left0,
            "right": right0,
        },
        // [TileType.tUp]: {
        //     "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        //     "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        //     "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        //     "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        // },
        // [TileType.tDown]: {
        //     "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        //     "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        //     "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        //     "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        // },
        // [TileType.tLeft]: {
        //     "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        //     "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        //     "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        //     "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        // },
        // [TileType.tRight]: {
        //     "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        //     "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        //     "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        //     "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        // },
        // [TileType.cross]: {
        //     "top": [TileType.vertical, TileType.topLeft, TileType.topRight, TileType.blank],
        //     "bottom": [TileType.vertical, TileType.bottomLeft, TileType.bottomRight, TileType.blank],
        //     "left": [TileType.horizontal, TileType.topLeft, TileType.bottomLeft, TileType.blank],
        //     "right": [TileType.horizontal, TileType.topRight, TileType.bottomRight, TileType.blank],
        // },
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
        if (lowestOptions.length === 0) {
            console.log('All tiles collapsed');
            setTilesCollapsed(true);
            return;
        }

        const randomTile = lowestOptions[Math.floor(Math.random() * lowestOptions.length)];
        if (!randomTile) {
            console.error('randomTile not found', lowestOptions);
            return;
        }
        const randTileIndex = Math.floor(Math.random() * randomTile.options.length)
        tableCells[randomTile.y * mapCols + randomTile.x].collapsed = true;
        tableCells[randomTile.y * mapCols + randomTile.x].options = [randomTile.options[randTileIndex]];


        // draw combination of tiles
        for (let col = 0; col < mapHeight; col += tileSize) {
            for (let row = 0; row < mapWidth; row += tileSize) {
                const tableCell = tableCells[mapIndex];
                if (tableCell.collapsed) {
                    const randomOption = tableCell.options[Math.floor(Math.random() * tableCell.options.length)];
                    const tile = wallTileSet.find(tile => tile.name === randomOption);
                    if (!tile) {
                        console.error('Tile not found');
                        return;
                    }
                    putTile(tile.tiles, row, col, ctx, tile.size, tileSize, tileAtlas);
                    mapIndex++;
                    continue;
                } else {
                    // clear the cell
                    ctx.clearRect(row, col, tileSize, tileSize);

                    ctx.font = '8px Arial';
                    ctx.fillStyle = 'black';
                    ctx.fillText(tableCell.options.length.toString(), row + tileSize / 2, col + tileSize / 2);
                    mapIndex++;
                }
            }
        }

        const checkValidOptions = (cell: TableCell, direction: TileDirection, options: TileType[]) => {
            const validOptions: TileType[] = []
            for (let i = 0; i < cell.options.length; i++) {
                const valid = outcomes[cell.options[i]][direction];
                validOptions.push(...valid);
            }
            //remove option that is not in the validOptions
            for (let i = options.length - 1; i >= 0; i--) {
                if (!validOptions.includes(options[i])) {
                    options.splice(i,1);
                }
            }
            return options;
        }

        const nextTiles = tableCells.map((cell, index) => {
            let options = [TileType.horizontal, TileType.vertical, TileType.topLeft, TileType.topRight, TileType.bottomLeft, TileType.bottomRight, TileType.blank];
            if (cell.collapsed) {
                return cell;
            } else {
                const col = index % mapCols;
                const row = Math.floor(index / mapCols);
                //look for top
                if (row < mapRows - 1) {
                    const topCell = tableCells[index + mapCols];
                    checkValidOptions(topCell, 'bottom', options);
                }

                //look for bottom
                if (row > 0) {
                    const bottomCell = tableCells[index - mapCols];
                    checkValidOptions(bottomCell, 'top', options);
                }

                //look for left
                if (col < mapCols - 1) {
                    const leftCell = tableCells[index + 1];
                    checkValidOptions(leftCell, 'right', options);
                }

                //look for right
                if (col > 0) {
                    const rightCell = tableCells[index - 1];
                    checkValidOptions(rightCell, 'left', options);
                }
                //filter out duplicates
                const uniqueOptions = Array.from(new Set(options));


                return {
                    collapsed: uniqueOptions.length == 1,
                    options: uniqueOptions as TileType[],
                    x: col,
                    y: row
                };
            }
        });

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

        const time1 = setInterval(() => {
            draw();
        }, 10);

        setTimer(time1);
        
        return () => {
            clearInterval(time1);
        }
        
    }, []);

    useEffect(() => {
        if (tilesCollapsed) {
            clearInterval(timer);
        }
    }, [tilesCollapsed, timer]);

    return (
        <div className="canvas-box">
            <canvas height={mapHeight} width={mapWidth} style={{ border: '1px solid black' }} />
        </div>
    );
}

export default CanvasBox;