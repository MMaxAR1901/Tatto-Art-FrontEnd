import { CONTACT } from '@/shared/config/contact.config'
import type { HeroContent } from '../model/hero.types'

export const HERO: HeroContent = {
  eyebrow: `Tattoo · Piercing · Murales — ${CONTACT.studio.city}`,
  titleLines: ['Arte que', 'se queda'],
  titleAccent: 'contigo.',
  lead: 'Tatuajes a mano alzada y por diseño, perforaciones profesionales y murales a gran escala. Un solo estudio, tres formas de llevar el arte encima.',
  primaryCta: 'Cotiza tu tatuaje',
  secondaryCta: 'Ver galería',
  emblem: {
    monogram: 'TA',
    placeholder: '[Foto principal]',
    // image: '/img/estudio.jpg',
    imageAlt: 'Foto del estudio TATTO ART',
  },
}
