import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import type {
  RiskLevel,
  TicketStatus,
  InterventionType,
  InterventionState,
} from './schema'

export const riskLevels: {
  value: RiskLevel
  label: string
  dotClass: string
  badgeClass: string
}[] = [
  {
    value: 'alto',
    label: 'Alto',
    dotClass: 'bg-red-500',
    badgeClass:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900',
  },
  {
    value: 'medio',
    label: 'Medio',
    dotClass: 'bg-amber-500',
    badgeClass:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900',
  },
  {
    value: 'bajo',
    label: 'Bajo',
    dotClass: 'bg-emerald-500',
    badgeClass:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900',
  },
]

export const ticketStatuses: {
  value: TicketStatus
  label: string
  badgeClass: string
  icon: typeof Clock
}[] = [
  {
    value: 'sin_asignar',
    label: 'Sin asignar',
    badgeClass: 'bg-muted text-muted-foreground border-transparent',
    icon: AlertTriangle,
  },
  {
    value: 'en_seguimiento',
    label: 'En seguimiento',
    badgeClass:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900',
    icon: Clock,
  },
  {
    value: 'resuelto',
    label: 'Resuelto',
    badgeClass:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900',
    icon: CheckCircle2,
  },
]

export const interventionTypes: { value: InterventionType; label: string }[] = [
  { value: 'tutor_mentor', label: 'Tutor / Mentor académico' },
  { value: 'ayuda_contenidos', label: 'Ayuda con contenidos' },
  {
    value: 'informacion_institucional',
    label: 'Información institucional',
  },
]

export const interventionStates: {
  value: InterventionState
  label: string
}[] = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_curso', label: 'En curso' },
  { value: 'cerrado', label: 'Cerrado' },
]

export const resultadosIntervencion: { value: string; label: string }[] = [
  { value: 'reincorporado', label: 'Reincorporado' },
  { value: 'sin_cambios', label: 'Sin cambios' },
  { value: 'deserto', label: 'Desertó' },
]

export const necesidades = [
  'Ayuda con contenidos',
  'Tutor o Mentor',
  'Información institucional',
]
