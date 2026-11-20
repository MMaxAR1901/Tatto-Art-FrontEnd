import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function focusableIn(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getAttribute('aria-hidden') !== 'true',
  )
}

interface FocusTrapOptions {
  /** Elemento a enfocar al activarse (por defecto, el primero enfocable). */
  initialFocusRef?: RefObject<HTMLElement | null>
  /**
   * Elemento al que devolver el foco al desactivarse. Si no devuelve nada, se usa el que
   * tenía el foco antes de abrir.
   */
  getReturnFocus?: () => HTMLElement | null
}

/**
 * Mantiene el foco dentro de `containerRef` mientras `active` sea verdadero:
 * enfoca el elemento inicial, cicla Tab / Shift+Tab y devuelve el foco al cerrar.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  { initialFocusRef, getReturnFocus }: FocusTrapOptions = {},
) {
  const getReturnFocusRef = useRef(getReturnFocus)

  useEffect(() => {
    getReturnFocusRef.current = getReturnFocus
  })

  useEffect(() => {
    const container = containerRef.current
    if (!active || !container) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const initial = initialFocusRef?.current ?? focusableIn(container)[0]
    initial?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusableIn(container)
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      const outside = !container.contains(current)
      if (e.shiftKey && (current === first || outside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (current === last || outside)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      const target = getReturnFocusRef.current?.() ?? previouslyFocused
      // `preventScroll` evita saltos de página al devolver el foco.
      target?.focus?.({ preventScroll: true })
    }
  }, [active, containerRef, initialFocusRef])
}
