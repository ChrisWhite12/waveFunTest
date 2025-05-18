import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tileset/detail/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tileset/detail/$id"!</div>
}
