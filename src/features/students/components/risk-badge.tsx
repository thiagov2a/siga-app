import { cn } from '@/lib/utils'
import { riskLevels } from '../data/data'
import type { RiskLevel } from '../data/schema'
import type { EstadoDelTicket } from '../lib/ticket-estado'

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const cfg = riskLevels.find((r) => r.value === risk)!
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        cfg.badgeClass
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dotClass)} />
      {cfg.label}
    </span>
  )
}

const estadoDelTicketCfg: Record<
  EstadoDelTicket,
  { label: string; cls: string }
> = {
  'Sin asignar': {
    label: 'Sin asignar',
    cls: 'bg-muted text-muted-foreground',
  },
  'En curso': {
    label: 'En curso',
    cls: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  Cerrado: {
    label: 'Cerrado',
    cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  },
}

export function EstadoDelTicketBadge({ estado }: { estado: EstadoDelTicket }) {
  const cfg = estadoDelTicketCfg[estado]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        cfg.cls
      )}
    >
      {cfg.label}
    </span>
  )
}

export function ProgressBar({
  value,
  colorClass = 'bg-primary',
}: {
  value: number
  colorClass?: string
}) {
  return (
    <div className='h-1.5 w-full overflow-hidden rounded-full bg-muted'>
      <div
        className={cn('h-full rounded-full transition-all', colorClass)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
