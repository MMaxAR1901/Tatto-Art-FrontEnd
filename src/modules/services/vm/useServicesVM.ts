import { anchor } from '@/shared/config/navigation.config'
import { SERVICES } from '../data/services.data'

/** Las tres disciplinas del estudio, cada una enlazada a su sección. */
export function useServicesVM() {
  return {
    cards: SERVICES.map((service) => ({ ...service, href: anchor(service.target) })),
  }
}

export type ServicesVM = ReturnType<typeof useServicesVM>
