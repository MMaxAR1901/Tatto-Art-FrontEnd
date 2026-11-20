import type { PiercingZone } from '../model/piercing.types'

const PRICE = '[PRECIO]'

export const PIERCING_ZONES: PiercingZone[] = [
  {
    id: 'lobulo',
    name: 'Lóbulo',
    description: 'Clásico, rápido y de cicatrización sencilla.',
    price: PRICE,
  },
  { id: 'helix', name: 'Hélix', description: 'Cartílago superior de la oreja.', price: PRICE },
  {
    id: 'tragus',
    name: 'Tragus',
    description: 'Pequeño cartílago frente al canal auditivo.',
    price: PRICE,
  },
  {
    id: 'septum',
    name: 'Septum',
    description: 'Tabique nasal, discreto o protagonista.',
    price: PRICE,
  },
  {
    id: 'nostril',
    name: 'Nostril',
    description: 'Aleta de la nariz, con arete o stud.',
    price: PRICE,
  },
  {
    id: 'ceja',
    name: 'Ceja',
    description: 'Perforación superficial en el arco de la ceja.',
    price: PRICE,
  },
  {
    id: 'lengua',
    name: 'Lengua',
    description: 'Barra recta, con indicaciones de cuidado especiales.',
    price: PRICE,
  },
  { id: 'ombligo', name: 'Ombligo', description: 'Borde superior del ombligo.', price: PRICE },
]

export const PIERCINGS_SECTION = {
  eyebrow: '02 — Perforaciones',
  titleLines: ['Pier', 'cings'],
  intro: 'Cada perforación incluye joyería inicial, limpieza guiada y revisión de seguimiento.',
  perks: [
    'Material estéril y de un solo uso',
    'Joyería de [MATERIAL]',
    'Menores solo con tutor e identificación',
    'Cambio de joyería sin costo en [PERIODO]',
  ],
}
