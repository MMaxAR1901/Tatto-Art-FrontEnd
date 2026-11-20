import type { FooterVM } from '../vm/useFooterVM'

interface FooterProps {
  vm: FooterVM
}

export function Footer({ vm }: FooterProps) {
  return (
    <footer className="bg-ink flex flex-col gap-10 overflow-hidden px-6 pt-20 pb-8">
      <div
        aria-hidden="true"
        className="reveal text-engraved font-display text-center text-[clamp(88px,20vw,320px)] leading-[0.85] tracking-[-0.01em] uppercase"
      >
        {vm.wordmark}
      </div>
      <div className="border-line text-ash mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
        <span>{vm.copyright}</span>
        <nav aria-label="Secciones" className="flex flex-wrap gap-6">
          {vm.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-bone hover:text-accent-soft no-underline transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
