import { CONTACT } from '@/shared/config/contact.config'

/** Arma un enlace `wa.me` con mensaje precargado (opcional). */
export function buildWhatsAppUrl(message?: string, number: string = CONTACT.whatsapp.number) {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildTelUrl(phone: string = CONTACT.phone.e164) {
  return `tel:${phone}`
}

export function buildInstagramUrl(user: string = CONTACT.instagram.user) {
  return `https://instagram.com/${user}`
}
