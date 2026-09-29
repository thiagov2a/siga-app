import { useMemo, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Activity,
  ArrowLeft,
  BookOpen,
  ClipboardList,
  ExternalLink,
  TicketPlus,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useStudentsStore } from '@/stores/students-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateTicketSheet } from '@/features/students/components/create-ticket-sheet'
import {
  RiskBadge,
  ProgressBar,
} from '@/features/students/components/risk-badge'
import { calcularScore } from '@/features/students/lib/score'

const barrasAutopercepcion = [
  {
    key: 'organizacion' as const,
    label: 'Organización',
  },
  {
    key: 'acompaniamiento' as const,
    label: 'Acompañamiento',
  },
  {
    key: 'comprensionContenidos' as const,
    label: 'Comprensión de contenidos',
  },
  {
    key: 'sabeDondePedirAyuda' as const,
    label: 'Sabe dónde pedir ayuda',
  },
]

const colorPorValor = (v: number) =>
  v <= 2
    ? 'bg-red-500'
    : v === 3
      ? 'bg-amber-500'
      : v === 4
        ? 'bg-lime-500'
        : 'bg-emerald-500'

function Dato({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-baseline justify-between gap-2'>
      <span className='text-sm text-muted-foreground'>{label}</span>
      <span className='font-medium tabular-nums'>{value}</span>
    </div>
  )
}

function CardIcon({
  icon: Icon,
  tint,
}: {
  icon: typeof BookOpen
  tint: string
}) {
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}
    >
      <Icon className='h-4 w-4' />
    </span>
  )
}

export function StudentDetail({ studentId }: { studentId: string }) {
  const navigate = useNavigate()
  const student = useStudentsStore((s) =>
    s.students.find((st) => st.id === studentId)
  )
  const ingresarComoAlumno = useAuthStore((s) => s.ingresarComoAlumno)
  const [sheetOpen, setSheetOpen] = useState(false)

  const score = useMemo(
    () => (student ? calcularScore(student) : undefined),
    [student]
  )

  if (!student || !score) {
    return (
      <div className='space-y-4'>
        <p className='text-muted-foreground'>No se encontró el estudiante.</p>
        <Button variant='outline' asChild>
          <Link to='/panel'>
            <ArrowLeft />
            Volver al panel
          </Link>
        </Button>
      </div>
    )
  }

  const verComoAlumno = () => {
    ingresarComoAlumno(student.id)
    navigate({ to: '/alumno' })
  }

  return (
    <div className='space-y-6'>
      <Link
        to='/panel'
        className='inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='h-4 w-4' />
        Volver al panel
      </Link>

      <div className='flex flex-wrap items-start gap-4'>
        <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground'>
          {student.nombre
            .split(' ')
            .slice(0, 2)
            .map((p) => p[0])
            .join('')
            .toUpperCase()}
        </div>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl font-bold'>{student.nombre}</h1>
            <RiskBadge risk={score.nivel} />
          </div>
          <p className='text-sm text-muted-foreground'>
            Legajo {student.legajo} · {student.carrera} · Semestre{' '}
            {student.semestre}
          </p>
          <div className='mt-2 flex flex-wrap items-center gap-3'>
            <div className='flex items-baseline gap-1 rounded-lg border bg-muted/40 px-3 py-1.5'>
              <span className='text-2xl font-bold tabular-nums'>
                {score.valor}
              </span>
              <span className='text-sm text-muted-foreground'>/100</span>
            </div>
            {score.factores.length > 0 && (
              <p className='text-sm text-muted-foreground'>
                Factores principales: {score.factores.join(' · ')}.
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button onClick={() => setSheetOpen(true)}>
            <TicketPlus />
            Crear ticket de seguimiento
          </Button>
          <Button variant='outline' onClick={verComoAlumno}>
            <ExternalLink />
            Ver como alumno
          </Button>
        </div>
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center gap-3 space-y-0'>
            <CardIcon icon={BookOpen} tint='bg-primary/10 text-primary' />
            <CardTitle className='text-base'>Trayectoria académica</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Dato label='Semestre' value={`${student.semestre}`} />
            <Dato
              label='Materias cursadas'
              value={`${student.materiasCursadas}`}
            />
            <Dato
              label='Materias aprobadas'
              value={`${student.materiasAprobadas}`}
            />
            <Dato
              label='Materias desaprobadas'
              value={`${student.materiasDesaprobadas}`}
            />
            <Dato label='Promedio' value={`${student.promedio}`} />
            <Dato label='Asistencia' value={`${student.asistencia}%`} />
            {student.asistencia < 70 && (
              <p className='text-xs font-medium text-red-600 dark:text-red-400'>
                Asistencia crítica: menor al 70%
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center gap-3 space-y-0'>
            <CardIcon
              icon={Activity}
              tint='bg-brand-accent/10 text-brand-accent'
            />
            <CardTitle className='text-base'>Participación</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Dato
              label='Último acceso al campus'
              value={
                student.ultimoAccesoCampusDias === 0
                  ? 'Hoy'
                  : `Hace ${student.ultimoAccesoCampusDias} días`
              }
            />
            <Dato
              label='Entregas pendientes'
              value={`${student.entregasPendientes}`}
            />
            <Dato
              label='Consultas a docentes'
              value={`${student.consultasDocente}`}
            />
            <div className='pt-2'>
              <p className='mb-2 text-sm text-muted-foreground'>
                Actividad últimos 14 días
              </p>
              <div className='flex gap-1'>
                {student.actividadUltimos14Dias.map((activo, i) => (
                  <span
                    key={i}
                    title={`Día ${i + 1}: ${activo ? 'actividad' : 'sin actividad'}`}
                    className={cn(
                      'h-4 w-4 rounded-sm',
                      activo ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center gap-3 space-y-0'>
            <CardIcon icon={ClipboardList} tint='bg-chart-1/10 text-chart-1' />
            <CardTitle className='text-base'>
              Autopercepción del alumno
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {barrasAutopercepcion.map((b) => {
              const valor = student.autopercepcion[b.key]
              return (
                <div key={b.key} className='space-y-1'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>{b.label}</span>
                    <span className='font-medium tabular-nums'>{valor}/5</span>
                  </div>
                  <ProgressBar
                    value={(valor / 5) * 100}
                    colorClass={colorPorValor(valor)}
                  />
                </div>
              )
            })}
            <div className='border-t pt-3'>
              <p className='text-sm text-muted-foreground'>
                Necesidad principal
              </p>
              <p className='font-medium'>
                {student.autopercepcion.necesidadPrincipal}
              </p>
            </div>
            {student.autopercepcion.comentario && (
              <div>
                <p className='text-sm text-muted-foreground'>Comentario</p>
                <p className='text-sm italic'>
                  “{student.autopercepcion.comentario}”
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CreateTicketSheet
        student={student}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
