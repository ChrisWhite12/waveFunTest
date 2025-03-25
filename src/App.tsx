import { Stack } from '@mui/material'
import './App.css'
import CanvasBox from './components/CanvasBox'
import TileSelector from './components/TileSelector'

function App() {
  
  return (
    <Stack direction="column" spacing={2} sx={{ border: '1px solid black', padding: 2 }}>
      <CanvasBox />
      <TileSelector />
    </Stack>
  )
}

export default App
