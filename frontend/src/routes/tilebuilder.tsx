import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tilebuilder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tilebuilder"!</div>
}
