import { useCallback, useMemo } from 'react'
import { useContactVM } from '@/modules/contact'
import { useFooterVM } from '@/modules/footer'
import { useHeroVM } from '@/modules/hero'
import { useHistoryVM } from '@/modules/history'
import { BRAND_MARQUEE, SERVICE_MARQUEE, useMarqueeVM } from '@/modules/marquee'
import { MURALS, toMuralPreviewCollection, useMuralCarouselVM } from '@/modules/murals'
import { useNavBarVM } from '@/modules/nav'
import { usePiercingsVM } from '@/modules/piercings'
import {
  usePreviewModalVM,
  type PreviewCollections,
  type PreviewSelection,
} from '@/modules/preview'
import { useServicesVM } from '@/modules/services'
import { TATTOOS, toTattooPreviewCollection, useTattooGalleryVM } from '@/modules/tattoos'

/**
 * ViewModel de la página: compone el VM de cada sección y conecta la galería y el carrusel de
 * murales con el modal de vista previa compartido. Al navegar murales dentro del modal, el
 * carrusel se mueve a la misma pieza.
 */
export function useHomeVM() {
  const collections = useMemo<PreviewCollections>(
    () => ({
      tattoo: toTattooPreviewCollection(TATTOOS),
      mural: toMuralPreviewCollection(MURALS),
    }),
    [],
  )

  // Dependencia circular (el carrusel abre el modal y el modal mueve el carrusel): el carrusel
  // se crea primero y llama al modal en diferido, cuando el usuario hace clic.
  const muralCarousel = useMuralCarouselVM(MURALS, {
    onOpen: (index) => openPreview('mural', index),
  })
  const { select: selectMural } = muralCarousel

  const syncCarousel = useCallback(
    ({ kind, index }: PreviewSelection) => {
      if (kind === 'mural') selectMural(index)
    },
    [selectMural],
  )

  const preview = usePreviewModalVM(collections, { onNavigate: syncCarousel })
  const { open: openPreview } = preview
  const openTattoo = useCallback((index: number) => openPreview('tattoo', index), [openPreview])

  return {
    nav: useNavBarVM(),
    hero: useHeroVM(),
    serviceMarquee: useMarqueeVM(SERVICE_MARQUEE),
    services: useServicesVM(),
    tattoos: useTattooGalleryVM(TATTOOS, { onOpen: openTattoo }),
    piercings: usePiercingsVM(),
    murals: muralCarousel,
    history: useHistoryVM(),
    brandMarquee: useMarqueeVM(BRAND_MARQUEE),
    contact: useContactVM(),
    footer: useFooterVM(),
    preview,
  }
}

export type HomeVM = ReturnType<typeof useHomeVM>
