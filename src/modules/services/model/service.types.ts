import type { SectionId } from '@/shared/config/navigation.config'

export interface StudioService {
  number: string
  name: string
  description: string
  linkLabel: string
  /** Sección a la que lleva la tarjeta. */
  target: SectionId
}
