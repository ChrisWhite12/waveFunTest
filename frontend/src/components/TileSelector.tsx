import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { putTile } from "./util"
import { createTile, createTileGroup, getTileSockets } from "../api";
import { useQuery } from "@tanstack/react-query";
import SocketSelector from "./SocketSelector";

interface TileSet {
    id: number;
    name: string;
    image: any;
}

interface Coords {
    x: number;
    y: number;
}

interface TileSelectorProps {
    data: TileSet[]
    groupData: any[];
}

interface TileSocket {
    id: number
    name: string
    description: string
}

const TileSelector = ({data, groupData}: TileSelectorProps) => {
    const { data: sockets } = useQuery<TileSocket[]>({
        queryKey: ['tileSockets'],
        queryFn: getTileSockets,
    })

    const tileAtlas = useRef(new Image()); // Use useRef to persist the tileAtlas object
    const tileSize = 16;
    const [tileBuildSize, setTileBuildSize] = useState(1);
    const [selectedTile, setSelectedTile] = useState({ x: 0, y: 0 });
    const options = data.map((tileSet) => ({
        value: tileSet.id,
        label: tileSet.name,
    }));
    const [selectedTileSet, setSelectedTileSet] = useState<string>(options[0].value.toString());
    const [builderData, setBuilderData] = useState<Coords[][]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>('new');

    const draw = () => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        const selectCanvas = document.getElementById('selectSquare') as HTMLCanvasElement;
        canvas.width = tileAtlas.current.width;
        canvas.height = tileAtlas.current.height;
        selectCanvas.width = tileAtlas.current.width;
        selectCanvas.height = tileAtlas.current.height;
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
    };

    const handleTileClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = document.getElementById('tileSelector') as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xPos = Math.floor(x / tileSize);
        const yPos = Math.floor(y / tileSize);
        setSelectedTile({ x: xPos, y: yPos });
    };

    const handleTileSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value < 1 || value > 5) {
            return;
        }
        setTileBuildSize(parseInt(event.target.value));
    };

    const handleTileBuildClick = useCallback((event: MouseEvent<HTMLCanvasElement>) => {
        const canvas1 = document.getElementById('tileBuilder') as HTMLCanvasElement;
        const rect = canvas1.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xPos = Math.floor(x / tileSize);
        const yPos = Math.floor(y / tileSize);
        setBuilderData((prev) => {
            const newData = [...prev];
            newData[yPos][xPos] = { x: selectedTile.x, y: selectedTile.y };
            return newData;
        });
        const ctx1 = canvas1.getContext('2d');
        if (!ctx1 || !tileAtlas.current) {
            console.error('TileAtlas not loaded or invalid context');
            return;
        }
        putTile([[selectedTile.x, selectedTile.y]], xPos * tileSize, yPos * tileSize, ctx1, 1, tileSize, tileAtlas.current);
    }, [tileSize, selectedTile]);

    const handleCreateTile = async (id: string) => {
        const formData = new FormData();
        formData.append('tilesetId', selectedTileSet);
        formData.append('tileGroupId', id);
        formData.append('size', tileSize.toString());
        formData.append('positionData', JSON.stringify(builderData));
        formData.append('socketData', JSON.stringify({}));
        try {
            await createTile(formData);
        } catch (error) {
            console.error('Error creating tile:', error);
        }
    }

    const handleSave = async () => {
        if (selectedGroup === 'new') {
            const formData1 = new FormData();
            formData1.append('name', 'New Group');
            const groupId = await createTileGroup(formData1);
            await handleCreateTile(groupId.id);
        } else {
            const group = groupData.find((group) => group.id == selectedGroup);
            if (!group) {
                console.error('Group not found');
                return;
            }
            await handleCreateTile(group.id);
        }
    }

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

    const handleTileSetChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as string;
        setSelectedTileSet(selectedValue);
        const selectedTileSet = data.find((tileSet) => tileSet.id.toString() == selectedValue);
        if (selectedTileSet) {
            tileAtlas.current = new Image();
            tileAtlas.current.src = selectedTileSet.image;
            tileAtlas.current.onload = () => {
                draw();
            };
            tileAtlas.current.onerror = (error) => {
                console.error('Failed to load tileAtlas. Check the image path or server configuration.', error);
            };
        }
    }

    useEffect(() => {
        drawBuilder();
        setBuilderData(Array.from({ length: tileBuildSize }, () => Array.from({ length: tileBuildSize }, () => ({ x: 0, y: 0 }))));
    }, [tileBuildSize]);

    return (
        <Stack direction='column' spacing={2} sx={{ flex: 1, minHeight: '600px' }}>
            <Stack 
                direction={'row'} 
                sx={{ padding: 2, flex: 1}}
                justifyContent={'space-between'}
                spacing={2}
            >
                <Stack direction={'column'} spacing={2} sx={{ flex: 1 }}>
                    <Select
                        value={selectedTileSet}
                        onChange={handleTileSetChange}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box>
                        {/* TODO center this */}
                        <canvas id="tileSelector" style={{ position: "absolute" }}></canvas>
                        <canvas id="selectSquare" onClick={handleTileClick} style={{ position: "absolute", zIndex: 1 }}></canvas>
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
                    <Select
                        value={selectedGroup}
                        onChange={(event) => setSelectedGroup(event.target.value)}
                    >   
                        <MenuItem value="new">New Group</MenuItem>
                        {groupData.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.id} - {group.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box>
                        <SocketSelector
                            options={sockets ?? []}
                            handleSocketChange={(event: SelectChangeEvent) => {
                                // TODO - handle socket change
                                console.log(event.target.value);
                            }}
                        />
                        {/* TODO - add the socket selectors here */}
                        <canvas id="tileBuilder" onClick={handleTileBuildClick} width={tileSize * tileBuildSize} height={tileSize * tileBuildSize}></canvas>
                    </Box>
                    <Stack>
                        <Button variant="contained" onClick={handleSave}>
                            Save Tile
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default TileSelector;