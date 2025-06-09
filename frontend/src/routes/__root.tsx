import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../App.css'
import { Stack } from '@mui/material'
import { AuthProvider } from '../components/AuthProvider'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Stack sx={{ width: '100%', height: '100vh' }} spacing={2}>
        <Outlet />
        <TanStackRouterDevtools />
      </Stack>
    </AuthProvider>
  ),
})