import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ResetDemoButton } from '@/features/students/components/reset-demo-button'

export const Route = createFileRoute('/panel')({
  beforeLoad: () => {
    const { rol } = useAuthStore.getState()
    if (rol !== 'mentor') {
      throw redirect({ to: '/login/mentor' })
    }
  },
  component: PanelLayout,
})

function PanelLayout() {
  return (
    <AuthenticatedLayout>
      <Header>
        <ResetDemoButton />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </AuthenticatedLayout>
  )
}
