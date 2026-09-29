import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { LogoIcon } from '@/components/brand/logo'

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
        <span className='flex items-center gap-2'>
          <LogoIcon className='h-8 w-8' />
          <span className='text-lg font-bold'>SIGA</span>
        </span>
        <Link to='/' className='text-sm text-muted-foreground'>
          Volver al inicio
        </Link>
      </div>

      <h1 className='mb-4 text-2xl font-bold'>Ingresá como mentor</h1>

      <div className='space-y-2'>
        <button
          onClick={handleIngresar}
          className='flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left shadow-sm transition-colors hover:border-primary/40'
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
