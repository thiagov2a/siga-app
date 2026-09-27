import { GraduationCap } from 'lucide-react'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8'>
        <div className='mb-2 flex flex-col items-center justify-center gap-2'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
            <GraduationCap className='h-6 w-6' />
          </div>
          <h1 className='text-xl font-bold'>SIGA</h1>
          <p className='text-sm text-muted-foreground'>
            Detección temprana de deserción académica
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
