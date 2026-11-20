import { CONTACT } from '@/shared/config/contact.config'
import type { PreviewCollection } from '@/modules/preview'
import type { Tattoo } from '../model/tattoo.types'
import { TATTOO_STYLE_LABELS } from './tattoos.data'

/** Id de la pieza en el modal (también id del control que la abre). */
export const tattooPreviewId = (tattoo: Tattoo) => `tattoo-${tattoo.id}`

/** Convierte la galería a la colección que muestra el modal de vista previa. */
export function toTattooPreviewCollection(tattoos: Tattoo[]): PreviewCollection {
  return {
    label: 'Tatuaje',
    items: tattoos.map((t) => ({
      id: tattooPreviewId(t),
      title: t.title,
      subtitle: TATTOO_STYLE_LABELS[t.style],
      art: t.art,
      available: t.available,
      whatsappMessage: `${CONTACT.whatsapp.messages.design}: ${t.title}`,
    })),
  }
}
