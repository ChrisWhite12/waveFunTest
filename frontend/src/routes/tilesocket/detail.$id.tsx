import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tilesocket/detail/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tilesocket/detail/$id"!</div>
}
