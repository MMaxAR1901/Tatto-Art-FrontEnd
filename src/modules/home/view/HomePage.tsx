import { ContactSection } from '@/modules/contact'
import { Footer } from '@/modules/footer'
import { HeroSection } from '@/modules/hero'
import { HistorySection } from '@/modules/history'
import { MarqueeBand } from '@/modules/marquee'
import { MuralsSection } from '@/modules/murals'
import { NavBar } from '@/modules/nav'
import { PiercingsSection } from '@/modules/piercings'
import { PreviewModal } from '@/modules/preview'
import { ServicesSection } from '@/modules/services'
import { TattooGallerySection } from '@/modules/tattoos'
import { useHomeVM } from '../vm/useHomeVM'

/** Página única de TATTO ART: composición de secciones. Toda la lógica vive en `useHomeVM`. */
export function HomePage() {
  const vm = useHomeVM()

  return (
    <div className="bg-ink text-bone overflow-x-clip font-sans">
      <a
        href="#contenido"
        className="bg-bone text-ink sr-only z-50 rounded px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <NavBar vm={vm.nav} />
      <main id="contenido">
        <HeroSection vm={vm.hero} />
        <MarqueeBand vm={vm.serviceMarquee} variant="accent" />
        <ServicesSection vm={vm.services} />
        <TattooGallerySection vm={vm.tattoos} />
        <PiercingsSection vm={vm.piercings} />
        <MuralsSection vm={vm.murals} />
        <HistorySection vm={vm.history} />
        <MarqueeBand vm={vm.brandMarquee} variant="outline" />
        <ContactSection vm={vm.contact} />
      </main>
      <Footer vm={vm.footer} />
      <PreviewModal vm={vm.preview} />
    </div>
  )
}
