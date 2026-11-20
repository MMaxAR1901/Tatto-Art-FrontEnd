import type { Tattoo, TattooStyle } from '../model/tattoo.types'

export const TATTOO_STYLE_LABELS: Record<TattooStyle, string> = {
  bng: 'Black & Grey',
  color: 'Color',
  fine: 'Fine line',
  trad: 'Tradicional',
  flash: 'Diseño disponible',
}

/**
 * Galería de tatuajes (orden = orden en la cuadrícula). Para una foto real agrega `image`:
 *   art: { pattern: 'lines', image: '/img/tatuajes/manga.jpg' }
 */
export const TATTOOS: Tattoo[] = [
  {
    id: 'manga',
    title: 'Manga completa — brazo',
    style: 'bng',
    rows: 2,
    cols: 1,
    art: { pattern: 'lines' },
  },
  {
    id: 'rosa-daga',
    title: 'Rosa y daga',
    style: 'trad',
    rows: 1,
    cols: 1,
    art: { pattern: 'red' },
  },
  {
    id: 'retrato',
    title: 'Retrato realista',
    style: 'bng',
    rows: 2,
    cols: 1,
    art: { pattern: 'rings' },
  },
  {
    id: 'golondrinas',
    title: 'Golondrinas — flash',
    style: 'flash',
    rows: 1,
    cols: 1,
    art: { pattern: 'rays' },
    available: true,
  },
  {
    id: 'botanico',
    title: 'Botánico en espalda',
    style: 'fine',
    rows: 2,
    cols: 2,
    art: { pattern: 'grid' },
  },
  { id: 'koi', title: 'Koi a color', style: 'color', rows: 1, cols: 1, art: { pattern: 'red' } },
  {
    id: 'calavera',
    title: 'Calavera — flash',
    style: 'flash',
    rows: 1,
    cols: 1,
    art: { pattern: 'lines' },
    available: true,
  },
  {
    id: 'lettering',
    title: 'Lettering en clavícula',
    style: 'fine',
    rows: 1,
    cols: 1,
    art: { pattern: 'rings' },
  },
  {
    id: 'pantera',
    title: 'Pantera tradicional',
    style: 'trad',
    rows: 2,
    cols: 1,
    art: { pattern: 'rays' },
  },
  {
    id: 'acuarela',
    title: 'Acuarela abstracta',
    style: 'color',
    rows: 1,
    cols: 1,
    art: { pattern: 'grid' },
  },
  {
    id: 'serpiente',
    title: 'Serpiente — flash',
    style: 'flash',
    rows: 1,
    cols: 1,
    art: { pattern: 'red' },
    available: true,
  },
  {
    id: 'mandala',
    title: 'Mandala en pierna',
    style: 'bng',
    rows: 1,
    cols: 1,
    art: { pattern: 'rings' },
  },
]

export const TATTOOS_SECTION = {
  eyebrow: '01 — Galería',
  title: 'Tatuajes',
  titleAccent: '& diseños',
  intro: 'Toca cualquier pieza para verla en grande. Los diseños marcados como',
  introStrong: 'Disponible',
  introEnd: 'son flash listos para tatuar: se tatúan una sola vez.',
  ctaText: '¿Tienes una idea? Mándanos referencias, zona del cuerpo y tamaño aproximado.',
  ctaLabel: 'Pedir cotización',
} as const
