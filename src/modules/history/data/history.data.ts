import type { HistoryContent } from '../model/history.types'

export const HISTORY: HistoryContent = {
  eyebrow: 'Nuestra historia',
  title: 'De una silla a',
  titleAccent: 'tres oficios.',
  paragraphs: [
    'TATTO ART nació en [AÑO] en [BARRIO / CIUDAD], cuando [NOMBRE DEL FUNDADOR] abrió un pequeño estudio con una sola silla y muchas ganas de dibujar. Con los años, el estudio creció hacia las perforaciones y salió a la calle a pintar muros.',
    '[Cuenta aquí lo que hace único al estudio: tu filosofía, tu estilo, tu comunidad.]',
  ],
  quote: '[Frase del fundador o lema del estudio.]',
  timeline: [
    {
      year: '[AÑO]',
      title: 'Abrimos la primera silla',
      description: '[Dónde y cómo empezó el estudio.]',
    },
    { year: '[AÑO]', title: 'Primer mural', description: '[El proyecto que nos sacó a la calle.]' },
    {
      year: '[AÑO]',
      title: 'Llegan los piercings',
      description: '[Quién se sumó al equipo y por qué.]',
    },
    {
      year: 'Hoy',
      title: 'Tres oficios, una casa',
      description: '[Cuántos artistas, qué estilos, qué sigue.]',
    },
  ],
}
