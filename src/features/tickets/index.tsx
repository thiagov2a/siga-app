import { useNavigate } from '@tanstack/react-router'
import { useStudentsStore } from '@/stores/students-store'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { interventionStates, interventionTypes } from '../students/data/data'

export function TicketsPage() {
  const navigate = useNavigate()
  const tickets = useStudentsStore((s) => s.tickets)
  const students = useStudentsStore((s) => s.students)

  const sorted = [...tickets].sort(
    (a, b) => b.creadoEn.getTime() - a.creadoEn.getTime()
  )

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Tickets de seguimiento
          </h1>
          <p className='text-muted-foreground'>
            Historial de intervenciones creadas por mentoría.
          </p>
        </div>

        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Tipo de intervención</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead>Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((t) => {
                  const student = students.find((s) => s.id === t.studentId)
                  const tipo = interventionTypes.find(
                    (it) => it.value === t.tipoIntervencion
                  )?.label
                  const estado = interventionStates.find(
                    (is) => is.value === t.estado
                  )?.label
                  return (
                    <TableRow
                      key={t.id}
                      className='cursor-pointer'
                      onClick={() =>
                        student &&
                        navigate({
                          to: '/students/$studentId',
                          params: { studentId: student.id },
                        })
                      }
                    >
                      <TableCell className='font-medium'>
                        {student?.nombre ?? 'Estudiante eliminado'}
                      </TableCell>
                      <TableCell>{tipo}</TableCell>
                      <TableCell>{estado}</TableCell>
                      <TableCell className='max-w-xs truncate'>
                        {t.notas}
                      </TableCell>
                      <TableCell className='text-sm text-muted-foreground'>
                        {t.creadoEn.toLocaleDateString('es-AR')}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='py-8 text-center text-muted-foreground'
                    >
                      Todavía no se crearon tickets. Entrá al detalle de un
                      estudiante para generar el primero.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
