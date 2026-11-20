import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  as?: ElementType
  id?: string
  className?: string
  'aria-label'?: string
  children: ReactNode
}

/** Ancho máximo (1280px) y margen lateral estándar del diseño (24px). */
export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto box-border w-full max-w-[1280px] px-6', className)} {...rest}>
      {children}
    </Tag>
  )
}
