import { useRef } from 'react'
import { SECTION_IDS } from '@/shared/config/navigation.config'
import { useHorizontalScroll } from '@/shared/hooks'
import { Container, Icon } from '@/shared/ui'
import type { MuralCarouselVM } from '../vm/useMuralCarouselVM'
import { MuralCarousel } from './components/MuralCarousel'

interface MuralsSectionProps {
  vm: MuralCarouselVM
}

/** 03 — Murales: archivo VHS, ficha del mural seleccionado y proceso de trabajo. */
export function MuralsSection({ vm }: MuralsSectionProps) {
  const { section, current } = vm
  const sectionRef = useRef<HTMLElement>(null)

  // El scroll lateral en cualquier punto de la sección recorre el archivo.
  useHorizontalScroll(sectionRef, vm.step, vm.scroll)

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.murals}
      aria-labelledby="murales-title"
      className="bg-ink border-line flex scroll-mt-20 flex-col gap-8 overflow-hidden border-t pt-24 pb-[120px]"
    >
      <Container className="text-ash flex flex-wrap items-center justify-between gap-4 text-xs font-semibold tracking-[0.24em] uppercase">
        <span className="flex items-center gap-4">
          <h2 id="murales-title" className="text-accent-soft m-0 text-xs font-semibold">
            {section.eyebrow}
          </h2>
          <span aria-hidden="true" className="bg-outline h-px w-16" />
          <span>{section.archiveLabel}</span>
        </span>
        <span>{section.categories}</span>
      </Container>

      <MuralCarousel vm={vm} />

      {current && (
        <div className="mx-auto box-border flex w-full max-w-[900px] justify-center px-6 pb-6">
          <div aria-live="polite" className="flex flex-col items-center gap-2.5 text-center">
            <span className="font-gothic text-accent text-[clamp(44px,6vw,76px)] leading-none">
              {current.title}
            </span>
            <span className="text-smoke text-xs font-semibold tracking-[0.24em] uppercase">
              {current.place} · {current.kind}
            </span>
            <span
              aria-hidden="true"
              className="text-dust flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase"
            >
              <Icon name="arrowLeft" size={14} className={vm.canPrev ? '' : 'opacity-30'} />
              {section.scrollHint}
              <Icon name="arrowRight" size={14} className={vm.canNext ? '' : 'opacity-30'} />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button
                type="button"
                onClick={vm.open}
                className="border-outline text-bone hover:border-accent-soft hover:bg-raised inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border bg-transparent px-[18px] font-sans text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200"
              >
                <Icon name="expand" size={16} />
                {section.openLabel}
              </button>
              <a
                href={vm.quoteHref}
                className="text-accent-soft text-[13px] font-semibold tracking-[0.12em] uppercase no-underline hover:text-white"
              >
                {section.quoteLabel}
              </a>
            </div>
          </div>
        </div>
      )}

      <Container className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
        {vm.steps.map((step) => (
          <div key={step.title} className="reveal flex flex-col gap-3">
            <div aria-hidden="true" className="grow-line bg-accent h-0.5" />
            <h3 className="font-display m-0 text-[28px] font-normal uppercase">{step.title}</h3>
            <p className="text-smoke m-0 text-[15px] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}
