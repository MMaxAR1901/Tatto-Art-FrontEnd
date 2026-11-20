import { PillLink } from '@/shared/ui'
import type { NavBarVM } from '../vm/useNavBarVM'

interface NavBarProps {
  vm: NavBarVM
}

/** Header fijo. En teléfono (≤760px) sólo quedan la marca y el CTA, como en el diseño. */
export function NavBar({ vm }: NavBarProps) {
  return (
    <header className="border-line sticky top-0 z-20 border-b bg-[rgba(10,10,10,0.92)] backdrop-blur-sm">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-4"
      >
        <a
          href={vm.brand.href}
          className="font-gothic text-accent text-[34px] leading-none no-underline"
        >
          {vm.brand.label}
        </a>
        <div className="flex flex-wrap items-center gap-7 text-sm font-medium tracking-[0.06em] uppercase">
          {vm.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-bone hover:text-accent-soft hidden no-underline transition-colors min-[761px]:inline"
            >
              {link.label}
            </a>
          ))}
          <PillLink href={vm.cta.href} size="sm" className="font-medium">
            {vm.cta.label}
          </PillLink>
        </div>
      </nav>
    </header>
  )
}
