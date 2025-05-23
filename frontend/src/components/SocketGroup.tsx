import { Stack } from "@mui/material"
import SocketSelector, { SocketDirection } from "./SocketSelector"
import { MouseEvent } from "react"

interface SocketGroupProps {
    tileSize: number
    onClick?: (event: MouseEvent<HTMLCanvasElement>) => void
    width?: number
    height?: number
    options: {
        id: number
        name: string
        description: string
    }[]
    socketData: Socket
    handleSocketChange: (direction: SocketDirection, index: number) => (value: string) => void;
}

export interface Socket {
    top: string[]
    bottom: string[]
    left: string[]
    right: string[]
}

const SocketGroup = ({ tileSize, height, onClick, width, options, socketData, handleSocketChange }: SocketGroupProps) => {

    return (
        <Stack>
            <Stack direction='row' justifyContent='center'>
                {Array.from({ length: tileSize }).map((_, index) => (
                    <SocketSelector
                        key={index}
                        options={options}
                        direction="top"
                        value={socketData.top[index]}
                        handleSocketChange={handleSocketChange('top', index)}
                    />
                ))}
            </Stack>
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <Stack direction='column'>
                    {Array.from({ length: tileSize }).map((_, index) => (
                        <SocketSelector
                            key={index}
                            options={options}
                            direction='left'
                            value={socketData.left[index]}
                            handleSocketChange={handleSocketChange('left', index)}
                        />
                    ))}
                </Stack>
                <Stack sx={{ width: width, height: height }} justifyContent='center' alignItems='center' direction={'row'}>
                    <canvas id="tileBuilder" onClick={onClick} width={width} height={height}></canvas>
                </Stack>
                <Stack direction='column'>
                    {Array.from({ length: tileSize }).map((_, index) => (
                        <SocketSelector
                            key={index}
                            options={options}
                            direction="right"
                            value={socketData.right[index]}
                            handleSocketChange={handleSocketChange('right', index)}
                        />
                    ))}
                </Stack>
            </Stack>
            <Stack direction='row' justifyContent='center'>
                {Array.from({ length: tileSize }).map((_, index) => (
                    <SocketSelector
                        key={index}
                        options={options}
                        direction="bottom"
                        value={socketData.bottom[index]}
                        handleSocketChange={handleSocketChange('bottom', index)}
                    />
                ))}
            </Stack>
        </Stack>

    )
}

export default SocketGroup