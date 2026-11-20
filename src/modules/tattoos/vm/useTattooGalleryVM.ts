import { useMemo } from 'react'
import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'
import { previewTriggerId } from '@/modules/preview'
import { tattooPreviewId } from '../data/tattoo-preview'
import { TATTOO_STYLE_LABELS, TATTOOS_SECTION } from '../data/tattoos.data'
import type { Tattoo } from '../model/tattoo.types'

interface TattooGalleryOptions {
  /** Abre la pieza `index` en el modal de vista previa. */
  onOpen: (index: number) => void
}

/** Galería masonry de tatuajes (sin filtros): cada pieza abre el modal de vista previa. */
export function useTattooGalleryVM(tattoos: Tattoo[], { onOpen }: TattooGalleryOptions) {
  const tiles = useMemo(
    () =>
      tattoos.map((tattoo, index) => ({
        tattoo,
        index,
        triggerId: previewTriggerId(tattooPreviewId(tattoo)),
        styleLabel: TATTOO_STYLE_LABELS[tattoo.style],
        openLabel: `Ver ${tattoo.title} en grande`,
      })),
    [tattoos],
  )

  return {
    section: TATTOOS_SECTION,
    tiles,
    open: onOpen,
    quoteHref: anchor(SECTION_IDS.contact),
  }
}

export type TattooGalleryVM = ReturnType<typeof useTattooGalleryVM>
export type TattooTileVM = TattooGalleryVM['tiles'][number]
