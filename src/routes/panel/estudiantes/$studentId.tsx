import { createFileRoute } from '@tanstack/react-router'
import { StudentDetail } from '@/features/students/student-detail'

export const Route = createFileRoute('/panel/estudiantes/$studentId')({
  component: function StudentDetailRoute() {
    const { studentId } = Route.useParams()
    return <StudentDetail studentId={studentId} />
  },
})
