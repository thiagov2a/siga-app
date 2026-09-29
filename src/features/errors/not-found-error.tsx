import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LogoIcon } from '@/components/brand/logo'

export function NotFoundError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <LogoIcon className='mb-3 h-12 w-12' />
        <h1 className='text-[7rem] leading-tight font-bold'>404</h1>
        <span className='font-medium'>Página no encontrada</span>
        <p className='text-center text-muted-foreground'>
          Parece que la página que buscás <br />
          no existe o fue eliminada.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Volver
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>Ir al inicio</Button>
        </div>
      </div>
    </div>
  )
}
