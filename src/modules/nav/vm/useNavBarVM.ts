import { CONTACT } from '@/shared/config/contact.config'
import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'
import { MAIN_NAV, NAV_CTA } from '../data/nav.data'

/** Barra de navegación fija: marca, enlaces de sección y CTA de cotización. */
export function useNavBarVM() {
  return {
    brand: { label: CONTACT.studio.name, href: anchor(SECTION_IDS.home) },
    links: MAIN_NAV,
    cta: NAV_CTA,
  }
}

export type NavBarVM = ReturnType<typeof useNavBarVM>
