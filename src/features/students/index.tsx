import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
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

  const cards = [
    {
      title: 'Riesgo alto',
      value: alto,
      className: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Monitoreados',
      value: students.length,
      className: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'Tickets abiertos',
      value: abiertos,
      className: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Resueltos',
      value: resueltos,
      className: 'text-emerald-600 dark:text-emerald-400',
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
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                {c.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${c.className}`}>{c.value}</p>
            </CardContent>
          </Card>
        ))}
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
                  <TableCell className='text-end font-semibold'>
                    {score.valor}
                  </TableCell>
                  <TableCell
                    className={
                      student.asistencia < 70
                        ? 'font-medium text-red-600 dark:text-red-400'
                        : undefined
                    }
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
                  <TableCell
                    colSpan={6}
                    className='h-24 text-center text-muted-foreground'
                  >
                    No se encontraron estudiantes.
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
