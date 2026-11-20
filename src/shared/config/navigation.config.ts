/** Ids de las secciones de la página (anclas del menú, footer y CTAs). */
export const SECTION_IDS = {
  home: 'inicio',
  tattoos: 'tatuajes',
  piercings: 'piercings',
  murals: 'murales',
  history: 'historia',
  contact: 'contacto',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const anchor = (id: SectionId) => `#${id}`
