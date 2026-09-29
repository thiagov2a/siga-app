import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: ['src/components/ui/**'],
  // react-hook-form se consume en src/components/ui/form.tsx y
  // @hookform/resolvers lo acompaña en ese mismo árbol de formularios; ambos
  // viven bajo ui/**, excluido del análisis con `ignore` (zona protegida del
  // MVP), por lo que knip no registra sus importaciones.
  ignoreDependencies: ['react-hook-form', '@hookform/resolvers'],
  // Zona protegida del MVP (features/students): `ticketStatuses` es un
  // catálogo de estados todavía sin consumir en la UI. No se elimina sin
  // aprobación explícita; se silencia únicamente el issue de exports de
  // este archivo (no el resto de tipos de issue).
  // features/public/data/guia.ts define tipos de dominio documentados en la
  // guía pública (zona protegida de Hoja 1), también sin consumidores en UI.
  ignoreIssues: {
    'src/features/students/data/data.ts': ['exports'],
    'src/features/public/data/guia.ts': ['types'],
  },
}

export default config