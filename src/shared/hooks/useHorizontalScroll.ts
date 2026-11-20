import { useEffect, useRef, type RefObject } from 'react'

export type ScrollDirection = 1 | -1

export interface HorizontalScrollOptions {
  /** Desplazamiento lateral acumulado (px) necesario para avanzar un paso. */
  stepPx?: number
  /** Tiempo tras cada paso en que se ignora el scroll (inercia de trackpads). */
  lockMs?: number
  /** Distancia mínima (px) de un deslizamiento táctil horizontal. */
  swipeMinPx?: number
  enabled?: boolean
}

/**
 * Convierte el scroll lateral sobre `targetRef` en pasos discretos (+1 derecha, −1 izquierda):
 * - rueda / trackpad: `deltaX` (o Shift + rueda vertical), acumulado hasta `stepPx`;
 * - táctil: deslizamiento horizontal de al menos `swipeMinPx`.
 * El scroll vertical no se toca, así que la página sigue bajando con normalidad.
 */
export function useHorizontalScroll(
  targetRef: RefObject<HTMLElement | null>,
  onStep: (direction: ScrollDirection) => void,
  { stepPx = 60, lockMs = 350, swipeMinPx = 40, enabled = true }: HorizontalScrollOptions = {},
) {
  const onStepRef = useRef(onStep)

  useEffect(() => {
    onStepRef.current = onStep
  })

  useEffect(() => {
    const el = targetRef.current
    if (!el || !enabled) return

    let accumulated = 0
    let lockedUntil = 0
    let touchStart: { x: number; y: number } | null = null

    const onWheel = (e: WheelEvent) => {
      const horizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (horizontal === 0) return

      // Evita el gesto "atrás / adelante" del navegador mientras se recorre el carrusel.
      e.preventDefault()
      const now = performance.now()
      if (now < lockedUntil) return

      accumulated += horizontal
      if (Math.abs(accumulated) < stepPx) return

      const direction: ScrollDirection = accumulated > 0 ? 1 : -1
      accumulated = 0
      lockedUntil = now + lockMs
      onStepRef.current(direction)
    }

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      touchStart = e.touches.length === 1 && t ? { x: t.clientX, y: t.clientY } : null
    }

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0]
      if (!touchStart || !t) return
      const dx = t.clientX - touchStart.x
      const dy = t.clientY - touchStart.y
      touchStart = null
      if (Math.abs(dx) < swipeMinPx || Math.abs(dx) <= Math.abs(dy)) return
      // Deslizar el dedo a la izquierda avanza (como arrastrar la fila).
      onStepRef.current(dx < 0 ? 1 : -1)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [targetRef, enabled, stepPx, lockMs, swipeMinPx])
}
