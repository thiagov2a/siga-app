import { createFileRoute, Link } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'
import {
  primerosPasos,
  cursos,
  becas,
  preguntasFrecuentes,
  calendario,
} from '@/features/public/data/guia'

export const Route = createFileRoute('/')({
  component: PaginaPublica,
})

function PaginaPublica() {
  return (
    <div className='min-h-svh bg-background'>
      <header className='flex flex-col items-center justify-between gap-4 border-b bg-card p-4 sm:flex-row sm:px-8'>
        <div className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <GraduationCap className='h-5 w-5' />
          </div>
          <span className='text-lg font-bold'>SIGA</span>
        </div>
        <div className='flex gap-2'>
          <Link
            to='/login/alumno'
            className='rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'
          >
            Ingresar como alumno
          </Link>
          <Link
            to='/login/mentor'
            className='rounded-lg border px-4 py-2 text-sm font-medium'
          >
            Ingresar como mentor
          </Link>
        </div>
      </header>

      <section className='mx-auto max-w-3xl px-4 py-12 text-center'>
        <h1 className='text-3xl font-bold sm:text-4xl'>
          Tu universidad te acompaña
        </h1>
        <p className='mt-3 text-muted-foreground'>
          Detectamos a tiempo las dificultades y te conectamos con quien puede
          ayudarte.
        </p>
        <div className='mt-6 flex justify-center gap-3'>
          <Link
            to='/login/alumno'
            className='rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground'
          >
            Ingresar como alumno
          </Link>
          <Link
            to='/login/mentor'
            className='rounded-lg border px-6 py-3 font-medium'
          >
            Ingresar como mentor
          </Link>
        </div>
      </section>

      <main className='mx-auto max-w-3xl space-y-10 px-4 pb-16'>
        <section>
          <h2 className='mb-4 text-xl font-semibold'>Primeros pasos</h2>
          <div className='grid gap-3 sm:grid-cols-2'>
            {primerosPasos.map((paso) => (
              <div
                key={paso.titulo}
                className='rounded-lg bg-card p-4 shadow-sm'
              >
                <h3 className='font-medium'>{paso.titulo}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {paso.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-xl font-semibold'>
            Cursos de orientación y talleres
          </h2>
          <div className='grid gap-3 sm:grid-cols-2'>
            {cursos.map((curso) => (
              <div
                key={curso.nombre}
                className='rounded-lg bg-card p-4 shadow-sm'
              >
                <h3 className='font-medium'>{curso.nombre}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {curso.descripcion}
                </p>
                <p className='mt-2 text-xs text-muted-foreground'>
                  {curso.fecha}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-xl font-semibold'>
            Becas y asistencia social
          </h2>
          <div className='grid gap-3 sm:grid-cols-2'>
            {becas.map((beca) => (
              <div
                key={beca.nombre}
                className='rounded-lg bg-card p-4 shadow-sm'
              >
                <h3 className='font-medium'>{beca.nombre}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {beca.descripcion}
                </p>
                <p className='mt-2 text-xs text-muted-foreground'>
                  Requisitos: {beca.requisitos}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-xl font-semibold'>Preguntas frecuentes</h2>
          <div className='space-y-2'>
            {preguntasFrecuentes.map((item) => (
              <details
                key={item.pregunta}
                className='rounded-lg bg-card p-4 shadow-sm'
              >
                <summary className='cursor-pointer font-medium'>
                  {item.pregunta}
                </summary>
                <p className='mt-2 text-sm text-muted-foreground'>
                  {item.respuesta}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className='mb-4 text-xl font-semibold'>Calendario académico</h2>
          <div className='space-y-2'>
            {calendario.map((evento) => (
              <div
                key={evento.titulo}
                className='flex items-start gap-3 rounded-lg bg-card p-4 shadow-sm'
              >
                <span className='w-20 shrink-0 text-sm font-medium text-primary'>
                  {evento.fecha}
                </span>
                <div>
                  <p className='font-medium'>{evento.titulo}</p>
                  <p className='text-sm text-muted-foreground'>
                    {evento.detalle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
