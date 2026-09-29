import { createFileRoute } from '@tanstack/react-router'
import {
  becas,
  calendario,
  cursos,
  dondePedirAyuda,
  preguntasFrecuentes,
} from '@/features/public/data/guia'

export const Route = createFileRoute('/alumno/recursos')({
  component: Recursos,
})

function Recursos() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-semibold'>Recursos</h1>

      <section className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium'>Dónde pedir ayuda</h2>
        {dondePedirAyuda.map((c) => (
          <div key={c.espacio} className='rounded-md border bg-card p-3'>
            <p className='text-sm font-medium'>{c.espacio}</p>
            <p className='text-xs text-muted-foreground'>{c.horario}</p>
            <p className='text-xs'>{c.email}</p>
            <p className='text-xs'>{c.telefono}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium'>Becas y asistencia</h2>
        {becas.map((b) => (
          <div key={b.nombre} className='rounded-md border bg-card p-3'>
            <p className='text-sm font-medium'>{b.nombre}</p>
            <p className='text-xs'>{b.descripcion}</p>
            <p className='text-xs text-muted-foreground'>
              Requisitos: {b.requisitos}
            </p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium'>Cursos de orientación</h2>
        {cursos.map((c) => (
          <div key={c.nombre} className='rounded-md border bg-card p-3'>
            <p className='text-sm font-medium'>{c.nombre}</p>
            <p className='text-xs'>{c.descripcion}</p>
            <p className='text-xs text-muted-foreground'>{c.fecha}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium'>Fechas importantes</h2>
        {calendario.map((f) => (
          <div key={f.titulo} className='rounded-md border bg-card p-3'>
            <p className='text-xs text-muted-foreground'>{f.fecha}</p>
            <p className='text-sm font-medium'>{f.titulo}</p>
            <p className='text-xs'>{f.detalle}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <h2 className='text-sm font-medium'>Preguntas frecuentes</h2>
        {preguntasFrecuentes.map((p) => (
          <details key={p.pregunta} className='rounded-md border bg-card p-3'>
            <summary className='cursor-pointer text-sm font-medium'>
              {p.pregunta}
            </summary>
            <p className='mt-2 text-xs'>{p.respuesta}</p>
          </details>
        ))}
      </section>
    </div>
  )
}
