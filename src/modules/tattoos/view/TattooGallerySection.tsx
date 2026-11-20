import { SECTION_IDS } from '@/shared/config/navigation.config'
import { Container, Eyebrow, PillLink } from '@/shared/ui'
import type { TattooGalleryVM } from '../vm/useTattooGalleryVM'
import { TattooTile } from './components/TattooTile'

interface TattooGallerySectionProps {
  vm: TattooGalleryVM
}

/** 01 — Galería de tatuajes y diseños flash. */
export function TattooGallerySection({ vm }: TattooGallerySectionProps) {
  const { section } = vm

  return (
    <Container
      as="section"
      id={SECTION_IDS.tattoos}
      aria-labelledby="tatuajes-title"
      className="flex scroll-mt-20 flex-col gap-10 pt-12 pb-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="reveal flex flex-col gap-3">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2
            id="tatuajes-title"
            className="font-display m-0 text-[clamp(56px,8vw,120px)] leading-[0.9] font-normal uppercase"
          >
            {section.title}{' '}
            <span className="font-gothic text-accent normal-case">{section.titleAccent}</span>
          </h2>
        </div>
        <p className="text-smoke m-0 max-w-[420px] text-base leading-relaxed">
          {section.intro} <strong className="text-bone">{section.introStrong}</strong>{' '}
          {section.introEnd}
        </p>
      </div>

      <div className="grid [grid-auto-flow:dense] auto-rows-[200px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {vm.tiles.map((tile) => (
          <TattooTile key={tile.tattoo.id} tile={tile} onOpen={vm.open} />
        ))}
      </div>

      <div className="border-line-strong flex flex-wrap items-center justify-between gap-4 rounded-md border px-8 py-7">
        <p className="m-0 text-lg leading-normal">{section.ctaText}</p>
        <PillLink href={vm.quoteHref} variant="bone" size="md">
          {section.ctaLabel}
        </PillLink>
      </div>
    </Container>
  )
}
