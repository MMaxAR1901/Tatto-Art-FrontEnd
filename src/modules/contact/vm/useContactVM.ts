import { buildInstagramUrl, buildTelUrl, buildWhatsAppUrl } from '@/lib/contact-links'
import { CONTACT } from '@/shared/config/contact.config'
import { CONTACT_SECTION } from '../data/contact.data'

/** Contacto: teléfono grande, canales, dirección, horario y CTA único a WhatsApp. */
export function useContactVM() {
  return {
    section: CONTACT_SECTION,
    phone: { href: buildTelUrl(), label: CONTACT.phone.display },
    whatsapp: { href: buildWhatsAppUrl(), label: CONTACT_SECTION.whatsappLabel },
    instagram: { href: buildInstagramUrl(), label: `@${CONTACT.instagram.user}` },
    location: CONTACT.location,
    hours: [`${CONTACT.hours.days} · ${CONTACT.hours.time}`, CONTACT.hours.note],
    quoteUrl: buildWhatsAppUrl(CONTACT.whatsapp.messages.quote),
    responseNote: `Te respondemos en ${CONTACT.whatsapp.responseTime}.`,
  }
}

export type ContactVM = ReturnType<typeof useContactVM>
