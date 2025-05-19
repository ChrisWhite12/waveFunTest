import { Stack } from "@mui/material"
import SocketSelector from "./SocketSelector"
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
}

const SocketGroup = ({tileSize, height, onClick, width, options}: SocketGroupProps) => {

    return (
        <Stack>
            <Stack direction='row' justifyContent='center'>
                {Array.from({length: tileSize}).map((_, index) => (
                    <SocketSelector key={index} options={options} direction="top" />
                ))}
            </Stack>
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <Stack direction='column'>
                    {Array.from({length: tileSize}).map((_, index) => (
                        <SocketSelector key={index} options={options} direction='left' />
                    ))}
                </Stack>
                <Stack sx={{ width: width, height: height }} justifyContent='center' alignItems='center' direction={'row'}>
                    <canvas id="tileBuilder" onClick={onClick} width={width} height={height}></canvas>
                </Stack>
                <Stack direction='column'>
                    {Array.from({length: tileSize}).map((_, index) => (
                        <SocketSelector key={index} options={options} direction="right" />
                    ))}
                </Stack>
            </Stack>
            <Stack direction='row' justifyContent='center'>
                {Array.from({length: tileSize}).map((_, index) => (
                    <SocketSelector key={index} options={options} direction="bottom" />
                ))}
            </Stack>
        </Stack>

    )
}

export default SocketGroup