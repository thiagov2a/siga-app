import { createFileRoute } from '@tanstack/react-router'
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
    clase: 'bg-amber-100 text-amber-900',
  },
  en_curso: {
    texto: 'En seguimiento',
    clase: 'bg-blue-100 text-blue-900',
  },
  cerrado: {
    texto: 'Cerrado',
    clase: 'bg-green-100 text-green-900',
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
      <h1 className='text-xl font-semibold'>Mis tickets</h1>

      {mios.length === 0 && (
        <p className='text-sm text-muted-foreground'>
          Todavía no pediste ayuda. Cuando lo hagas, vas a ver el seguimiento
          acá.
        </p>
      )}

      {mios.map((t) => {
        const estado = ESTADOS[t.estado]
        return (
          <div
            key={t.id}
            className='flex flex-col gap-2 rounded-md border bg-card p-3'
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
