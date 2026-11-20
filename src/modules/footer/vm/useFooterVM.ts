import { CONTACT } from '@/shared/config/contact.config'
import { FOOTER_LINKS } from '../data/footer.data'

/** Footer: wordmark grabado, copyright y enlaces de sección. */
export function useFooterVM() {
  const { name, tagline } = CONTACT.studio
  return {
    wordmark: name,
    copyright: `© ${CONTACT.copyrightYear} ${name} · ${tagline}`,
    links: FOOTER_LINKS,
  }
}

export type FooterVM = ReturnType<typeof useFooterVM>
