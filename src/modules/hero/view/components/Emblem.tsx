import type { HeroContent } from '../../model/hero.types'

interface EmblemProps {
  emblem: HeroContent['emblem']
}

/** Emblema circular grabado: rayos giratorios, anillos y núcleo con el monograma. */
export function Emblem({ emblem }: EmblemProps) {
  return (
    <div className="relative aspect-square w-[min(440px,86vw)] rounded-full">
      <div
        aria-hidden="true"
        className="emblem-rays animate-spin-slow absolute inset-0 rounded-full opacity-35 motion-reduce:animate-none"
      />
      <div aria-hidden="true" className="emblem-rings absolute inset-[7%] rounded-full" />
      <div className="emblem-core border-accent absolute inset-[18%] flex flex-col items-center justify-center gap-2 overflow-hidden rounded-full border-2 text-center">
        {emblem.image ? (
          <img
            src={emblem.image}
            alt={emblem.imageAlt ?? ''}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <span className="font-gothic text-accent text-[64px] leading-none">
              {emblem.monogram}
            </span>
            <span className="text-ash text-xs tracking-[0.2em] uppercase">
              {emblem.placeholder}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
