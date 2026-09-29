import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/login/mentor')({
  component: LoginMentor,
})

function LoginMentor() {
  const navigate = useNavigate()
  const ingresarComoMentor = useAuthStore((s) => s.ingresarComoMentor)

  const handleIngresar = () => {
    ingresarComoMentor()
    navigate({ to: '/panel' })
  }

  return (
    <div className='mx-auto min-h-svh max-w-md bg-background p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <span className='text-lg font-bold'>SIGA</span>
        <Link to='/' className='text-sm text-muted-foreground'>
          Volver al inicio
        </Link>
      </div>

      <h1 className='mb-4 text-xl font-semibold'>Ingresá como mentor</h1>

      <div className='space-y-2'>
        <button
          onClick={handleIngresar}
          className='flex w-full items-center gap-3 rounded-lg bg-card p-3 text-left shadow-sm'
        >
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground'>
            CA
          </div>
          <div>
            <p className='font-medium'>Coordinador Académico</p>
            <p className='text-sm text-muted-foreground'>
              coordinacion@universidad.edu
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
