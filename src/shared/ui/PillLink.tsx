import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type PillVariant = 'accent' | 'outline' | 'bone'
export type PillSize = 'sm' | 'md' | 'lg' | 'xl'

const VARIANTS: Record<PillVariant, string> = {
  accent: 'bg-accent text-white hover:bg-[#b3001b]',
  outline: 'border border-bone text-bone hover:bg-bone hover:text-ink',
  bone: 'bg-bone text-ink hover:bg-white',
}

const SIZES: Record<PillSize, string> = {
  sm: 'min-h-11 px-5',
  md: 'min-h-12 px-6',
  lg: 'min-h-[52px] px-7',
  xl: 'min-h-[60px] px-7 text-[17px] font-bold',
}

interface PillLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: PillVariant
  size?: PillSize
  /** Abre en otra pestaña con `rel="noopener noreferrer"` (WhatsApp, Instagram). */
  external?: boolean
  children: ReactNode
}

/** Enlace con forma de píldora: CTAs del diseño ("Cotizar", "Ver galería", WhatsApp…). */
export function PillLink({
  variant = 'accent',
  size = 'lg',
  external,
  className,
  children,
  ...rest
}: PillLinkProps) {
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-full font-semibold no-underline transition-colors duration-200',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
    </a>
  )
}
