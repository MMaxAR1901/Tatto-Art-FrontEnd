import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  className?: string
  children: ReactNode
}

/** Antetítulo de sección: versalitas espaciadas en rojo claro. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-accent-soft m-0 text-[13px] font-semibold tracking-[0.28em] uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}
