import type { RiskLevel, Student } from '../data/schema'

type Variable = {
  peso: number
  riesgo0: number
  riesgo100: number
  valor: (s: Student) => number
  texto: (s: Student) => string
}

const SCORE_CONFIG = {
  asistencia: {
    peso: 18,
    riesgo0: 85,
    riesgo100: 50,
    valor: (s) => s.asistencia,
    texto: (s) => `Asistencia: ${s.asistencia}%`,
  },
  desaprobadas: {
    peso: 11,
    riesgo0: 0,
    riesgo100: 0.3,
    valor: (s) => s.materiasDesaprobadas / s.materiasCursadas,
    texto: (s) =>
      `Materias desaprobadas: ${s.materiasDesaprobadas} de ${s.materiasCursadas}`,
  },
  promedio: {
    peso: 11,
    riesgo0: 4.0,
    riesgo100: 2.5,
    valor: (s) => s.promedio,
    texto: (s) => `Promedio: ${s.promedio}`,
  },
  ultimoAccesoDias: {
    peso: 11,
    riesgo0: 2,
    riesgo100: 14,
    valor: (s) => s.ultimoAccesoCampusDias,
    texto: (s) => `Último acceso: hace ${s.ultimoAccesoCampusDias} días`,
  },
  entregasPendientes: {
    peso: 11,
    riesgo0: 0,
    riesgo100: 5,
    valor: (s) => s.entregasPendientes,
    texto: (s) => `Entregas pendientes: ${s.entregasPendientes}`,
  },
  diasActivos: {
    peso: 8,
    riesgo0: 10,
    riesgo100: 0,
    valor: (s) => s.actividadUltimos14Dias.filter(Boolean).length,
    texto: (s) =>
      `Días activos: ${s.actividadUltimos14Dias.filter(Boolean).length} de 14`,
  },
  consultasDocente: {
    peso: 3,
    riesgo0: 3,
    riesgo100: 0,
    valor: (s) => s.consultasDocente,
    texto: (s) => `Consultas a docentes: ${s.consultasDocente}`,
  },
  organizacion: {
    peso: 7,
    riesgo0: 5,
    riesgo100: 1,
    valor: (s) => s.autopercepcion.organizacion,
    texto: (s) => `Organización: ${s.autopercepcion.organizacion}/5`,
  },
  acompaniamiento: {
    peso: 7,
    riesgo0: 5,
    riesgo100: 1,
    valor: (s) => s.autopercepcion.acompaniamiento,
    texto: (s) => `Acompañamiento: ${s.autopercepcion.acompaniamiento}/5`,
  },
  comprensionContenidos: {
    peso: 7,
    riesgo0: 5,
    riesgo100: 1,
    valor: (s) => s.autopercepcion.comprensionContenidos,
    texto: (s) =>
      `Comprensión de contenidos: ${s.autopercepcion.comprensionContenidos}/5`,
  },
  sabeDondePedirAyuda: {
    peso: 6,
    riesgo0: 5,
    riesgo100: 1,
    valor: (s) => s.autopercepcion.sabeDondePedirAyuda,
    texto: (s) => `Sabe dónde pedir ayuda: ${s.autopercepcion.sabeDondePedirAyuda}/5`,
  },
} satisfies Record<string, Variable>

type Score = {
  valor: number
  nivel: RiskLevel
  factores: string[]
}

function riesgoLineal(
  valor: number,
  riesgo0: number,
  riesgo100: number
): number {
  const riesgo = ((valor - riesgo0) / (riesgo100 - riesgo0)) * 100
  return Math.min(100, Math.max(0, riesgo))
}

export function calcularScore(student: Student): Score {
  const contribuciones = Object.values(SCORE_CONFIG).map((variable) => ({
    texto: variable.texto(student),
    contribucion:
      (riesgoLineal(variable.valor(student), variable.riesgo0, variable.riesgo100) *
        variable.peso) /
      100,
  }))

  const suma = contribuciones.reduce((acc, c) => acc + c.contribucion, 0)
  const valor = Math.round(suma * 10) / 10

  const nivel: RiskLevel =
    valor >= 50 ? 'alto' : valor >= 20 ? 'medio' : 'bajo'

  const factores = contribuciones
    .filter((c) => c.contribucion > 0)
    .sort((a, b) => b.contribucion - a.contribucion)
    .slice(0, 3)
    .map((c) => c.texto)

  return { valor, nivel, factores }
}
