import type { Artwork } from '@/shared/model/media.types'

export interface Mural {
  id: string
  title: string
  /** Tipo de espacio: Exterior, Interior, Negocio… */
  kind: string
  /** Nombre del lugar o cliente. */
  place: string
  art: Artwork
}

/** Colores del lomo de cinta (VHS) de cada mural. */
export interface SpineColors {
  bg: string
  fg: string
}

/** Paso del proceso de trabajo de un mural. */
export interface MuralStep {
  title: string
  description: string
}

/** Posición calculada de un lomo dentro del carrusel 3D. */
export interface SpineLayout {
  /** Distancia firmada al centro (0 = portada seleccionada). */
  offset: number
  isCenter: boolean
  /** Desplazamiento horizontal en px desde el centro. */
  x: number
  scale: number
  zIndex: number
  hidden: boolean
}
