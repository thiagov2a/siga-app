import { useState } from 'react'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import type { InterventionType } from '@/features/students/data/schema'

const OPCIONES: { valor: InterventionType; titulo: string }[] = [
  { valor: 'tutor_mentor', titulo: 'Hablar con un mentor' },
  { valor: 'ayuda_contenidos', titulo: 'Ayuda con los contenidos' },
  { valor: 'informacion_institucional', titulo: 'Trámites e información' },
]

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  studentId: string
}

export function PedirAyudaSheet({ open, onOpenChange, studentId }: Props) {
  const createTicket = useStudentsStore((s) => s.createTicket)
  const [tipo, setTipo] = useState<InterventionType | null>(null)
  const [notas, setNotas] = useState('')

  function enviar() {
    if (!tipo) return
    createTicket(
      {
        studentId,
        tipoIntervencion: tipo,
        notas,
        estado: 'pendiente',
        origen: 'alumno',
      },
      'sin_asignar'
    )
    setTipo(null)
    setNotas('')
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='bottom' className='gap-4 pb-6'>
        <SheetHeader>
          <SheetTitle>Pedir ayuda</SheetTitle>
          <SheetDescription>
            Contanos qué necesitás. Una persona del equipo te va a contactar.
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-2 px-4'>
          {OPCIONES.map((o) => (
            <Button
              key={o.valor}
              variant={tipo === o.valor ? 'default' : 'outline'}
              onClick={() => setTipo(o.valor)}
            >
              {o.titulo}
            </Button>
          ))}
          <Textarea
            placeholder='Si querés, contanos más (opcional)'
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />
          <Button disabled={!tipo} onClick={enviar}>
            Enviar pedido
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
