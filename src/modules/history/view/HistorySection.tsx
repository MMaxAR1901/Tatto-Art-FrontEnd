import { SECTION_IDS } from '@/shared/config/navigation.config'
import { Container, Eyebrow } from '@/shared/ui'
import type { HistoryVM } from '../vm/useHistoryVM'

interface HistorySectionProps {
  vm: HistoryVM
}

/** Nuestra historia: relato, lema con paralaje y línea de tiempo. */
export function HistorySection({ vm }: HistorySectionProps) {
  return (
    <section
      id={SECTION_IDS.history}
      aria-labelledby="historia-title"
      className="border-line scroll-mt-20 border-t"
    >
      <Container className="flex flex-wrap gap-16 py-[120px]">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
          <Eyebrow>{vm.eyebrow}</Eyebrow>
          <h2
            id="historia-title"
            className="reveal font-gothic text-bone m-0 text-[clamp(56px,7vw,104px)] leading-[0.95] font-normal"
          >
            {vm.title} <span className="text-accent">{vm.titleAccent}</span>
          </h2>
          {vm.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-smoke m-0 text-[17px] leading-[1.7]">
              {paragraph}
            </p>
          ))}
          <blockquote className="parallax border-rule font-display mx-0 mt-4 mb-0 border-t pt-7 text-[32px] leading-[1.2] uppercase">
            “{vm.quote}”
          </blockquote>
        </div>

        <ol
          aria-label="Línea de tiempo"
          className="m-0 flex min-w-0 flex-[1_1_380px] list-none flex-col p-0"
        >
          {vm.timeline.map((milestone) => (
            <li
              key={milestone.key}
              className="reveal border-line grid grid-cols-[96px_minmax(0,1fr)] gap-6 border-b py-7 sm:grid-cols-[120px_minmax(0,1fr)]"
            >
              <span className="font-display text-accent-soft text-[28px]">{milestone.year}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 text-lg font-semibold">{milestone.title}</h3>
                <p className="text-ash m-0 text-[15px] leading-relaxed">{milestone.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
