import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Student,
  Ticket,
  TicketStatus,
} from '@/features/students/data/schema'
import { students as seedStudents } from '@/features/students/data/students'
import { tickets as seedTickets } from '@/features/students/data/tickets'

interface StudentsState {
  students: Student[]
  tickets: Ticket[]
  getStudent: (id: string) => Student | undefined
  createTicket: (
    ticket: Omit<Ticket, 'id' | 'creadoEn'>,
    newTicketStatus?: TicketStatus
  ) => void
  updateTicket: (id: string, patch: Partial<Ticket>) => void
  setStudentTicketStatus: (studentId: string, estado: TicketStatus) => void
  reset: () => void
}

export const useStudentsStore = create<StudentsState>()(
  persist(
    (set, get) => ({
      students: seedStudents,
      tickets: seedTickets,
      getStudent: (id) => get().students.find((s) => s.id === id),
      createTicket: (ticket, newTicketStatus = 'en_seguimiento') => {
        const newTicket: Ticket = {
          ...ticket,
          id: crypto.randomUUID(),
          creadoEn: new Date(),
        }
        set((state) => ({
          tickets: [...state.tickets, newTicket],
          students: state.students.map((s) =>
            s.id === ticket.studentId
              ? { ...s, estadoTicket: newTicketStatus }
              : s
          ),
        }))
      },
      updateTicket: (id, patch) => {
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === id ? { ...t, ...patch } : t
          ),
        }))
      },
      setStudentTicketStatus: (studentId, estado) => {
        set((state) => ({
          students: state.students.map((s) =>
            s.id === studentId ? { ...s, estadoTicket: estado } : s
          ),
        }))
      },
      reset: () => set({ students: seedStudents, tickets: seedTickets }),
    }),
    {
      name: 'alerta-academica-storage',
      partialize: (state) => ({
        students: state.students,
        tickets: state.tickets,
      }),
      merge: (persisted, current) => {
        const state = persisted as Partial<StudentsState>
        return {
          ...current,
          ...state,
          students: state.students ?? current.students,
          tickets: (state.tickets ?? current.tickets).map((t) => ({
            ...t,
            creadoEn: new Date(t.creadoEn),
          })),
        }
      },
    }
  )
)
