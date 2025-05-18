import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tilegroup/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tilegroup/create"!</div>
}
