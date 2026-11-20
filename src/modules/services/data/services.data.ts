import { SECTION_IDS } from '@/shared/config/navigation.config'
import type { StudioService } from '../model/service.types'

export const SERVICES: StudioService[] = [
  {
    number: '01',
    name: 'Tatuajes',
    description:
      'Black & grey, color, fine line y tradicional. Diseño personalizado o elige uno de nuestros flash.',
    linkLabel: 'Ver trabajos →',
    target: SECTION_IDS.tattoos,
  },
  {
    number: '02',
    name: 'Piercings',
    description:
      'Perforaciones con material estéril y joyería de calidad. Te acompañamos en toda la cicatrización.',
    linkLabel: 'Ver zonas →',
    target: SECTION_IDS.piercings,
  },
  {
    number: '03',
    name: 'Murales',
    description: 'Fachadas, interiores y negocios. Llevamos el mismo trazo de la piel a la pared.',
    linkLabel: 'Ver murales →',
    target: SECTION_IDS.murals,
  },
]
