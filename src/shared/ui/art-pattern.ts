import type { ArtPattern } from '@/shared/model/media.types'

/** Clase CSS (`index.css`) de cada patrón de marcador de imagen. */
const PATTERN_CLASS: Record<ArtPattern, string> = {
  lines: 'art-lines',
  rings: 'art-rings',
  red: 'art-red',
  rays: 'art-rays',
  grid: 'art-grid',
}

export function artPatternClass(pattern: ArtPattern) {
  return PATTERN_CLASS[pattern]
}
