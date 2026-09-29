import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Student, Ticket } from '@/features/students/data/schema'
import { students as seedStudents } from '@/features/students/data/students'
import { tickets as seedTickets } from '@/features/students/data/tickets'

interface StudentsState {
  students: Student[]
  tickets: Ticket[]
  getStudent: (id: string) => Student | undefined
  createTicket: (ticket: Omit<Ticket, 'id' | 'creadoEn'>) => void
  updateTicket: (id: string, patch: Partial<Ticket>) => void
  reset: () => void
}

export const useStudentsStore = create<StudentsState>()(
  persist(
    (set, get) => ({
      students: seedStudents,
      tickets: seedTickets,
      getStudent: (id) => get().students.find((s) => s.id === id),
      createTicket: (ticket) => {
        const newTicket: Ticket = {
          ...ticket,
          id: crypto.randomUUID(),
          creadoEn: new Date(),
        }
        set((state) => ({
          tickets: [...state.tickets, newTicket],
        }))
      },
      updateTicket: (id, patch) => {
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === id ? { ...t, ...patch } : t
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
