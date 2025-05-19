import { Button, MenuItem, Popover, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import { useState } from "react";

interface Socket {
    id: number;
    name: string;
    description: string;
}

interface SocketSelectorProps {
    options: Socket[];
    // handleSocketChange: (event: SelectChangeEvent) => void;
    direction: 'top' | 'bottom' | 'left' | 'right';
}

const SocketSelector = ({options}: SocketSelectorProps) => {
    // TODO remove full width, square icon? button with popover?
    // TODO need to have multiple socket selectors that expand with tile size
    const [selectedSocket, setSelectedSocket] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (

        <>
            <Button onClick={handleClick} sx={{ width: '20px', height: '20px', borderRadius: '50%', minWidth: '20px', border: '1px solid grey' }}>
                {selectedSocket}
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {options.map((socket) => (
                    
                    <Tooltip key={socket.id} title={socket.description} placement="top" arrow>
                        <Button
                            key={socket.id}
                            value={socket.id}
                            onClick={() => {
                                setSelectedSocket(socket.name);
                                setAnchorEl(null);
                            }}
                            sx={{
                                width: '20px',
                                height: '20px',
                                minWidth: '20px',
                            }}
                        >
                            {socket.name}
                        </Button>
                    </Tooltip>
                ))}
            </Popover>
        </>
    );
}

export default SocketSelector;