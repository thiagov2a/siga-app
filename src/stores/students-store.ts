import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { students as seedStudents } from '@/features/students/data/students'
import type { Student, Ticket, TicketStatus } from '@/features/students/data/schema'

interface StudentsState {
  students: Student[]
  tickets: Ticket[]
  getStudent: (id: string) => Student | undefined
  getTicketsForStudent: (studentId: string) => Ticket[]
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
      tickets: [],
      getStudent: (id) => get().students.find((s) => s.id === id),
      getTicketsForStudent: (studentId) =>
        get()
          .tickets.filter((t) => t.studentId === studentId)
          .sort((a, b) => b.creadoEn.getTime() - a.creadoEn.getTime()),
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
      reset: () => set({ students: seedStudents, tickets: [] }),
    }),
    {
      name: 'alerta-academica-storage',
      partialize: (state) => ({
        students: state.students,
        tickets: state.tickets,
      }),
    }
  )
)
