import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { students } from '@/features/students/data/students'

export const Route = createFileRoute('/login/alumno')({
  component: LoginAlumno,
})

function iniciales(nombre: string) {
  const partes = nombre.split(' ')
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase()
}

function LoginAlumno() {
  const navigate = useNavigate()
  const ingresarComoAlumno = useAuthStore((s) => s.ingresarComoAlumno)

  const handleSelect = (id: string) => {
    ingresarComoAlumno(id)
    navigate({ to: '/alumno' })
  }

  return (
    <div className='mx-auto min-h-svh max-w-md bg-background p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <span className='text-lg font-bold'>SIGA</span>
        <Link to='/' className='text-sm text-muted-foreground'>
          Volver al inicio
        </Link>
      </div>

      <h1 className='mb-4 text-xl font-semibold'>Ingresá como alumno</h1>

      <div className='space-y-2'>
        {students.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            className='flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-sm'
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground'>
              {iniciales(s.nombre)}
            </div>
            <div>
              <p className='font-medium'>{s.nombre}</p>
              <p className='text-sm text-muted-foreground'>{s.carrera}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
