import type { Artwork } from '@/shared/model/media.types'

/** Colecciones que puede mostrar el modal de vista previa. */
export type PreviewKind = 'tattoo' | 'mural'

/** Pieza normalizada para el modal (cada módulo convierte sus datos a esta forma). */
export interface PreviewItem {
  id: string
  title: string
  subtitle: string
  art: Artwork
  /** Diseño flash disponible: muestra el badge "Disponible". */
  available?: boolean
  /** Mensaje precargado del CTA de WhatsApp. */
  whatsappMessage: string
}

export interface PreviewCollection {
  /** Etiqueta del tipo en la cabecera del modal ("Tatuaje", "Mural"). */
  label: string
  items: PreviewItem[]
}

export type PreviewCollections = Record<PreviewKind, PreviewCollection>

export interface PreviewSelection {
  kind: PreviewKind
  index: number
}
