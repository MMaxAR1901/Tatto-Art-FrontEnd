import { useCallback, useMemo, useState } from 'react'
import { anchor, SECTION_IDS } from '@/shared/config/navigation.config'
import { clampIndex, pad2 } from '@/lib/format'
import { CAROUSEL_CONFIG } from '../config/carousel.config'
import { computeSpineLayout, spineColors } from '../data/carousel-layout'
import { MURAL_STEPS, MURALS_SECTION } from '../data/murals.data'
import type { Mural } from '../model/mural.types'

interface MuralCarouselOptions {
  initialIndex?: number
  /** Abre el mural `index` en el modal de vista previa. */
  onOpen?: (index: number) => void
}

/**
 * Carrusel 3D de murales tipo archivo VHS.
 * - `step(±1)`: avanza / retrocede un mural (scroll lateral, deslizamiento táctil o ← →).
 *   Se detiene en los extremos.
 * - `activate(i)`: clic en la portada abre el modal; clic en un lomo lo selecciona.
 * - `select(i)`: selección directa (p. ej. al navegar desde el modal).
 * Pasar el cursor por encima ya no cambia la selección.
 */
export function useMuralCarouselVM(
  murals: Mural[],
  { initialIndex = CAROUSEL_CONFIG.initialIndex, onOpen }: MuralCarouselOptions = {},
) {
  const [rawSelected, setSelected] = useState(() => clampIndex(initialIndex, murals.length))
  const selected = clampIndex(rawSelected, murals.length)
  const count = murals.length

  const select = useCallback((i: number) => setSelected(clampIndex(i, count)), [count])

  const step = useCallback(
    (direction: number) =>
      setSelected((current) => clampIndex(clampIndex(current, count) + direction, count)),
    [count],
  )

  const open = useCallback(() => onOpen?.(selected), [onOpen, selected])

  const activate = useCallback(
    (i: number) => (i === selected ? onOpen?.(i) : select(i)),
    [selected, onOpen, select],
  )

  const spines = useMemo(
    () =>
      murals.map((mural, i) => {
        const layout = computeSpineLayout(i - selected)
        const number = pad2(i + 1)
        return {
          mural,
          index: i,
          number,
          layout,
          colors: spineColors(i),
          label: layout.isCenter
            ? `Ver mural ${mural.title} en grande`
            : `Mural ${number}: ${mural.title}`,
        }
      }),
    [murals, selected],
  )

  return {
    section: MURALS_SECTION,
    steps: MURAL_STEPS,
    quoteHref: anchor(SECTION_IDS.contact),
    scroll: {
      stepPx: CAROUSEL_CONFIG.scrollStepPx,
      lockMs: CAROUSEL_CONFIG.scrollLockMs,
      swipeMinPx: CAROUSEL_CONFIG.swipeMinPx,
    },
    selected,
    current: murals[selected] ?? null,
    canPrev: selected > 0,
    canNext: selected < count - 1,
    spines,
    step,
    activate,
    select,
    open,
  }
}

export type MuralCarouselVM = ReturnType<typeof useMuralCarouselVM>
export type MuralSpineVM = MuralCarouselVM['spines'][number]
