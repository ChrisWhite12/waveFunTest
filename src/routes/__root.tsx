import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import HeaderNavigation from '../components/HeaderNavigation'
import '../App.css'

export const Route = createRootRoute({
  component: () => (
    <>
        <HeaderNavigation />
        <Outlet />
        <TanStackRouterDevtools />
    </>
  ),
})