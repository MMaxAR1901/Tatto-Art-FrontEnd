import { useEffect, useRef, type KeyboardEvent } from 'react'
import { previewTriggerId } from '@/modules/preview'
import type { MuralCarouselVM } from '../../vm/useMuralCarouselVM'
import { MuralSpine } from './MuralSpine'

interface MuralCarouselProps {
  vm: MuralCarouselVM
}

/** Escenario 3D: titulares de fondo, resplandor rojo y la fila de lomos. */
export function MuralCarousel({ vm }: MuralCarouselProps) {
  const { section, current } = vm
  const stageRef = useRef<HTMLDivElement>(null)

  // Si el foco estaba en el carrusel, sigue a la nueva portada al cambiar de mural.
  useEffect(() => {
    const stage = stageRef.current
    if (!current || !stage?.contains(document.activeElement)) return
    document.getElementById(previewTriggerId(`mural-${current.id}`))?.focus({ preventScroll: true })
  }, [current])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    vm.step(e.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <div
      ref={stageRef}
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Archivo de murales. ${section.scrollHint}`}
      onKeyDown={onKeyDown}
      className="relative isolate mx-auto h-[580px] w-full max-w-[1440px] touch-pan-y"
    >
      <div
        aria-hidden="true"
        className="font-display text-ghost absolute top-2 left-8 hidden flex-col text-[136px] leading-[0.92] uppercase min-[761px]:flex"
      >
        {section.backdropLeft.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="font-gothic text-blood absolute top-2 right-8 hidden flex-col items-end text-[136px] leading-[0.92] min-[761px]:flex"
      >
        {section.backdropRight.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute right-[12%] bottom-2 left-[12%] h-[70px] bg-[radial-gradient(ellipse_at_center,rgba(208,2,27,0.30),transparent_70%)]"
      />

      {vm.spines.map((spine) => (
        <MuralSpine key={spine.mural.id} spine={spine} section={section} onActivate={vm.activate} />
      ))}
    </div>
  )
}
