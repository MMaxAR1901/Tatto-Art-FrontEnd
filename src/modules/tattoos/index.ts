/** API pública del módulo tattoos. */
export * from './model/tattoo.types'
export { TATTOOS, TATTOO_STYLE_LABELS } from './data/tattoos.data'
export { toTattooPreviewCollection } from './data/tattoo-preview'
export { useTattooGalleryVM, type TattooGalleryVM } from './vm/useTattooGalleryVM'
export { TattooGallerySection } from './view/TattooGallerySection'
