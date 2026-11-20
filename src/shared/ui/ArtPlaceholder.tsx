import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Artwork } from '@/shared/model/media.types'
import { artPatternClass } from './art-pattern'

interface ArtPlaceholderProps {
  art: Artwork
  /** Texto alternativo cuando hay foto real. */
  alt: string
  /** Leyenda del marcador mientras no hay foto, p. ej. "[Foto]". */
  placeholder?: string
  className?: string
  placeholderClassName?: string
  children?: ReactNode
}

/**
 * Superficie de imagen: muestra la foto (`art.image`) o, si aún no existe, el patrón del diseño
 * con su leyenda. `children` se pinta encima (badges, pies de foto…).
 */
export function ArtPlaceholder({
  art,
  alt,
  placeholder = '[Foto]',
  className,
  placeholderClassName,
  children,
}: ArtPlaceholderProps) {
  return (
    <div className={cn('relative overflow-hidden', artPatternClass(art.pattern), className)}>
      {art.image ? (
        <img
          src={art.image}
          alt={art.alt ?? alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span
          className={cn(
            'text-dim absolute inset-0 flex items-center justify-center text-xs tracking-[0.2em] uppercase',
            placeholderClassName,
          )}
        >
          {placeholder}
        </span>
      )}
      {children}
    </div>
  )
}
