import { Container } from '@/shared/ui'
import type { ServicesVM } from '../vm/useServicesVM'

interface ServicesSectionProps {
  vm: ServicesVM
}

/** Tres tarjetas-enlace: Tatuajes, Piercings y Murales. */
export function ServicesSection({ vm }: ServicesSectionProps) {
  return (
    <Container as="section" aria-label="Servicios" className="py-24">
      <ul className="border-line m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-l p-0">
        {vm.cards.map((card) => (
          <li key={card.number} className="reveal border-line border-r">
            <a
              href={card.href}
              className="text-bone group flex h-full flex-col gap-4 px-8 py-10 no-underline"
            >
              <span className="font-display text-accent-soft text-lg">{card.number}</span>
              <span className="font-display text-[56px] leading-none uppercase">{card.name}</span>
              <span className="text-smoke text-base leading-relaxed">{card.description}</span>
              <span className="text-accent-soft text-sm font-semibold tracking-[0.12em] uppercase transition-colors group-hover:text-white">
                {card.linkLabel}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}
