export interface PasoGuia {
  titulo: string
  texto: string
}

export interface CursoOrientacion {
  nombre: string
  descripcion: string
  fecha: string
}

export interface BecaAsistencia {
  nombre: string
  descripcion: string
  requisitos: string
}

export interface PreguntaFrecuente {
  pregunta: string
  respuesta: string
}

export interface FechaCalendario {
  fecha: string
  titulo: string
  detalle: string
}

export interface ContactoAyuda {
  espacio: string
  email: string
  horario: string
  telefono: string
}

export const primerosPasos: PasoGuia[] = [
  {
    titulo: 'Inscripción a materias',
    texto:
      'Hacé tu inscripción a través del sistema académico dentro de las fechas publicadas en el calendario. Si tenés dudas, acercate a la oficina de alumnos de tu facultad.',
  },
  {
    titulo: 'Credencial de estudiante',
    texto:
      'Tramitá tu credencial en la oficina de alumnos con tu documento de identidad. La vas a necesitar para rendir exámenes y acceder a los espacios de estudio.',
  },
  {
    titulo: 'Plataforma virtual de cursos',
    texto:
      'Todas tus materias tienen un espacio en la plataforma virtual de cursos, donde vas a encontrar materiales, entregas y avisos de tus docentes.',
  },
  {
    titulo: 'Bienestar estudiantil',
    texto:
      'La universidad cuenta con un área de bienestar estudiantil para acompañarte en trámites, becas y situaciones personales que puedan afectar tu cursada.',
  },
]

export const cursos: CursoOrientacion[] = [
  {
    nombre: 'Taller de técnicas de estudio',
    descripcion:
      'Herramientas para organizar tus tiempos de estudio y mejorar la comprensión de textos académicos.',
    fecha: 'Todos los meses, primera semana',
  },
  {
    nombre: 'Introducción a la vida universitaria',
    descripcion:
      'Un espacio para conocer cómo funciona la facultad, sus trámites y sus recursos de apoyo.',
    fecha: 'Marzo y agosto',
  },
  {
    nombre: 'Taller de escritura académica',
    descripcion:
      'Práctica de redacción de trabajos prácticos, informes y monografías.',
    fecha: 'Segunda semana de cada cuatrimestre',
  },
  {
    nombre: 'Orientación vocacional y ocupacional',
    descripcion:
      'Encuentros para quienes están evaluando un cambio de carrera u orientación.',
    fecha: 'A demanda, consultar en bienestar estudiantil',
  },
]

export const becas: BecaAsistencia[] = [
  {
    nombre: 'Beca de transporte',
    descripcion:
      'Ayuda económica para cubrir gastos de traslado hasta la facultad.',
    requisitos: 'Ser alumno regular y completar el formulario socioeconómico.',
  },
  {
    nombre: 'Beca de apuntes y materiales',
    descripcion:
      'Cobertura parcial de gastos en fotocopias, libros y materiales de estudio.',
    requisitos:
      'Ser alumno regular con al menos una materia aprobada en el último año.',
  },
  {
    nombre: 'Asistencia alimentaria',
    descripcion:
      'Acceso a comedor universitario a precio reducido o sin costo según la situación socioeconómica.',
    requisitos:
      'Completar la solicitud en la oficina de bienestar estudiantil.',
  },
]

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: '¿Cómo me inscribo a las materias?',
    respuesta:
      'A través del sistema académico, en las fechas publicadas en el calendario académico de tu facultad.',
  },
  {
    pregunta: '¿Qué hago si pierdo la regularidad de una materia?',
    respuesta:
      'Acercate a la oficina de alumnos para conocer las opciones de recursada o los trámites de reincorporación.',
  },
  {
    pregunta: '¿Dónde encuentro los materiales de mis materias?',
    respuesta:
      'En la plataforma virtual de cursos, dentro del espacio de cada materia.',
  },
  {
    pregunta: '¿Cómo pido ayuda si estoy pasando un momento difícil?',
    respuesta:
      'Podés pedir ayuda desde esta misma app, o acercarte directamente al área de bienestar estudiantil.',
  },
  {
    pregunta: '¿Puedo cambiar de carrera?',
    respuesta:
      'Sí, consultá en la oficina de alumnos los requisitos de equivalencias para tu caso.',
  },
  {
    pregunta: '¿Cómo tramito una beca?',
    respuesta:
      'Completando el formulario correspondiente en la oficina de bienestar estudiantil, dentro de los plazos publicados.',
  },
]

export const calendario: FechaCalendario[] = [
  {
    fecha: 'Marzo',
    titulo: 'Inicio de clases',
    detalle: 'Comienzo del primer cuatrimestre.',
  },
  {
    fecha: 'Abril',
    titulo: 'Cierre de inscripción a materias',
    detalle: 'Última fecha para inscribirse a materias del cuatrimestre.',
  },
  {
    fecha: 'Junio',
    titulo: 'Mesas de exámenes finales',
    detalle: 'Primer turno de exámenes finales del año.',
  },
  {
    fecha: 'Agosto',
    titulo: 'Inicio del segundo cuatrimestre',
    detalle: 'Comienzo de clases del segundo cuatrimestre.',
  },
  {
    fecha: 'Noviembre',
    titulo: 'Fin de clases',
    detalle: 'Cierre de cursada del segundo cuatrimestre.',
  },
  {
    fecha: 'Diciembre',
    titulo: 'Mesas de exámenes finales',
    detalle: 'Segundo turno de exámenes finales del año.',
  },
]

export const dondePedirAyuda: ContactoAyuda[] = [
  {
    espacio: 'Bienestar estudiantil',
    email: 'bienestar@tuuniversidad.edu',
    horario: 'Lunes a viernes, 9 a 17 hs',
    telefono: '011 4000-0000',
  },
  {
    espacio: 'Oficina de alumnos',
    email: 'alumnos@tuuniversidad.edu',
    horario: 'Lunes a viernes, 8 a 16 hs',
    telefono: '011 4000-0001',
  },
  {
    espacio: 'Área de orientación psicopedagógica',
    email: 'orientacion@tuuniversidad.edu',
    horario: 'Martes y jueves, 10 a 15 hs',
    telefono: '011 4000-0002',
  },
]
