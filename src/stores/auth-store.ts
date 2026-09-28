import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Rol = 'alumno' | 'mentor'

interface AuthState {
  rol: Rol | null
  userId: string | null
  ingresarComoAlumno: (userId: string) => void
  ingresarComoMentor: () => void
  cerrarSesion: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      rol: null,
      userId: null,
      ingresarComoAlumno: (userId) => set({ rol: 'alumno', userId }),
      ingresarComoMentor: () => set({ rol: 'mentor', userId: 'coordinador' }),
      cerrarSesion: () => set({ rol: null, userId: null }),
    }),
    {
      name: 'siga-auth',
      partialize: (state) => ({ rol: state.rol, userId: state.userId }),
    }
  )
)
