/**
 * Configuración central de contacto de TATTO ART.
 * Único lugar donde viven teléfono, WhatsApp, Instagram, dirección y horario:
 * los componentes los obtienen de aquí (vía su ViewModel y `@/lib/contact-links`).
 * Los valores entre corchetes son marcadores del diseño: reemplázalos por los reales.
 */
export const CONTACT = {
  studio: {
    name: 'TATTO ART',
    tagline: 'Tattoo, Piercing & Murales',
    /** Zona que aparece en el hero. */
    city: 'Zacatepec, Morelos / Michoacán',
  },
  phone: {
    /** Formato E.164 para enlaces `tel:`. */
    e164: '+527341375590',
    display: '+52 734 137 5590',
  },
  whatsapp: {
    /** Número internacional sin "+" para `wa.me`. */
    number: '527341375590',
    messages: {
      quote: 'Hola, quiero cotizar un trabajo',
      design: 'Hola, me interesa este diseño',
    },
    responseTime: '[TIEMPO DE RESPUESTA]',
  },
  instagram: {
    user: 'jose_acencio23',
  },
  /** Líneas de ubicación de la sección de contacto (agrega la calle cuando la tengas). */
  location: ['Zacatepec, Morelos', 'Michoacán'],
  hours: {
    days: '[DÍAS]',
    time: '[HORARIO]',
    note: 'Con cita previa',
  },
  /** Año del copyright del footer. */
  copyrightYear: '[AÑO]',
} as const

export type ContactConfig = typeof CONTACT
