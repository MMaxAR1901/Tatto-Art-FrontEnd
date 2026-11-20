import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'
import type { NavLink } from '../model/nav.types'

export const MAIN_NAV: NavLink[] = [
  { label: 'Tatuajes', href: anchor(SECTION_IDS.tattoos) },
  { label: 'Piercings', href: anchor(SECTION_IDS.piercings) },
  { label: 'Murales', href: anchor(SECTION_IDS.murals) },
  { label: 'Historia', href: anchor(SECTION_IDS.history) },
]

export const NAV_CTA: NavLink = { label: 'Cotizar', href: anchor(SECTION_IDS.contact) }
