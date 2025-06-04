import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tilegroup/create')({
  component: RouteComponent,
})

// TODO add fields for name
function RouteComponent() {
  return <div>Hello "/tilegroup/create"!</div>
}
