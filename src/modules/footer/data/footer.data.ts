import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'

export const FOOTER_LINKS = [
  { label: 'Tatuajes', href: anchor(SECTION_IDS.tattoos) },
  { label: 'Piercings', href: anchor(SECTION_IDS.piercings) },
  { label: 'Murales', href: anchor(SECTION_IDS.murals) },
  { label: 'Contacto', href: anchor(SECTION_IDS.contact) },
]
