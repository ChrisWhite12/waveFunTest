import { Button, Popover, Tooltip } from "@mui/material";
import { useState } from "react";

interface Socket {
    id: number;
    name: string;
    description: string;
}

export type SocketDirection = 'top' | 'bottom' | 'left' | 'right';

interface SocketSelectorProps {
    options: Socket[];
    handleSocketChange: (value: string) => void;
    direction: SocketDirection;
    value?: string;
}

const SocketSelector = ({options, value, handleSocketChange}: SocketSelectorProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (

        <>
            <Button onClick={handleClick} sx={{ width: '20px', height: '20px', borderRadius: '50%', minWidth: '20px', border: '1px solid grey' }}>
                {value}
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
                                handleSocketChange(socket.name);
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