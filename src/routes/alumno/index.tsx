import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { students } from '@/features/students/data/students'
import { tickets } from '@/features/students/data/tickets'
import { calcularScore } from '@/features/students/lib/score'

export const Route = createFileRoute('/alumno/')({
  component: Inicio,
})

const COLORES = {
  bajo: '#16a34a',
  medio: '#d97706',
  alto: '#dc2626',
}

const MENSAJES = {
  bajo: 'Venís bien. Seguí así.',
  medio: 'Hay algunas señales para mirar de cerca.',
  alto: 'Te conviene hablar con alguien del equipo de mentoría.',
}

const RADIO = 54
const CIRCUNFERENCIA = 2 * Math.PI * RADIO

function Inicio() {
  const userId = useAuthStore((s) => s.userId)
  const alumno = students.find((s) => s.id === userId)

  if (!alumno) {
    return <p className='p-4'>No encontramos tu perfil. Volvé a ingresar.</p>
  }

  const score = calcularScore(alumno)
  const color = COLORES[score.nivel]
  const ticketAbierto = tickets.find(
    (t) => t.studentId === alumno.id && t.estado !== 'cerrado'
  )

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 p-4'>
      <h1 className='text-xl font-semibold'>Hola, {alumno.nombre}</h1>

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
            stroke={color}
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
              <li key={f} className='rounded-md border p-3 text-sm'>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {ticketAbierto && (
        <div className='rounded-md border border-amber-500 bg-amber-100 p-3 text-sm text-amber-900'>
          {' '}
          Tenés un pedido de ayuda en curso. Podés verlo en la pestaña Tickets.
        </div>
      )}

      <Button className='w-full'>Pedir ayuda</Button>
    </div>
  )
}
