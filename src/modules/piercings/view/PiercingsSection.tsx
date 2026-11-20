import { SECTION_IDS } from '@/shared/config/navigation.config'
import { Container, Eyebrow, Icon } from '@/shared/ui'
import type { PiercingsVM } from '../vm/usePiercingsVM'

interface PiercingsSectionProps {
  vm: PiercingsVM
}

/** 02 — Piercings sobre fondo hueso: beneficios y lista de zonas con precio. */
export function PiercingsSection({ vm }: PiercingsSectionProps) {
  const { section } = vm

  return (
    <section
      id={SECTION_IDS.piercings}
      aria-labelledby="piercings-title"
      className="bg-paper text-ink scroll-mt-20"
    >
      <Container className="flex flex-wrap gap-16 py-[120px]">
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-6">
          <Eyebrow className="text-accent-deep">{section.eyebrow}</Eyebrow>
          <h2
            id="piercings-title"
            aria-label={section.titleLines.join('')}
            className="reveal font-display m-0 text-[clamp(56px,8vw,120px)] leading-[0.9] font-normal uppercase"
          >
            {section.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-graphite m-0 text-[17px] leading-relaxed">{section.intro}</p>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {section.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-[15px] leading-normal">
                <Icon name="check" strokeWidth={2.2} className="text-accent-deep mt-px flex-none" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <ul
          aria-label="Zonas de perforación"
          className="border-ink m-0 flex min-w-0 flex-[999_1_560px] list-none flex-col border-b p-0"
        >
          {vm.zones.map((zone) => (
            <li
              key={zone.id}
              className="reveal border-ink grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 border-t py-[22px] sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:gap-5"
            >
              <span className="font-display text-accent-deep text-lg">{zone.number}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display m-0 text-[30px] leading-none font-normal uppercase">
                  {zone.name}
                </h3>
                <p className="text-stone m-0 text-sm">{zone.description}</p>
              </div>
              <span className="text-[15px] font-semibold whitespace-nowrap">{zone.price}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
