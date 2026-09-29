import { Logo } from '@/components/brand/logo'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8'>
        <div className='mb-2 flex flex-col items-center justify-center gap-2'>
          <h1 className='sr-only'>SIGA</h1>
          <div className='flex justify-center'>
            <Logo variant='color' className='h-48 w-auto sm:h-60 dark:hidden' />
            <Logo
              variant='white'
              className='hidden h-48 w-auto sm:h-60 dark:block'
              alt=''
              aria-hidden
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
