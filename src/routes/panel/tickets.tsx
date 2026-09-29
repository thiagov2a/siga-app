import { createFileRoute } from '@tanstack/react-router'
import { TicketsPanel } from '@/features/tickets'

export const Route = createFileRoute('/panel/tickets')({
  component: TicketsPanel,
})
