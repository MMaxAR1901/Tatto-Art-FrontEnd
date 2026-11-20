import { useEffect, useRef } from 'react'
import { useFocusTrap } from '@/shared/hooks'
import { ArtPlaceholder, Icon, PillLink } from '@/shared/ui'
import { previewTriggerId } from '../data/preview-trigger'
import type { PreviewModalVM } from '../vm/usePreviewModalVM'

const ROUND_BUTTON =
  'flex cursor-pointer items-center justify-center rounded-full border border-outline text-bone transition-colors duration-200 hover:border-accent-soft hover:bg-raised'

interface PreviewModalProps {
  vm: PreviewModalVM
}

/** Vista previa grande de un tatuaje o mural, con navegación y CTA a WhatsApp. */
export function PreviewModal({ vm }: PreviewModalProps) {
  const { isOpen, item } = vm
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // Última pieza mostrada: al cerrar, el foco vuelve a su miniatura en la página.
  const lastItemIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (item) lastItemIdRef.current = item.id
  }, [item])

  useFocusTrap(panelRef, isOpen, {
    initialFocusRef: closeRef,
    getReturnFocus: () =>
      lastItemIdRef.current
        ? document.getElementById(previewTriggerId(lastItemIdRef.current))
        : null,
  })

  if (!isOpen || !item) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
      aria-describedby="preview-subtitle"
      className="text-bone fixed inset-0 z-[100] box-border flex items-center justify-center p-4 font-sans sm:p-6"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Cerrar vista previa"
        onClick={vm.close}
        className="animate-fade-in absolute inset-0 cursor-zoom-out border-0 bg-[rgba(5,5,5,0.93)] p-0 motion-reduce:animate-none"
      />

      <div
        ref={panelRef}
        className="animate-pop-in relative flex max-h-full w-full max-w-[1120px] flex-col gap-4 overflow-y-auto motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-smoke flex items-center gap-3.5 text-xs font-semibold tracking-[0.24em] uppercase">
            <span className="text-accent-soft">{vm.typeLabel}</span>
            <span aria-hidden="true" className="bg-outline h-px w-10" />
            <span aria-live="polite">{vm.counter}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar"
            onClick={vm.close}
            className={`${ROUND_BUTTON} bg-ink h-12 w-12 shrink-0`}
          >
            <Icon name="close" />
          </button>
        </div>

        <ArtPlaceholder
          art={item.art}
          alt={item.title}
          placeholder="[Imagen en tamaño grande]"
          placeholderClassName="text-dust text-[13px] tracking-[0.24em] px-20 text-center"
          className="border-line-strong h-[min(68vh,720px)] shrink-0 rounded-md border shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        >
          {item.available && (
            <span className="bg-accent absolute top-4 right-4 rounded px-3 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase">
              Disponible
            </span>
          )}
          {vm.hasMany && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={vm.prev}
                className={`${ROUND_BUTTON} absolute top-1/2 left-4 -mt-[26px] h-[52px] w-[52px] bg-[rgba(10,10,10,0.8)]`}
              >
                <Icon name="arrowLeft" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={vm.next}
                className={`${ROUND_BUTTON} absolute top-1/2 right-4 -mt-[26px] h-[52px] w-[52px] bg-[rgba(10,10,10,0.8)]`}
              >
                <Icon name="arrowRight" />
              </button>
            </>
          )}
        </ArtPlaceholder>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <h2
              id="preview-title"
              className="font-display m-0 text-[clamp(28px,4vw,44px)] leading-none font-normal uppercase"
            >
              {item.title}
            </h2>
            <span
              id="preview-subtitle"
              className="text-accent-soft text-[13px] font-semibold tracking-[0.18em] uppercase"
            >
              {item.subtitle}
            </span>
          </div>
          <PillLink href={vm.whatsappUrl} external size="lg" className="px-6 text-[15px] font-bold">
            <Icon name="whatsapp" />
            Cotizar por WhatsApp
          </PillLink>
        </div>
      </div>
    </div>
  )
}
