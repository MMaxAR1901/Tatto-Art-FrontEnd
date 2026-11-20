export interface HeroContent {
  eyebrow: string
  titleLines: string[]
  titleAccent: string
  lead: string
  primaryCta: string
  secondaryCta: string
  emblem: {
    monogram: string
    placeholder: string
    /** Foto principal dentro del emblema (opcional). */
    image?: string
    imageAlt?: string
  }
}
