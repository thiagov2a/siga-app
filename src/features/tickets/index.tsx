import { useMemo } from 'react'
import { toast } from 'sonner'
import { useStudentsStore } from '@/stores/students-store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Tickets</h1>
        <p className='text-sm text-muted-foreground'>
          Intervenciones de mentoría abiertas y cerradas
        </p>
      </div>

      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead>Tipo de intervención</TableHead>
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
                    <TableCell>{tipo?.label ?? t.tipoIntervencion}</TableCell>
                    <TableCell className='max-w-64'>
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
                    <TableCell className='whitespace-nowrap text-muted-foreground'>
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
                        <SelectTrigger className='w-32'>
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
                          <SelectTrigger className='w-36'>
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
                  <TableCell
                    colSpan={7}
                    className='h-24 text-center text-muted-foreground'
                  >
                    No hay tickets registrados.
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
