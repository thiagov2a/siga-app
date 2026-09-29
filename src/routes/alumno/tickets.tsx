import { createFileRoute } from '@tanstack/react-router'
import { Inbox } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useStudentsStore } from '@/stores/students-store'
import type {
  InterventionState,
  InterventionType,
} from '@/features/students/data/schema'

export const Route = createFileRoute('/alumno/tickets')({
  component: MisTickets,
})

const TIPOS: Record<InterventionType, string> = {
  tutor_mentor: 'Hablar con un mentor',
  ayuda_contenidos: 'Ayuda con los contenidos',
  informacion_institucional: 'Trámites e información',
}

const ESTADOS: Record<InterventionState, { texto: string; clase: string }> = {
  pendiente: {
    texto: 'Pendiente',
    clase: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  en_curso: {
    texto: 'En seguimiento',
    clase: 'bg-brand-accent/10 text-brand-accent',
  },
  cerrado: {
    texto: 'Cerrado',
    clase:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  },
}

function MisTickets() {
  const userId = useAuthStore((s) => s.userId)
  const todos = useStudentsStore((s) => s.tickets)

  const mios = todos
    .filter((t) => t.studentId === userId)
    .sort((a, b) => b.creadoEn.getTime() - a.creadoEn.getTime())

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Mis tickets</h1>

      {mios.length === 0 && (
        <div className='flex flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center shadow-sm'>
          <Inbox aria-hidden className='h-8 w-8 text-muted-foreground/60' />
          <p className='text-sm font-medium'>Todavía no pediste ayuda</p>
          <p className='text-xs text-muted-foreground'>
            Cuando lo hagas, vas a ver el seguimiento acá.
          </p>
        </div>
      )}

      {mios.map((t) => {
        const estado = ESTADOS[t.estado]
        return (
          <div
            key={t.id}
            className='flex flex-col gap-2 rounded-xl border bg-card p-3 shadow-sm'
          >
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm font-medium'>
                {TIPOS[t.tipoIntervencion]}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${estado.clase}`}
              >
                {estado.texto}
              </span>
            </div>
            <span className='text-xs text-muted-foreground'>
              {t.creadoEn.toLocaleDateString('es-AR')}
              {t.origen === 'alumno'
                ? ' · Pedido por vos'
                : ' · Iniciado por mentoría'}
            </span>
            {t.notas && <p className='text-sm'>{t.notas}</p>}
            {t.resultado && (
              <p className='text-sm'>
                <span className='font-medium'>Resultado: </span>
                {t.resultado}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
