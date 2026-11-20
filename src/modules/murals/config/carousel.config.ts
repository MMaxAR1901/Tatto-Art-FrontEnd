import type { SpineColors } from '../model/mural.types'

/** Parámetros del carrusel de murales (archivo VHS). */
export const CAROUSEL_CONFIG = {
  /** Mural seleccionado al cargar (base 0). */
  initialIndex: 4,
  /** Scroll lateral (rueda / trackpad) acumulado para avanzar un mural (px). */
  scrollStepPx: 60,
  /** Pausa tras cada cambio para que la inercia del trackpad no recorra toda la fila. */
  scrollLockMs: 350,
  /** Deslizamiento táctil mínimo para cambiar de mural (px). */
  swipeMinPx: 40,
  /** Distancia del primer lomo al centro (px). */
  firstOffsetPx: 260,
  /** Separación entre lomos consecutivos (px). */
  gapPx: 96,
  /** Reducción de escala por posición. */
  scaleStep: 0.065,
  minScale: 0.5,
  /** Más allá de esta distancia los lomos se ocultan. */
  maxVisibleOffset: 6,
  /** z-index de la portada; los lomos usan `centerZ - 10 - |d|`. */
  centerZ: 60,
} as const

export type CarouselConfig = typeof CAROUSEL_CONFIG

/** Paleta cíclica de lomos. */
export const SPINE_PALETTE: SpineColors[] = [
  { bg: '#B3001B', fg: '#FFFFFF' },
  { bg: '#F1EDE6', fg: '#0A0A0A' },
  { bg: '#1C1C1C', fg: '#F4F1EC' },
  { bg: '#5A0710', fg: '#F4F1EC' },
  { bg: '#2B2B2B', fg: '#FF5A5A' },
  { bg: '#E9E2D6', fg: '#8A0012' },
]
