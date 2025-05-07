import { MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import { useState } from "react";

interface Socket {
    id: number;
    name: string;
    description: string;
}

interface SocketSelectorProps {
    options: Socket[];
    handleSocketChange: (event: SelectChangeEvent) => void;
}

const SocketSelector = ({options, handleSocketChange}: SocketSelectorProps) => {
    // TODO remove full width, square icon? button with popover?
    return (
        <Select
            labelId="socket-select-label"
            id="socket-select"
            value=""
            label="Socket"
            onChange={handleSocketChange}
            sx={{ width: "100%" }}
        >
            <MenuItem value="" disabled>-</MenuItem>
            {options.map((socket) => (
                <Tooltip key={socket.id} title={socket.description} placement="top" arrow>
                    <MenuItem key={socket.id} value={socket.id}>
                        {socket.name}
                    </MenuItem>
                </Tooltip>
            ))}
        </Select>
    );
}

export default SocketSelector;