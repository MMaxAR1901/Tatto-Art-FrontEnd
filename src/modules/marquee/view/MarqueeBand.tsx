import { cn } from '@/lib/cn'
import type { MarqueeVM } from '../vm/useMarqueeVM'

export type MarqueeVariant = 'accent' | 'outline'

interface MarqueeBandProps {
  vm: MarqueeVM
  variant?: MarqueeVariant
}

const BAND: Record<MarqueeVariant, string> = {
  accent: 'bg-accent border-y border-black text-white',
  outline: 'border-y border-line',
}

const TRACK: Record<MarqueeVariant, string> = {
  accent: 'animate-marquee gap-12 py-[18px] font-display text-[40px] tracking-[0.04em] uppercase',
  outline: 'animate-marquee-reverse gap-10 py-[22px] font-gothic text-[56px]',
}

/**
 * Banda en movimiento continuo. Es decorativa: el contenido se repite, así que se oculta a
 * lectores de pantalla. `accent` = banda roja · `outline` = marca con contorno.
 */
export function MarqueeBand({ vm, variant = 'accent' }: MarqueeBandProps) {
  return (
    <div aria-hidden="true" className={cn('overflow-hidden', BAND[variant])}>
      <div
        className={cn('flex w-max whitespace-nowrap motion-reduce:animate-none', TRACK[variant])}
      >
        {vm.tokens.map((token) => (
          <span
            key={token.key}
            className={cn(
              variant === 'outline' && (token.separator ? 'text-accent' : 'text-outline'),
            )}
          >
            {token.text}
          </span>
        ))}
      </div>
    </div>
  )
}
