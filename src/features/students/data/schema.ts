import { z } from 'zod'

export const riskLevelSchema = z.union([
  z.literal('alto'),
  z.literal('medio'),
  z.literal('bajo'),
])
export type RiskLevel = z.infer<typeof riskLevelSchema>

export const ticketStatusSchema = z.union([
  z.literal('sin_asignar'),
  z.literal('en_seguimiento'),
  z.literal('resuelto'),
])
export type TicketStatus = z.infer<typeof ticketStatusSchema>

export const interventionTypeSchema = z.union([
  z.literal('tutor_mentor'),
  z.literal('ayuda_contenidos'),
  z.literal('informacion_institucional'),
])
export type InterventionType = z.infer<typeof interventionTypeSchema>

export const interventionStateSchema = z.union([
  z.literal('pendiente'),
  z.literal('en_curso'),
  z.literal('cerrado'),
])
export type InterventionState = z.infer<typeof interventionStateSchema>

export const studentSchema = z.object({
  id: z.string(),
  legajo: z.string(),
  nombre: z.string(),
  carrera: z.string(),
  semestre: z.number(),
  edad: z.number(),
  horasTrabajoSemana: z.number(),
  modalidad: z.string(),
  // trayectoria
  materiasCursadas: z.number(),
  materiasAprobadas: z.number(),
  materiasDesaprobadas: z.number(),
  promedio: z.number(),
  asistencia: z.number(),
  // participación
  ultimoAccesoCampusDias: z.number(),
  entregasPendientes: z.number(),
  consultasDocente: z.number(),
  actividadUltimos14Dias: z.array(z.boolean()).length(14),
  // autopercepción (1-5)
  autopercepcion: z.object({
    organizacion: z.number().min(1).max(5),
    acompaniamiento: z.number().min(1).max(5),
    comprensionContenidos: z.number().min(1).max(5),
    sabeDondePedirAyuda: z.number().min(1).max(5),
    necesidadPrincipal: z.string(),
    comentario: z.string(),
  }),
  estadoTicket: ticketStatusSchema,
})
export type Student = z.infer<typeof studentSchema>

const ticketOriginSchema = z.union([
  z.literal('alumno'),
  z.literal('mentor'),
])

export const ticketSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  tipoIntervencion: interventionTypeSchema,
  notas: z.string(),
  estado: interventionStateSchema,
  resultado: z.string().optional(),
  creadoEn: z.coerce.date(),
  origen: ticketOriginSchema,
})
export type Ticket = z.infer<typeof ticketSchema>
