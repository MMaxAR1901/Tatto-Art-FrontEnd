import { CONTACT } from '@/shared/config/contact.config'
import type { PreviewCollection } from '@/modules/preview'
import type { Mural } from '../model/mural.types'

/** Convierte los murales a la colección que muestra el modal de vista previa. */
export function toMuralPreviewCollection(murals: Mural[]): PreviewCollection {
  return {
    label: 'Mural',
    items: murals.map((m) => ({
      id: `mural-${m.id}`,
      title: m.title,
      subtitle: `${m.place} · ${m.kind}`,
      art: m.art,
      whatsappMessage: `${CONTACT.whatsapp.messages.design}: mural ${m.title}`,
    })),
  }
}
