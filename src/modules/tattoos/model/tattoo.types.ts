import type { Artwork } from '@/shared/model/media.types'

export type TattooStyle = 'bng' | 'color' | 'fine' | 'trad' | 'flash'

export interface Tattoo {
  id: string
  title: string
  style: TattooStyle
  /** Filas que ocupa en la cuadrícula masonry (1 o 2). */
  rows: 1 | 2
  /** Columnas que ocupa desde tablet (1 o 2). En teléfono siempre 1. */
  cols: 1 | 2
  art: Artwork
  /** Diseño flash listo para tatuar (se tatúa una sola vez). */
  available?: boolean
}
