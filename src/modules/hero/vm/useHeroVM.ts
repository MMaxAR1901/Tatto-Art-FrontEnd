import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'
import { HERO } from '../data/hero.data'

/** Hero: titular, CTAs y emblema grabado giratorio. */
export function useHeroVM() {
  return {
    ...HERO,
    primaryHref: anchor(SECTION_IDS.contact),
    secondaryHref: anchor(SECTION_IDS.tattoos),
  }
}

export type HeroVM = ReturnType<typeof useHeroVM>
