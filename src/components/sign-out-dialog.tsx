import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const { cerrarSesion } = useAuthStore()

  const handleSignOut = () => {
    cerrarSesion()
    navigate({ to: '/', replace: true })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Cerrar sesión'
      desc='¿Seguro que querés cerrar la sesión? Vas a tener que volver a iniciarla para entrar a tu cuenta.'
      confirmText='Cerrar sesión'
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
