import { useEffect, useRef } from 'react'

/** Mapa tecla → acción (`KeyboardEvent.key`, p. ej. "Escape", "ArrowRight"). */
export type KeyHandlers = Partial<Record<string, () => void>>

/**
 * Escucha teclas en `window` mientras `active` sea verdadero.
 * Los handlers se leen de una ref, así que pueden cambiar en cada render sin re-suscribir.
 */
export function useKeyboardShortcuts(active: boolean, handlers: KeyHandlers) {
  const handlersRef = useRef(handlers)

  useEffect(() => {
    handlersRef.current = handlers
  })

  useEffect(() => {
    if (!active) return
    const onKeyDown = (e: KeyboardEvent) => {
      const handler = handlersRef.current[e.key]
      if (!handler) return
      e.preventDefault()
      handler()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])
}
