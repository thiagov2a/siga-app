import { createFileRoute } from '@tanstack/react-router'
import { StudentsDashboard } from '@/features/students'

export const Route = createFileRoute('/panel/')({
  component: StudentsDashboard,
})
