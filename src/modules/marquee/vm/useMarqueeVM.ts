import { useMemo } from 'react'
import { MARQUEE_SEPARATOR } from '../data/marquee.data'

export interface MarqueeToken {
  key: string
  text: string
  separator: boolean
}

/**
 * Marquesina infinita: intercala separadores y duplica la secuencia para que la animación
 * (`translateX(-50%)`) se repita sin corte.
 */
export function useMarqueeVM(words: string[], separator: string = MARQUEE_SEPARATOR) {
  const tokens = useMemo<MarqueeToken[]>(() => {
    const sequence = words.flatMap((word) => [word, separator])
    return [...sequence, ...sequence].map((text, i) => ({
      key: `${i}-${text}`,
      text,
      separator: i % 2 === 1,
    }))
  }, [words, separator])

  return { tokens, label: words.join(', ') }
}

export type MarqueeVM = ReturnType<typeof useMarqueeVM>
