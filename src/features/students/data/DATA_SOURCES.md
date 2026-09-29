# Fuentes de datos de SIGA

Este documento resume el origen de cada grupo de campos del modelo de datos
según la arquitectura del Hackatón Universitario 2026 y el estado real del MVP.

## Estado actual del MVP

- Todo vive en el cliente: el store de Zustand (`src/stores/students-store`)
  se siembra con datos demo (`src/features/students/data/students.ts`).
- No hay job de sincronización ni Postgres: las secciones siguientes describen
  la arquitectura de producción prevista; en el MVP los campos se mockean.
- El botón **Reiniciar datos de demo** (header del panel) restaura el seed
  inicial.

## 1. SIU Guaraní — solo lectura

Integración unidireccional desde el sistema académico de la UNGS.

Campos que provienen de SIU:

- `legajo`
- `nombre`
- `carrera`
- `semestre`
- `materiasCursadas`
- `materiasAprobadas`
- `materiasDesaprobadas`
- `promedio` (escala 0-10, equivalente al régimen de la UNGS)

## 2. Moodle — API REST nativa (Moodle Web Services)

Participación y actividad del estudiante en el campus virtual.

Campos que provienen de Moodle:

- `ultimoAccesoCampusDias`
- `entregasPendientes`
- `actividadUltimos14Dias` (arreglo de 14 booleanos)

Campos que hoy se mockean y podrían enriquecerse con Moodle o con una encuesta:

- `consultasDocente`
- `asistencia` (cruce futuro con registros de SIU + Moodle)

## 3. Encuesta propia de SIGA

Autopercepción del estudiante, respondida periódicamente dentro de la
plataforma.

Campos:

- `autopercepcion.organizacion` (1-5)
- `autopercepcion.acompaniamiento` (1-5)
- `autopercepcion.comprensionContenidos` (1-5)
- `autopercepcion.sabeDondePedirAyuda` (1-5)
- `autopercepcion.necesidadPrincipal`
- `autopercepcion.comentario`

Además, en el MVP se mockean campos demográficos que en producción vendrían de
la encuesta o de SIU:

- `edad`
- `horasTrabajoSemana`
- `modalidad`

## 4. Cálculo de riesgo

En el MVP el score se calcula en el cliente con `lib/score.ts`
(`calcularScore`) a partir de 11 variables ponderadas que suman 100:

- asistencia (18), materias desaprobadas (11), promedio (11), último acceso
  (11), entregas pendientes (11), días activos de los últimos 14 (8),
  consultas a docentes (3), y las 4 variables de autopercepción (7 / 7 / 7 / 6)

Cada variable se mapea linealmente de riesgo 0 a 100 según sus umbrales y
contribuye con su peso. Resultado:

- `score.valor` (0-100, un decimal)
- `score.nivel`: `alto` si ≥ 50, `medio` si ≥ 20, `bajo` si < 20
- `score.factores`: los 3 aportes más altos, como texto (los muestran el panel,
  el detalle del estudiante y el inicio del alumno)

En producción, este cálculo correría en el job de sincronización y el
resultado se persistiría en la base propia de SIGA.

## 5. Tickets (datos generados por SIGA)

Creados por mentores/coordinadores o por el alumno desde la plataforma:

- `Ticket.id`
- `Ticket.studentId`
- `Ticket.origen` (`alumno` | `mentor`)
- `Ticket.tipoIntervencion` (`tutor_mentor` | `ayuda_contenidos` |
  `informacion_institucional`)
- `Ticket.estado` (`pendiente` | `en_curso` | `cerrado`)
- `Ticket.notas`
- `Ticket.resultado` (opcional)
- `Ticket.creadoEn`

Estado derivado por alumno (`lib/ticket-estado.ts`, nunca se persiste):

- sin tickets → "Sin asignar"
- algún ticket `pendiente` o `en_curso` → "En curso"
- todos `cerrado` → "Cerrado"

Nota: `ticketStatusSchema` (`sin_asignar` | `en_seguimiento` | `resuelto`)
sigue definido en `schema.ts`/`data.ts` pero no lo usa ninguna vista; es
residuo de una iteración anterior.

## Notas para el pitch

- El frontend nunca consulta SIU ni Moodle en caliente: en producción leería
  la base propia de SIGA (alimentada por el job de sincronización); en el MVP
  lee el store local con datos demo.
- Los campos marcados como mocks en las secciones 2 y 3 se reemplazarán por
  datos reales una vez integradas las APIs correspondientes.
