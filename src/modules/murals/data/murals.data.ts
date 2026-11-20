import type { Mural, MuralStep } from '../model/mural.types'

/** Marcador del diseño para el nombre del lugar; reemplázalo en el `place` de cada mural. */
const PLACE = '[Nombre del lugar]'

/**
 * Archivo de murales. Para usar una foto real agrega `image` en `art`:
 *   art: { pattern: 'red', image: '/img/murales/fachada.jpg' }
 */
export const MURALS: Mural[] = [
  { id: 'fachada', title: 'Fachada', kind: 'Exterior', place: PLACE, art: { pattern: 'red' } },
  {
    id: 'cafe',
    title: 'Interior de café',
    kind: 'Interior',
    place: PLACE,
    art: { pattern: 'lines' },
  },
  {
    id: 'comunitario',
    title: 'Muro comunitario',
    kind: 'Espacio público',
    place: PLACE,
    art: { pattern: 'rays' },
  },
  { id: 'barberia', title: 'Barbería', kind: 'Negocio', place: PLACE, art: { pattern: 'grid' } },
  {
    id: 'escuela',
    title: 'Escuela',
    kind: 'Espacio público',
    place: PLACE,
    art: { pattern: 'rings' },
  },
  {
    id: 'evento',
    title: 'Evento en vivo',
    kind: 'Live painting',
    place: PLACE,
    art: { pattern: 'red' },
  },
  {
    id: 'restaurante',
    title: 'Restaurante',
    kind: 'Negocio',
    place: PLACE,
    art: { pattern: 'lines' },
  },
  {
    id: 'casa',
    title: 'Casa particular',
    kind: 'Interior',
    place: PLACE,
    art: { pattern: 'rays' },
  },
  { id: 'bodega', title: 'Bodega', kind: 'Exterior', place: PLACE, art: { pattern: 'grid' } },
  { id: 'gimnasio', title: 'Gimnasio', kind: 'Negocio', place: PLACE, art: { pattern: 'rings' } },
  {
    id: 'festival',
    title: 'Festival',
    kind: 'Live painting',
    place: PLACE,
    art: { pattern: 'red' },
  },
  { id: 'hotel', title: 'Hotel', kind: 'Interior', place: PLACE, art: { pattern: 'lines' } },
]

export const MURAL_STEPS: MuralStep[] = [
  {
    title: '1. Visita y medidas',
    description: 'Conocemos el espacio, la luz y lo que quieres comunicar.',
  },
  {
    title: '2. Boceto',
    description: 'Te presentamos la propuesta a color sobre una foto de tu muro.',
  },
  {
    title: '3. Pintura',
    description: 'Pintamos con materiales para exterior o interior según el lugar.',
  },
]

export const MURALS_SECTION = {
  eyebrow: '03 — Murales',
  archiveLabel: 'Archivo de muros',
  categories: 'Fachadas · Interiores · Negocios · Eventos',
  backdropLeft: ['Mu', 'ros'],
  backdropRight: ['que', 'hablan'],
  coverKicker: 'Un mural de TATTO ART',
  coverBadge: 'MURAL',
  spineBadge: 'TA',
  openLabel: 'Ver en grande',
  scrollHint: 'Desliza a los lados para recorrer el archivo',
  quoteLabel: 'Cotiza un mural →',
} as const
