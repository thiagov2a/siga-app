import { cn } from '@/lib/utils'
import { riskLevels } from '../data/data'
import type { RiskLevel } from '../data/schema'

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

export function TicketStatusBadge({
  status,
}: {
  status: 'sin_asignar' | 'en_seguimiento' | 'resuelto'
}) {
  const cfg = {
    sin_asignar: {
      label: 'Sin asignar',
      cls: 'bg-muted text-muted-foreground',
    },
    en_seguimiento: {
      label: 'En seguimiento',
      cls: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    },
    resuelto: {
      label: 'Resuelto',
      cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
    },
  }[status]

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
