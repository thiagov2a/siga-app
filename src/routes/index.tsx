import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CalendarClock,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoIcon } from '@/components/brand/logo'
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

function SectionHeader({
  icon: Icon,
  tint,
  children,
}: {
  icon: typeof Rocket
  tint: string
  children: string
}) {
  return (
    <div className='mb-4 flex items-center gap-3'>
      <span
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}
      >
        <Icon className='h-4 w-4' />
      </span>
      <h2 className='text-xl font-semibold tracking-tight'>{children}</h2>
    </div>
  )
}

function PaginaPublica() {
  return (
    <div className='min-h-svh bg-background'>
      <header className='flex flex-col items-center justify-between gap-4 border-b bg-card p-4 sm:flex-row sm:px-8'>
        <div className='flex items-center gap-2'>
          <LogoIcon className='h-9 w-9' />
          <span className='text-lg font-bold'>SIGA</span>
        </div>
        <div className='flex gap-2'>
          <Button asChild size='sm'>
            <Link to='/login/alumno'>Ingresar como alumno</Link>
          </Button>
          <Button asChild size='sm' variant='outline'>
            <Link to='/login/mentor'>Ingresar como mentor</Link>
          </Button>
        </div>
      </header>

      <section className='border-b bg-card px-4 py-14 text-center'>
        <LogoIcon className='mx-auto h-20 w-20' />
        <p className='mt-5 text-sm font-medium tracking-widest text-brand-accent uppercase'>
          Sistema Informático de Gestión Académica
        </p>
        <h1 className='mt-2 text-4xl font-bold tracking-tight'>
          Tu universidad te acompaña
        </h1>
        <p className='mx-auto mt-3 max-w-xl text-muted-foreground'>
          Detectamos a tiempo las dificultades y te conectamos con quien puede
          ayudarte.
        </p>
        <div className='mt-7 flex flex-wrap justify-center gap-3'>
          <Button asChild size='lg'>
            <Link to='/login/alumno'>Ingresar como alumno</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link to='/login/mentor'>Ingresar como mentor</Link>
          </Button>
        </div>
      </section>

      <main className='mx-auto max-w-3xl space-y-10 px-4 py-12'>
        <section>
          <SectionHeader icon={Rocket} tint='bg-primary/10 text-primary'>
            Primeros pasos
          </SectionHeader>
          <div className='grid gap-3 sm:grid-cols-2'>
            {primerosPasos.map((paso, i) => (
              <div
                key={paso.titulo}
                className='rounded-xl border bg-card p-4 shadow-sm'
              >
                <div className='flex items-start gap-3'>
                  <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary tabular-nums'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className='font-medium'>{paso.titulo}</h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {paso.texto}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            icon={CalendarDays}
            tint='bg-brand-accent/10 text-brand-accent'
          >
            Cursos de orientación y talleres
          </SectionHeader>
          <div className='grid gap-3 sm:grid-cols-2'>
            {cursos.map((curso) => (
              <div
                key={curso.nombre}
                className='rounded-xl border bg-card p-4 shadow-sm'
              >
                <h3 className='font-medium'>{curso.nombre}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {curso.descripcion}
                </p>
                <p className='mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary tabular-nums'>
                  <CalendarDays aria-hidden className='h-3 w-3' />
                  {curso.fecha}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={GraduationCap} tint='bg-chart-1/10 text-chart-1'>
            Becas y asistencia social
          </SectionHeader>
          <div className='grid gap-3 sm:grid-cols-2'>
            {becas.map((beca) => (
              <div
                key={beca.nombre}
                className='rounded-xl border bg-card p-4 shadow-sm'
              >
                <h3 className='font-medium'>{beca.nombre}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {beca.descripcion}
                </p>
                <p className='mt-3 border-t pt-2 text-xs text-muted-foreground'>
                  Requisitos: {beca.requisitos}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={CircleHelp} tint='bg-primary/10 text-primary'>
            Preguntas frecuentes
          </SectionHeader>
          <div className='space-y-2'>
            {preguntasFrecuentes.map((item) => (
              <details
                key={item.pregunta}
                className='group rounded-xl border bg-card px-4 shadow-sm'
              >
                <summary className='flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-medium [&::-webkit-details-marker]:hidden'>
                  {item.pregunta}
                  <ChevronDown
                    aria-hidden
                    className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180'
                  />
                </summary>
                <p className='pb-4 text-sm text-muted-foreground'>
                  {item.respuesta}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            icon={CalendarClock}
            tint='bg-brand-accent/10 text-brand-accent'
          >
            Calendario académico
          </SectionHeader>
          <div className='space-y-2'>
            {calendario.map((evento, i) => (
              <div
                key={`${evento.titulo}-${evento.fecha}-${i}`}
                className='flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm'
              >
                <span className='w-20 shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-center text-xs font-semibold text-primary tabular-nums'>
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
