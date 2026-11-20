import { SECTION_IDS } from '@/shared/config/navigation.config'
import { Container, Eyebrow, Icon, PillLink } from '@/shared/ui'
import type { HeroVM } from '../vm/useHeroVM'
import { Emblem } from './components/Emblem'

interface HeroSectionProps {
  vm: HeroVM
}

export function HeroSection({ vm }: HeroSectionProps) {
  return (
    <Container
      as="section"
      id={SECTION_IDS.home}
      aria-labelledby="hero-title"
      className="relative flex scroll-mt-20 flex-wrap items-center gap-12 pt-[72px] pb-24"
    >
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
        <Eyebrow>{vm.eyebrow}</Eyebrow>
        <h1
          id="hero-title"
          className="font-display m-0 text-[clamp(64px,10vw,156px)] leading-[0.9] font-normal tracking-[-0.01em] uppercase"
        >
          {vm.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="font-gothic text-accent block text-[1.1em] normal-case">
            {vm.titleAccent}
          </span>
        </h1>
        <p className="text-smoke m-0 max-w-[520px] text-lg leading-relaxed">{vm.lead}</p>
        <div className="flex flex-wrap gap-3">
          <PillLink href={vm.primaryHref}>
            {vm.primaryCta}
            <Icon name="arrowRight" size={18} />
          </PillLink>
          <PillLink href={vm.secondaryHref} variant="outline">
            {vm.secondaryCta}
          </PillLink>
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] justify-center">
        <Emblem emblem={vm.emblem} />
      </div>
    </Container>
  )
}
