import type { ReactNode } from 'react'
import { SECTION_IDS } from '@/shared/config/navigation.config'
import { Container, Icon, PillLink, type IconName } from '@/shared/ui'
import type { ContactVM } from '../vm/useContactVM'

const ON_RED_FOCUS = 'focus-visible:outline-white'

function InfoLine({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[15px] leading-normal">
      <Icon name={icon} size={24} className="flex-none" />
      <span>{children}</span>
    </div>
  )
}

interface ContactSectionProps {
  vm: ContactVM
}

/** Contacto sobre rojo de acento, con tarjeta negra y un solo CTA a WhatsApp. */
export function ContactSection({ vm }: ContactSectionProps) {
  const { section } = vm

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contacto-title"
      className="bg-accent scroll-mt-20 text-white"
    >
      <Container className="flex flex-wrap gap-14 py-[120px]">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
          <p className="m-0 text-[13px] font-bold tracking-[0.28em] uppercase">{section.eyebrow}</p>
          <h2
            id="contacto-title"
            className="reveal font-display m-0 text-[clamp(56px,8vw,120px)] leading-[0.9] font-normal uppercase"
          >
            {section.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <a
            href={vm.phone.href}
            className={`flex flex-col gap-1.5 text-white no-underline ${ON_RED_FOCUS}`}
          >
            <span className="text-[13px] font-semibold tracking-[0.2em] uppercase opacity-85">
              {section.phoneKicker}
            </span>
            <span className="font-display text-[clamp(40px,6vw,80px)] leading-none break-words">
              {vm.phone.label}
            </span>
          </a>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 border-t border-white/40 pt-3">
            <a
              href={vm.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-11 items-center gap-3 font-semibold text-white no-underline hover:underline ${ON_RED_FOCUS}`}
            >
              <Icon name="whatsapp" size={24} />
              {vm.whatsapp.label}
            </a>
            <a
              href={vm.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-11 items-center gap-3 font-semibold text-white no-underline hover:underline ${ON_RED_FOCUS}`}
            >
              <Icon name="instagram" size={24} />
              {vm.instagram.label}
            </a>
            <InfoLine icon="pin">
              <address className="not-italic">
                {vm.location.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </InfoLine>
            <InfoLine icon="clock">
              {vm.hours[0]}
              <br />
              {vm.hours[1]}
            </InfoLine>
          </div>
        </div>

        <div
          role="region"
          aria-labelledby="contacto-card-title"
          className="bg-ink text-bone box-border flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-6 rounded-lg px-8 py-10"
        >
          <h3
            id="contacto-card-title"
            className="font-display m-0 text-[34px] leading-[1.05] font-normal uppercase"
          >
            {section.card.title}
          </h3>
          <p className="text-smoke m-0 text-base leading-relaxed">{section.card.text}</p>
          <PillLink href={vm.quoteUrl} external size="xl" className="font-sans">
            <Icon name="whatsapp" size={24} />
            {section.card.cta}
          </PillLink>
          <span className="text-ash text-center text-[13px]">{vm.responseNote}</span>
        </div>
      </Container>
    </section>
  )
}
