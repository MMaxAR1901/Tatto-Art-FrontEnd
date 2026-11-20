import { CAROUSEL_CONFIG, SPINE_PALETTE, type CarouselConfig } from '../config/carousel.config'
import type { SpineColors, SpineLayout } from '../model/mural.types'

/**
 * Posición de un lomo según su distancia firmada `offset` a la portada:
 *   x = sign·(260 + (|d| − 1)·96) px · escala = 1 − |d|·0.065 · oculto si |d| > 6.
 */
export function computeSpineLayout(
  offset: number,
  config: CarouselConfig = CAROUSEL_CONFIG,
): SpineLayout {
  const distance = Math.abs(offset)
  if (distance === 0) {
    return { offset: 0, isCenter: true, x: 0, scale: 1, zIndex: config.centerZ, hidden: false }
  }
  return {
    offset,
    isCenter: false,
    x: Math.sign(offset) * (config.firstOffsetPx + (distance - 1) * config.gapPx),
    scale: Math.max(config.minScale, 1 - distance * config.scaleStep),
    zIndex: config.centerZ - 10 - distance,
    hidden: distance > config.maxVisibleOffset,
  }
}

export function spineColors(index: number): SpineColors {
  return SPINE_PALETTE[index % SPINE_PALETTE.length]
}
