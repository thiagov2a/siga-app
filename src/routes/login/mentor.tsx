import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/mentor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/mentor"!</div>
}
