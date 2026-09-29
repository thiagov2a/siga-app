import type { Ticket } from '@/features/students/data/schema'

export type EstadoDelTicket = 'Sin asignar' | 'En curso' | 'Cerrado'

/**
 * Estado derivado de los tickets de un alumno (nunca se persiste):
 * - sin tickets → "Sin asignar"
 * - algún ticket pendiente o en curso → "En curso"
 * - todos los tickets cerrados → "Cerrado"
 */
export function estadoDelTicket(tickets: Ticket[]): EstadoDelTicket {
  if (tickets.length === 0) return 'Sin asignar'
  const abierto = tickets.some(
    (t) => t.estado === 'pendiente' || t.estado === 'en_curso'
  )
  return abierto ? 'En curso' : 'Cerrado'
}
