import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import { PedirAyudaSheet } from '@/features/alumno/components/pedir-ayuda-sheet'
import { calcularScore } from '@/features/students/lib/score'

export const Route = createFileRoute('/alumno/')({
  component: Inicio,
})

const CLASES_RING = {
  bajo: 'stroke-emerald-500',
  medio: 'stroke-amber-500',
  alto: 'stroke-red-500',
} as const

const MENSAJES = {
  bajo: 'Venís bien. Seguí así.',
  medio: 'Hay algunas señales para mirar de cerca.',
  alto: 'Te conviene hablar con alguien del equipo de mentoría.',
}

const RADIO = 54
const CIRCUNFERENCIA = 2 * Math.PI * RADIO

function Inicio() {
  const userId = useAuthStore((s) => s.userId)
  const alumno = useStudentsStore((s) =>
    s.students.find((x) => x.id === userId)
  )
  const tickets = useStudentsStore((s) => s.tickets)
  const [abierto, setAbierto] = useState(false)

  if (!alumno) {
    return <p className='p-4'>No encontramos tu perfil. Volvé a ingresar.</p>
  }

  const score = calcularScore(alumno)
  const claseRing = CLASES_RING[score.nivel]
  const ticketAbierto = tickets.find(
    (t) => t.studentId === alumno.id && t.estado !== 'cerrado'
  )

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 p-4'>
      <h1 className='text-2xl font-bold'>Hola, {alumno.nombre}</h1>

      <div className='flex flex-col items-center gap-3'>
        <svg width='140' height='140' viewBox='0 0 140 140'>
          <circle
            cx='70'
            cy='70'
            r={RADIO}
            fill='none'
            stroke='currentColor'
            strokeOpacity='0.15'
            strokeWidth='12'
          />
          <circle
            cx='70'
            cy='70'
            r={RADIO}
            fill='none'
            className={claseRing}
            strokeWidth='12'
            strokeLinecap='round'
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={CIRCUNFERENCIA * (1 - score.valor / 100)}
            transform='rotate(-90 70 70)'
          />
          <text
            x='70'
            y='78'
            textAnchor='middle'
            fontSize='28'
            fontWeight='600'
            fill='currentColor'
          >
            {Math.round(score.valor)}
          </text>
        </svg>
        <p className='text-center text-sm'>{MENSAJES[score.nivel]}</p>
      </div>

      {score.factores.length > 0 && (
        <div>
          <h2 className='mb-2 text-sm font-medium'>Lo que más pesa hoy</h2>
          <ul className='flex flex-col gap-2'>
            {score.factores.map((f) => (
              <li
                key={f}
                className='rounded-xl border bg-card p-3 text-sm shadow-sm'
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {ticketAbierto && (
        <div className='rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-400'>
          Tenés un pedido de ayuda en curso. Podés verlo en la pestaña Tickets.
        </div>
      )}

      <Button className='w-full' onClick={() => setAbierto(true)}>
        Pedir ayuda
      </Button>

      <PedirAyudaSheet
        open={abierto}
        onOpenChange={setAbierto}
        studentId={alumno.id}
      />
    </div>
  )
}
