import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import type { Student } from '@/features/students/data/schema'

export const Route = createFileRoute('/alumno/situacion')({
  component: MiSituacion,
})

type Clave =
  | 'organizacion'
  | 'acompaniamiento'
  | 'comprensionContenidos'
  | 'sabeDondePedirAyuda'

const PREGUNTAS: { clave: Clave; texto: string }[] = [
  { clave: 'organizacion', texto: 'Me organizo bien con mis tiempos' },
  { clave: 'acompaniamiento', texto: 'Me siento acompañado/a' },
  { clave: 'comprensionContenidos', texto: 'Entiendo los contenidos' },
  { clave: 'sabeDondePedirAyuda', texto: 'Sé dónde pedir ayuda' },
]

function MiSituacion() {
  const userId = useAuthStore((s) => s.userId)
  const alumno = useStudentsStore((s) =>
    s.students.find((x) => x.id === userId)
  )

  if (!alumno) {
    return <p className='p-4'>No encontramos tu perfil. Volvé a ingresar.</p>
  }

  const diasActivos = alumno.actividadUltimos14Dias.filter(Boolean).length

  const metricas = [
    { titulo: 'Asistencia', valor: `${alumno.asistencia}%` },
    { titulo: 'Promedio', valor: String(alumno.promedio) },
    {
      titulo: 'Materias aprobadas',
      valor: `${alumno.materiasAprobadas} de ${alumno.materiasCursadas}`,
    },
    { titulo: 'Entregas pendientes', valor: String(alumno.entregasPendientes) },
    {
      titulo: 'Último acceso al campus',
      valor: `hace ${alumno.ultimoAccesoCampusDias} días`,
    },
    { titulo: 'Días activos (últimos 14)', valor: String(diasActivos) },
  ]

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-semibold'>Mi situación</h1>

      <div className='grid grid-cols-2 gap-2'>
        {metricas.map((m) => (
          <div
            key={m.titulo}
            className='rounded-xl border bg-card p-3 shadow-sm'
          >
            <p className='text-xs text-muted-foreground'>{m.titulo}</p>
            <p className='text-lg font-semibold tabular-nums'>{m.valor}</p>
          </div>
        ))}
      </div>

      <Encuesta key={alumno.id} alumno={alumno} />
    </div>
  )
}

function Encuesta({ alumno }: { alumno: Student }) {
  const [valores, setValores] = useState<Record<Clave, number>>({
    organizacion: alumno.autopercepcion.organizacion,
    acompaniamiento: alumno.autopercepcion.acompaniamiento,
    comprensionContenidos: alumno.autopercepcion.comprensionContenidos,
    sabeDondePedirAyuda: alumno.autopercepcion.sabeDondePedirAyuda,
  })
  const [guardado, setGuardado] = useState(false)

  function guardar() {
    useStudentsStore.setState((state) => ({
      students: state.students.map((s) =>
        s.id === alumno.id
          ? { ...s, autopercepcion: { ...s.autopercepcion, ...valores } }
          : s
      ),
    }))
    setGuardado(true)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h2 className='text-sm font-medium'>
          ¿Cómo te sentís este cuatrimestre?
        </h2>
        <p className='text-xs text-muted-foreground'>
          1 = nada de acuerdo, 5 = totalmente de acuerdo. Tus respuestas forman
          parte de tu puntaje y solo las ve el equipo de mentoría.
        </p>
      </div>

      {PREGUNTAS.map((p) => (
        <div key={p.clave} className='flex flex-col gap-1'>
          <div className='flex items-center justify-between text-sm'>
            <label htmlFor={p.clave}>{p.texto}</label>
            <span className='font-semibold tabular-nums'>
              {valores[p.clave]}
            </span>
          </div>
          <input
            id={p.clave}
            type='range'
            min={1}
            max={5}
            step={1}
            value={valores[p.clave]}
            onChange={(e) => {
              setGuardado(false)
              setValores({ ...valores, [p.clave]: Number(e.target.value) })
            }}
            className='w-full accent-primary'
          />
        </div>
      ))}

      <Button onClick={guardar}>Guardar mis respuestas</Button>
      {guardado && (
        <p className='text-sm text-emerald-600 dark:text-emerald-400'>
          ¡Listo! Guardamos tus respuestas.
        </p>
      )}
    </div>
  )
}
