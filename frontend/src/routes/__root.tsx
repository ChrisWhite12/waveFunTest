import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import HeaderNavigation from '../components/HeaderNavigation'
import '../App.css'
import { Stack } from '@mui/material'

export const Route = createRootRoute({
  component: () => (
    <>
      <Stack sx={{ width: '100%', height: '100vh' }} spacing={2}>
        <HeaderNavigation />
        <Outlet />
        <TanStackRouterDevtools />
      </Stack>
    </>
  ),
})