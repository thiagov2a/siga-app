import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/confirm-dialog'

export function ResetDemoButton() {
  const [open, setOpen] = useState(false)
  const reset = useStudentsStore((s) => s.reset)

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        className='ms-auto'
        onClick={() => setOpen(true)}
      >
        <RotateCcw />
        Reiniciar datos de demo
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title='Reiniciar datos de demo'
        desc='Se van a restaurar los estudiantes y tickets de ejemplo. Los cambios que hayas hecho se pierden.'
        confirmText='Reiniciar'
        destructive
        handleConfirm={() => {
          reset()
          setOpen(false)
          toast.success('Datos de demo reiniciados')
        }}
      />
    </>
  )
}
