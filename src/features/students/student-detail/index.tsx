import { useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Activity, UserCircle, Plus } from 'lucide-react'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CreateTicketSheet } from '../components/create-ticket-sheet'
import { ProgressBar, RiskBadge } from '../components/risk-badge'

const autopercepcionLabels: {
  key:
    | 'organizacion'
    | 'acompaniamiento'
    | 'comprensionContenidos'
    | 'sabeDondePedirAyuda'
  label: string
}[] = [
  { key: 'organizacion', label: 'Organización de tiempos' },
  { key: 'acompaniamiento', label: 'Acompañamiento familiar' },
  { key: 'comprensionContenidos', label: 'Comprensión de contenidos' },
  { key: 'sabeDondePedirAyuda', label: 'Sabe dónde pedir ayuda' },
]

export function StudentDetail() {
  const { studentId } = useParams({
    from: '/_authenticated/students/$studentId',
  })
  const student = useStudentsStore((s) => s.getStudent(studentId))
  const tickets = useStudentsStore((s) => s.getTicketsForStudent(studentId))
  const [sheetOpen, setSheetOpen] = useState(false)

  if (!student) {
    return (
      <Main>
        <p>No se encontró el estudiante.</p>
      </Main>
    )
  }

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
        <Link
          to='/students'
          className='mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver a estudiantes
        </Link>

        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary'>
              {student.nombre
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-bold'>{student.nombre}</h1>
                <RiskBadge risk={student.riesgo} />
              </div>
              <p className='text-sm text-muted-foreground'>
                Matrícula: ID {student.legajo} · {student.carrera} ·{' '}
                {student.semestre}° Semestre
              </p>
            </div>
          </div>
          <Button onClick={() => setSheetOpen(true)}>
            <Plus className='h-4 w-4' />
            Crear ticket de seguimiento
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='space-y-4 lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <BookOpen className='h-4 w-4' />
                  Trayectoria académica
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <Stat label='PROMEDIO' value={student.promedio.toFixed(1)} />
                  <Stat
                    label='APROBADAS'
                    value={`${student.materiasAprobadas} materias`}
                    valueClass='text-emerald-600 dark:text-emerald-500'
                  />
                  <Stat
                    label='REPROBADAS'
                    value={`${student.materiasDesaprobadas} materias`}
                    valueClass='text-red-600 dark:text-red-500'
                  />
                </div>
                <div>
                  <div className='mb-1 flex items-center justify-between text-sm'>
                    <span>Asistencia física regular</span>
                    <span
                      className={
                        student.asistencia < 70
                          ? 'font-medium text-red-600 dark:text-red-500'
                          : 'font-medium'
                      }
                    >
                      {student.asistencia}%{' '}
                      {student.asistencia < 70 && '(Crítico)'}
                    </span>
                  </div>
                  <ProgressBar
                    value={student.asistencia}
                    colorClass={
                      student.asistencia < 70
                        ? 'bg-red-500'
                        : student.asistencia < 85
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-base'>
                  <Activity className='h-4 w-4' />
                  Participación y plataforma
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <Stat
                    label='ÚLTIMO ACCESO AL CAMPUS'
                    value={`hace ${student.ultimoAccesoCampusDias} días`}
                  />
                  <Stat
                    label='ENTREGAS PENDIENTES'
                    value={`${student.entregasPendientes} tareas`}
                    valueClass={
                      student.entregasPendientes > 2
                        ? 'text-red-600 dark:text-red-500'
                        : ''
                    }
                  />
                  <Stat
                    label='CONSULTAS DOCENTE'
                    value={`${student.consultasDocente} (semestre)`}
                  />
                </div>
                <div>
                  <p className='mb-2 text-xs font-medium tracking-wide text-muted-foreground'>
                    ACTIVIDAD CAMPUS VIRTUAL (últimos 14 días)
                  </p>
                  <div className='flex gap-1.5'>
                    {student.actividadUltimos14Dias.map((active, i) => (
                      <span
                        key={i}
                        className={`h-6 flex-1 rounded ${
                          active ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {tickets.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>
                    Historial de tickets ({tickets.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {tickets.map((t) => (
                    <div key={t.id} className='rounded-md border p-3 text-sm'>
                      <div className='mb-1 flex items-center justify-between'>
                        <span className='font-medium capitalize'>
                          {t.tipoIntervencion.replace(/_/g, ' ')}
                        </span>
                        <span className='text-xs text-muted-foreground capitalize'>
                          {t.estado.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className='text-muted-foreground'>{t.notas}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className='h-fit'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base'>
                <UserCircle className='h-4 w-4' />
                Autopercepción del estudiante
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {autopercepcionLabels.map(({ key, label }) => {
                const value = student.autopercepcion[key]
                return (
                  <div key={key}>
                    <div className='mb-1 flex items-center justify-between text-sm'>
                      <span>{label}</span>
                      <span className='font-medium'>{value}/5</span>
                    </div>
                    <ProgressBar
                      value={(value / 5) * 100}
                      colorClass={
                        value <= 2
                          ? 'bg-red-500'
                          : value === 3
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }
                    />
                  </div>
                )
              })}

              <div className='rounded-md bg-red-50 p-3 dark:bg-red-950'>
                <p className='mb-1 text-xs font-semibold tracking-wide text-red-700 dark:text-red-400'>
                  NECESIDAD PRINCIPAL DECLARADA
                </p>
                <p className='text-sm text-red-900 dark:text-red-200'>
                  &ldquo;{student.autopercepcion.comentario}&rdquo;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>

      <CreateTicketSheet
        student={student}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div>
      <p className='text-xs font-medium tracking-wide text-muted-foreground'>
        {label}
      </p>
      <p className={`text-lg font-bold ${valueClass ?? ''}`}>{value}</p>
    </div>
  )
}
