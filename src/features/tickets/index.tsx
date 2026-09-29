import { useMemo } from 'react'
import {
  CheckCircle2,
  Clock,
  Hourglass,
  Ticket as TicketIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { useStudentsStore } from '@/stores/students-store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  interventionStates,
  interventionTypes,
  resultadosIntervencion,
} from '@/features/students/data/data'
import type { InterventionState, Ticket } from '@/features/students/data/schema'

function iniciales(nombre: string) {
  const partes = nombre.split(' ')
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase()
}

function etiquetaResultado(valor?: string) {
  return resultadosIntervencion.find((r) => r.value === valor)?.label ?? '—'
}

export function TicketsPanel() {
  const tickets = useStudentsStore((s) => s.tickets)
  const students = useStudentsStore((s) => s.students)
  const updateTicket = useStudentsStore((s) => s.updateTicket)

  const ordenados = useMemo(
    () =>
      [...tickets].sort((a, b) => b.creadoEn.getTime() - a.creadoEn.getTime()),
    [tickets]
  )

  const alumnoDe = (t: Ticket) => students.find((s) => s.id === t.studentId)

  const cambiarEstado = (t: Ticket, estado: InterventionState) => {
    updateTicket(t.id, { estado })
    toast.success('Estado del ticket actualizado')
  }

  const cambiarResultado = (t: Ticket, resultado: string) => {
    updateTicket(t.id, { resultado })
    toast.success('Resultado del ticket actualizado')
  }

  const pendientes = tickets.filter((t) => t.estado === 'pendiente').length
  const enCurso = tickets.filter((t) => t.estado === 'en_curso').length
  const cerrados = tickets.filter((t) => t.estado === 'cerrado').length

  const cards = [
    {
      title: 'Total',
      value: tickets.length,
      caption: 'Intervenciones registradas',
      icon: TicketIcon,
      box: 'bg-primary/10 text-primary',
    },
    {
      title: 'Pendientes',
      value: pendientes,
      caption: 'Sin iniciar',
      icon: Clock,
      box: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'En curso',
      value: enCurso,
      caption: 'Intervención activa',
      icon: Hourglass,
      box: 'bg-brand-accent/10 text-brand-accent',
    },
    {
      title: 'Cerrados',
      value: cerrados,
      caption: 'Con resultado definido',
      icon: CheckCircle2,
      box: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ]

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Tickets</h1>
        <p className='text-sm text-muted-foreground'>
          Intervenciones de mentoría abiertas y cerradas
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

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b px-6 py-4'>
          <CardTitle className='text-base font-semibold'>
            Intervenciones
          </CardTitle>
          <span className='text-sm text-muted-foreground tabular-nums'>
            {ordenados.length} en total
          </span>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumno</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenados.map((t) => {
                  const alumno = alumnoDe(t)
                  const tipo = interventionTypes.find(
                    (i) => i.value === t.tipoIntervencion
                  )
                  return (
                    <TableRow key={t.id}>
                      <TableCell className='font-medium'>
                        {alumno ? (
                          <span className='flex items-center gap-2'>
                            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                              {iniciales(alumno.nombre)}
                            </span>
                            <span>
                              <span className='block'>{alumno.nombre}</span>
                              <span className='block text-xs font-normal text-muted-foreground'>
                                Legajo {alumno.legajo}
                              </span>
                            </span>
                          </span>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell className='whitespace-nowrap'>
                        {tipo?.label ?? t.tipoIntervencion}
                      </TableCell>
                      <TableCell className='max-w-40'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className='cursor-default truncate'>
                              {t.notas || '—'}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent className='max-w-xs'>
                            {t.notas || '—'}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className='whitespace-nowrap text-muted-foreground tabular-nums'>
                        {t.creadoEn.toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            t.origen === 'mentor' ? 'default' : 'secondary'
                          }
                        >
                          {t.origen === 'mentor' ? 'Mentor' : 'Alumno'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={t.estado}
                          onValueChange={(v) =>
                            cambiarEstado(t, v as InterventionState)
                          }
                        >
                          <SelectTrigger className='w-32 shrink-0'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {interventionStates.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {t.estado === 'cerrado' ? (
                          <Select
                            value={t.resultado ?? ''}
                            onValueChange={(v) => cambiarResultado(t, v)}
                          >
                            <SelectTrigger className='w-32 shrink-0'>
                              <SelectValue placeholder='Elegí un resultado...' />
                            </SelectTrigger>
                            <SelectContent>
                              {resultadosIntervencion.map((r) => (
                                <SelectItem key={r.value} value={r.value}>
                                  {r.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className='text-sm text-muted-foreground'>
                            {etiquetaResultado(t.resultado)}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {ordenados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className='h-40'>
                      <div className='flex flex-col items-center justify-center gap-2 text-center'>
                        <TicketIcon
                          aria-hidden
                          className='h-8 w-8 text-muted-foreground/60'
                        />
                        <p className='text-sm font-medium'>
                          No hay tickets registrados
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Los tickets que crees desde un estudiante aparecerán
                          acá.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
