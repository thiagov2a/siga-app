import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
} from '@tanstack/react-router'
import { Home, Ticket, HeartHandshake, BookOpen } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/alumno')({
  beforeLoad: () => {
    const { rol } = useAuthStore.getState()
    if (rol !== 'alumno') {
      throw new Error('redirect')
    }
  },
  onError: () => {
    window.location.href = '/login/alumno'
  },
  component: AlumnoLayout,
})

const tabs = [
  { to: '/alumno', label: 'Inicio', icon: Home },
  { to: '/alumno/tickets', label: 'Mis tickets', icon: Ticket },
  { to: '/alumno/situacion', label: 'Mi situación', icon: HeartHandshake },
  { to: '/alumno/recursos', label: 'Recursos', icon: BookOpen },
]

function AlumnoLayout() {
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.userId)
  const cerrarSesion = useAuthStore((s) => s.cerrarSesion)

  const handleSignOut = () => {
    cerrarSesion()
    navigate({ to: '/' })
  }

  return (
    <div className='mx-auto flex min-h-svh max-w-[390px] flex-col bg-[#f4f5fa]'>
      <header className='flex h-14 shrink-0 items-center justify-between border-b bg-card px-4'>
        <span className='font-bold'>SIGA</span>
        <button
          onClick={handleSignOut}
          className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground'
        >
          {userId ?? '?'}
        </button>
      </header>

      <main className='flex-1 overflow-y-auto p-4 pb-20'>
        <Outlet />
      </main>

      <nav className='fixed bottom-0 flex w-full max-w-[390px] border-t bg-card'>
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className='flex flex-1 flex-col items-center gap-1 py-2 text-xs text-muted-foreground [&.active]:text-primary'
            activeOptions={{ exact: tab.to === '/alumno' }}
          >
            <tab.icon className='h-5 w-5' />
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
