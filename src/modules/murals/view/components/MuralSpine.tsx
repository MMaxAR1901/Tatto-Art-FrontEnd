import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import { previewTriggerId } from '@/modules/preview'
import { artPatternClass, Icon } from '@/shared/ui'
import type { MuralCarouselVM, MuralSpineVM } from '../../vm/useMuralCarouselVM'

interface MuralSpineProps {
  spine: MuralSpineVM
  section: MuralCarouselVM['section']
  onActivate: (index: number) => void
}

/** Posición dinámica (la calcula el VM); el resto del estilo vive en clases. */
function spineStyle({ layout, colors }: MuralSpineVM): CSSProperties {
  if (layout.isCenter) return { zIndex: layout.zIndex, transform: 'translateX(-50%)' }
  return {
    zIndex: layout.zIndex,
    transform: `translateX(-50%) translateX(${layout.x}px) scale(${layout.scale})`,
    background: colors.bg,
    color: colors.fg,
    opacity: layout.hidden ? 0 : 1,
    pointerEvents: layout.hidden ? 'none' : 'auto',
  }
}

/** Lomo de cinta o, si está seleccionado, portada frontal del carrusel de murales. */
export function MuralSpine({ spine, section, onActivate }: MuralSpineProps) {
  const { mural, index, number, layout, label } = spine

  return (
    <button
      type="button"
      id={layout.isCenter ? previewTriggerId(`mural-${mural.id}`) : undefined}
      aria-label={label}
      aria-hidden={layout.hidden || undefined}
      // Foco itinerante: sólo la portada entra en el orden de Tab; ← → recorren la fila.
      tabIndex={layout.isCenter ? 0 : -1}
      onClick={() => onActivate(index)}
      style={spineStyle(spine)}
      className={cn(
        'font-display absolute top-1/2 left-1/2 -mt-[235px] box-border flex h-[470px] origin-center cursor-pointer flex-col justify-between gap-2.5 overflow-hidden rounded border-0',
        'ease-ink transition-[transform,width,opacity] duration-[600ms,600ms,400ms] motion-reduce:transition-none',
        layout.isCenter
          ? cn(
              'text-bone w-[min(400px,78vw)] items-stretch p-6 shadow-[0_30px_60px_rgba(0,0,0,0.7),0_0_0_1px_var(--color-accent)]',
              artPatternClass(mural.art.pattern),
            )
          : 'w-16 items-center px-0 py-[18px] shadow-[0_16px_30px_rgba(0,0,0,0.5)] hover:brightness-[1.18]',
      )}
    >
      {layout.isCenter ? (
        <>
          <span className="text-smoke text-center font-sans text-[11px] font-semibold tracking-[0.22em] uppercase">
            {section.coverKicker}
          </span>
          <span className="text-bone text-center text-[46px] leading-none uppercase">
            {mural.title}
          </span>
          <span className="border-edge text-dust relative my-1 flex flex-1 flex-col items-center justify-center gap-2.5 overflow-hidden border bg-black/40 font-sans text-[11px] tracking-[0.2em] uppercase">
            {mural.art.image ? (
              <img
                src={mural.art.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              '[Foto mural]'
            )}
            <span className="text-bone relative flex items-center gap-1.5 font-semibold">
              <Icon name="expand" size={14} />
              {section.openLabel}
            </span>
          </span>
          <span className="text-smoke flex items-center justify-between font-sans text-[10px] tracking-[0.18em]">
            <span>N° {number}</span>
            <span className="border-accent-soft text-accent-soft border px-1.5 py-[3px] font-bold">
              {section.coverBadge}
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="text-[13px]">{number}</span>
          <span className="max-h-[340px] overflow-hidden text-2xl tracking-[0.06em] whitespace-nowrap uppercase [writing-mode:vertical-rl]">
            {mural.title}
          </span>
          <span className="border border-current px-[5px] py-1 font-sans text-[11px] font-bold">
            {section.spineBadge}
          </span>
        </>
      )}
    </button>
  )
}
