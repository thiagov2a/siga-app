import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarClock,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LifeBuoy,
} from 'lucide-react'
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

function SectionHeader({
  icon: Icon,
  tint,
  children,
}: {
  icon: typeof LifeBuoy
  tint: string
  children: string
}) {
  return (
    <div className='flex items-center gap-3'>
      <span
        aria-hidden
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${tint}`}
      >
        <Icon className='h-4 w-4' />
      </span>
      <h2 className='text-base font-semibold tracking-tight'>{children}</h2>
    </div>
  )
}

function Recursos() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-semibold'>Recursos</h1>

      <section className='flex flex-col gap-2'>
        <SectionHeader
          icon={LifeBuoy}
          tint='bg-brand-accent/10 text-brand-accent'
        >
          Dónde pedir ayuda
        </SectionHeader>
        {dondePedirAyuda.map((c) => (
          <div
            key={c.espacio}
            className='rounded-xl border bg-card p-3 shadow-sm'
          >
            <p className='text-sm font-medium'>{c.espacio}</p>
            <p className='text-xs text-muted-foreground'>{c.horario}</p>
            <p className='text-xs'>{c.email}</p>
            <p className='text-xs'>{c.telefono}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <SectionHeader icon={GraduationCap} tint='bg-chart-1/10 text-chart-1'>
          Becas y asistencia
        </SectionHeader>
        {becas.map((b) => (
          <div
            key={b.nombre}
            className='rounded-xl border bg-card p-3 shadow-sm'
          >
            <p className='text-sm font-medium'>{b.nombre}</p>
            <p className='text-xs'>{b.descripcion}</p>
            <p className='mt-1 border-t pt-1 text-xs text-muted-foreground'>
              Requisitos: {b.requisitos}
            </p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <SectionHeader icon={CalendarDays} tint='bg-primary/10 text-primary'>
          Cursos de orientación
        </SectionHeader>
        {cursos.map((c) => (
          <div
            key={c.nombre}
            className='rounded-xl border bg-card p-3 shadow-sm'
          >
            <p className='text-sm font-medium'>{c.nombre}</p>
            <p className='text-xs'>{c.descripcion}</p>
            <p className='mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary tabular-nums'>
              <CalendarDays aria-hidden className='h-3 w-3' />
              {c.fecha}
            </p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <SectionHeader icon={CalendarClock} tint='bg-primary/10 text-primary'>
          Fechas importantes
        </SectionHeader>
        {calendario.map((f, i) => (
          <div
            key={`${f.titulo}-${f.fecha}-${i}`}
            className='rounded-xl border bg-card p-3 shadow-sm'
          >
            <span className='inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary tabular-nums'>
              {f.fecha}
            </span>
            <p className='mt-1 text-sm font-medium'>{f.titulo}</p>
            <p className='text-xs text-muted-foreground'>{f.detalle}</p>
          </div>
        ))}
      </section>

      <section className='flex flex-col gap-2'>
        <SectionHeader
          icon={CircleHelp}
          tint='bg-brand-accent/10 text-brand-accent'
        >
          Preguntas frecuentes
        </SectionHeader>
        {preguntasFrecuentes.map((p) => (
          <details
            key={p.pregunta}
            className='group rounded-xl border bg-card px-3 shadow-sm'
          >
            <summary className='flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden'>
              {p.pregunta}
              <ChevronDown
                aria-hidden
                className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180'
              />
            </summary>
            <p className='pb-3 text-xs text-muted-foreground'>{p.respuesta}</p>
          </details>
        ))}
      </section>
    </div>
  )
}
