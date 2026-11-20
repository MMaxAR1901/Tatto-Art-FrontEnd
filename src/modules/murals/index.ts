/** API pública del módulo murals. */
export * from './model/mural.types'
export { CAROUSEL_CONFIG } from './config/carousel.config'
export { computeSpineLayout } from './data/carousel-layout'
export { MURALS, MURAL_STEPS } from './data/murals.data'
export { toMuralPreviewCollection } from './data/mural-preview'
export { useMuralCarouselVM, type MuralCarouselVM } from './vm/useMuralCarouselVM'
export { MuralsSection } from './view/MuralsSection'
