import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  PieChart,
  Search,
  Ticket,
  Users,
} from 'lucide-react'
import { useStudentsStore } from '@/stores/students-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  RiskBadge,
  EstadoDelTicketBadge,
} from '@/features/students/components/risk-badge'
import { riskLevels } from '@/features/students/data/data'
import type { RiskLevel } from '@/features/students/data/schema'
import { calcularScore } from '@/features/students/lib/score'
import { estadoDelTicket } from '@/features/students/lib/ticket-estado'

function iniciales(nombre: string) {
  const partes = nombre.split(' ')
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase()
}

type Filtro = 'todos' | RiskLevel

export function StudentsDashboard() {
  const students = useStudentsStore((s) => s.students)
  const tickets = useStudentsStore((s) => s.tickets)

  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const filas = useMemo(
    () =>
      students
        .map((s) => ({ student: s, score: calcularScore(s) }))
        .sort((a, b) => b.score.valor - a.score.valor),
    [students]
  )

  const visibles = filas.filter(({ student, score }) => {
    const q = busqueda.trim().toLowerCase()
    const coincide =
      q === '' ||
      student.nombre.toLowerCase().includes(q) ||
      student.legajo.includes(q)
    const nivelOk = filtro === 'todos' || score.nivel === filtro
    return coincide && nivelOk
  })

  const alto = filas.filter((f) => f.score.nivel === 'alto').length
  const abiertos = tickets.filter(
    (t) => t.estado === 'pendiente' || t.estado === 'en_curso'
  ).length
  const resueltos = tickets.filter((t) => t.estado === 'cerrado').length

  const conteo: Record<RiskLevel, number> = { alto: 0, medio: 0, bajo: 0 }
  for (const f of filas) conteo[f.score.nivel] += 1

  const actividadPorDia = Array.from(
    { length: 14 },
    (_, d) => students.filter((s) => s.actividadUltimos14Dias[d]).length
  )
  const maxActividad = Math.max(...actividadPorDia, 1)

  const cards = [
    {
      title: 'Riesgo alto',
      value: alto,
      caption: 'Requieren intervención prioritaria',
      icon: AlertTriangle,
      box: 'bg-destructive/10 text-destructive',
    },
    {
      title: 'Monitoreados',
      value: students.length,
      caption: 'En seguimiento activo',
      icon: Users,
      box: 'bg-primary/10 text-primary',
    },
    {
      title: 'Tickets abiertos',
      value: abiertos,
      caption: 'Pendientes y en curso',
      icon: Ticket,
      box: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Resueltos',
      value: resueltos,
      caption: 'Cerrados',
      icon: CheckCircle2,
      box: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ]

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Panel</h1>
        <p className='text-sm text-muted-foreground'>
          Seguimiento de trayectoria estudiantil
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                {c.title}
              </CardTitle>
              <span
                aria-hidden
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.box}`}
              >
                <c.icon className='h-4 w-4' />
              </span>
            </CardHeader>
            <CardContent>
              <p className='text-3xl font-bold tracking-tight tabular-nums'>
                {c.value}
              </p>
              <p className='mt-1 text-xs text-muted-foreground'>{c.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <Card className='flex flex-col'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-base font-semibold'>
              Distribución de riesgo
            </CardTitle>
            <span
              aria-hidden
              className='flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive'
            >
              <PieChart className='h-4 w-4' />
            </span>
          </CardHeader>
          <CardContent className='flex flex-1 flex-col justify-center space-y-3'>
            <div
              className='flex h-3 w-full overflow-hidden rounded-full bg-muted'
              role='img'
              aria-label={`Distribución: ${conteo.alto} en riesgo alto, ${conteo.medio} medio, ${conteo.bajo} bajo`}
            >
              {riskLevels.map((r) => (
                <span
                  key={r.value}
                  className={r.dotClass}
                  style={{
                    width: `${(conteo[r.value] / Math.max(filas.length, 1)) * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className='flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm'>
              {riskLevels.map((r) => (
                <span
                  key={r.value}
                  className='flex items-center gap-1.5 text-muted-foreground'
                >
                  <span
                    aria-hidden
                    className={`h-2 w-2 rounded-full ${r.dotClass}`}
                  />
                  {r.label}
                  <span className='font-medium text-foreground tabular-nums'>
                    {conteo[r.value]}
                  </span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-base font-semibold'>
              Actividad — últimos 14 días
            </CardTitle>
            <span
              aria-hidden
              className='flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent'
            >
              <BarChart3 className='h-4 w-4' />
            </span>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div
              className='flex h-28 items-end gap-1'
              role='img'
              aria-label={`Estudiantes con actividad por día, máximo ${maxActividad}`}
            >
              {actividadPorDia.map((n, d) => (
                <div
                  key={d}
                  className='flex h-full flex-1 flex-col justify-end'
                  title={`Día ${d + 1}: ${n} ${n === 1 ? 'estudiante' : 'estudiantes'}`}
                >
                  <div
                    className={`w-full rounded-t-sm transition-[height] duration-200 ease-out ${
                      n === 0 ? 'bg-muted' : 'bg-primary'
                    }`}
                    style={{
                      height:
                        n === 0
                          ? 2
                          : `${Math.max((n / maxActividad) * 100, 8)}%`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Hace 14 días</span>
              <span className='tabular-nums'>Máx. {maxActividad} al día</span>
              <span>Hoy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative'>
          <Search className='absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar por nombre o legajo...'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className='w-72 ps-9'
          />
        </div>
        <Select value={filtro} onValueChange={(v) => setFiltro(v as Filtro)}>
          <SelectTrigger className='w-44'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='todos'>Todos los niveles</SelectItem>
            {riskLevels.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b px-6 py-4'>
          <CardTitle className='text-base font-semibold'>Estudiantes</CardTitle>
          <span className='text-sm text-muted-foreground tabular-nums'>
            {visibles.length} de {students.length}
          </span>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Nivel de riesgo</TableHead>
                <TableHead className='text-end'>Score</TableHead>
                <TableHead>Asistencia</TableHead>
                <TableHead>Necesidad principal</TableHead>
                <TableHead>Tickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibles.map(({ student, score }) => (
                <TableRow
                  key={student.id}
                  className={
                    score.nivel === 'alto'
                      ? 'relative hover:bg-muted/50'
                      : 'hover:bg-muted/50'
                  }
                >
                  <TableCell className='relative font-medium'>
                    {score.nivel === 'alto' && (
                      <span
                        aria-hidden
                        className='absolute inset-y-0 start-0 w-1 bg-red-500'
                      />
                    )}
                    <Link
                      to='/panel/estudiantes/$studentId'
                      params={{ studentId: student.id }}
                      className='flex items-center gap-3'
                    >
                      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground'>
                        {iniciales(student.nombre)}
                      </span>
                      <span>
                        <span className='block'>{student.nombre}</span>
                        <span className='block text-xs font-normal text-muted-foreground'>
                          Legajo {student.legajo}
                        </span>
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <RiskBadge risk={score.nivel} />
                  </TableCell>
                  <TableCell className='text-end font-semibold tabular-nums'>
                    {score.valor}
                  </TableCell>
                  <TableCell
                    className={`tabular-nums${
                      student.asistencia < 70
                        ? 'font-medium text-red-600 dark:text-red-400'
                        : ''
                    }`}
                  >
                    {student.asistencia}%
                  </TableCell>
                  <TableCell className='text-muted-foreground'>
                    {student.autopercepcion.necesidadPrincipal}
                  </TableCell>
                  <TableCell>
                    <EstadoDelTicketBadge
                      estado={estadoDelTicket(
                        tickets.filter((t) => t.studentId === student.id)
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {visibles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className='h-40'>
                    <div className='flex flex-col items-center justify-center gap-2 text-center'>
                      <Search
                        aria-hidden
                        className='h-8 w-8 text-muted-foreground/60'
                      />
                      <p className='text-sm font-medium'>
                        No se encontraron estudiantes
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        Probá con otro nombre, legajo o nivel de riesgo.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
