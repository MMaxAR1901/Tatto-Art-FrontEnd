import { useCallback, useState } from 'react'
import { buildWhatsAppUrl } from '@/lib/contact-links'
import { clampIndex, formatCounter, wrapIndex } from '@/lib/format'
import { useKeyboardShortcuts, useLockBodyScroll } from '@/shared/hooks'
import type { PreviewCollections, PreviewKind, PreviewSelection } from '../model/preview.types'

interface PreviewModalOptions {
  /** Se llama cada vez que cambia la pieza mostrada (p. ej. para sincronizar el carrusel). */
  onNavigate?: (selection: PreviewSelection) => void
}

/**
 * Estado del modal de vista previa compartido por la galería de tatuajes y los murales:
 * colección e índice abiertos, navegación circular anterior / siguiente, contador "03 / 12",
 * teclado (Esc / ← / →), bloqueo de scroll y CTA de WhatsApp.
 */
export function usePreviewModalVM(
  collections: PreviewCollections,
  { onNavigate }: PreviewModalOptions = {},
) {
  const [selection, setSelection] = useState<PreviewSelection | null>(null)

  const collection = selection ? collections[selection.kind] : null
  const total = collection?.items.length ?? 0
  const index = selection ? clampIndex(selection.index, total) : 0
  const item = collection?.items[index] ?? null
  const isOpen = item !== null

  const show = useCallback(
    (next: PreviewSelection) => {
      setSelection(next)
      onNavigate?.(next)
    },
    [onNavigate],
  )

  const open = useCallback(
    (kind: PreviewKind, i: number) => {
      const length = collections[kind].items.length
      if (length === 0) return
      show({ kind, index: clampIndex(i, length) })
    },
    [collections, show],
  )

  const close = useCallback(() => setSelection(null), [])

  const step = useCallback(
    (delta: number) => {
      if (!selection || total === 0) return
      show({ kind: selection.kind, index: wrapIndex(index + delta, total) })
    },
    [selection, total, index, show],
  )

  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  useLockBodyScroll(isOpen)
  useKeyboardShortcuts(isOpen, { Escape: close, ArrowRight: next, ArrowLeft: prev })

  return {
    isOpen,
    kind: selection?.kind ?? null,
    index,
    item,
    typeLabel: collection?.label ?? '',
    counter: isOpen ? formatCounter(index, total) : '',
    hasMany: total > 1,
    whatsappUrl: item ? buildWhatsAppUrl(item.whatsappMessage) : '',
    open,
    close,
    next,
    prev,
  }
}

export type PreviewModalVM = ReturnType<typeof usePreviewModalVM>
