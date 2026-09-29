import { useState } from 'react'
import { toast } from 'sonner'
import { useStudentsStore } from '@/stores/students-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  interventionStates,
  interventionTypes,
  resultadosIntervencion,
} from '../data/data'
import type {
  InterventionState,
  InterventionType,
  Student,
} from '../data/schema'

type Props = {
  student: Student
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTicketSheet({ student, open, onOpenChange }: Props) {
  const createTicket = useStudentsStore((s) => s.createTicket)

  const [tipo, setTipo] = useState<InterventionType>('tutor_mentor')
  const [notas, setNotas] = useState('')
  const [estado, setEstado] = useState<InterventionState>('pendiente')
  const [resultado, setResultado] = useState('')

  const cerradoSinResultado = estado === 'cerrado' && !resultado

  const handleSubmit = () => {
    if (!notas.trim()) {
      toast.error(
        'Agregá una nota o diagnóstico inicial antes de crear el ticket.'
      )
      return
    }
    if (cerradoSinResultado) {
      toast.error('Elegí un resultado antes de cerrar la intervención.')
      return
    }

    createTicket({
      studentId: student.id,
      tipoIntervencion: tipo,
      notas,
      estado,
      resultado: estado === 'cerrado' ? resultado : undefined,
      origen: 'mentor',
    })

    toast.success(`Ticket creado para ${student.nombre}`)
    setNotas('')
    setResultado('')
    setEstado('pendiente')
    setTipo('tutor_mentor')
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-0 sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>Crear nuevo ticket de seguimiento</SheetTitle>
          <SheetDescription>
            Estudiante: {student.nombre} (ID {student.legajo})
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 space-y-5 overflow-y-auto px-4'>
          <div className='space-y-2'>
            <Label>Tipo de intervención propuesta</Label>
            <Select
              value={tipo}
              onValueChange={(v) => setTipo(v as InterventionType)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interventionTypes.map((it) => (
                  <SelectItem key={it.value} value={it.value}>
                    {it.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Notas de mentoría / Diagnóstico inicial</Label>
            <Textarea
              rows={5}
              placeholder='Describí la situación y las acciones acordadas...'
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Estado de intervención</Label>
            <Select
              value={estado}
              onValueChange={(v) => setEstado(v as InterventionState)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interventionStates.map((is) => (
                  <SelectItem key={is.value} value={is.value}>
                    {is.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label>Resultado</Label>
            <Select
              value={resultado}
              onValueChange={setResultado}
              disabled={estado !== 'cerrado'}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={
                    estado === 'cerrado'
                      ? 'Elegí un resultado...'
                      : 'Se habilita al cerrar la intervención'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {resultadosIntervencion.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {cerradoSinResultado && (
              <p className='text-xs text-destructive'>
                Un ticket cerrado necesita un resultado.
              </p>
            )}
          </div>
        </div>

        <SheetFooter className='gap-2 sm:space-x-0'>
          <Button onClick={handleSubmit} disabled={cerradoSinResultado}>
            Crear ticket
          </Button>
          <SheetClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
