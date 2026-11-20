import { pad2 } from '@/lib/format'
import { PIERCING_ZONES, PIERCINGS_SECTION } from '../data/piercings.data'

/** Lista de zonas de perforación numeradas y beneficios incluidos. */
export function usePiercingsVM() {
  return {
    section: PIERCINGS_SECTION,
    zones: PIERCING_ZONES.map((zone, i) => ({ ...zone, number: pad2(i + 1) })),
  }
}

export type PiercingsVM = ReturnType<typeof usePiercingsVM>
