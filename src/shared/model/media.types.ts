/** Patrón de relleno mientras no haya foto real (ver clases `.art-*` en index.css). */
export type ArtPattern = 'lines' | 'rings' | 'red' | 'rays' | 'grid'

/** Imagen de una pieza: `image` es opcional; sin ella se muestra el patrón. */
export interface Artwork {
  pattern: ArtPattern
  /** URL de la foto real (p. ej. `/img/tatuajes/manga.jpg`). */
  image?: string
  /** Texto alternativo; por defecto se usa el título de la pieza. */
  alt?: string
}
