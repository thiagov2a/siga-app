import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['src/components/ui/**'],
  // Zona protegida del MVP (features/students): `ticketStatuses` es un
  // catálogo de estados todavía sin consumir en la UI. No se elimina sin
  // aprobación explícita; se silencia únicamente el issue de exports de
  // este archivo (no el resto de tipos de issue).
  ignoreIssues: {
    'src/features/students/data/data.ts': ['exports'],
  },
}

export default config