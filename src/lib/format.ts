/** Número con dos dígitos: 3 → "03". */
export function pad2(n: number) {
  return String(n).padStart(2, '0')
}

/** Contador "03 / 12" a partir de una posición base 0. */
export function formatCounter(index: number, total: number) {
  return `${pad2(index + 1)} / ${pad2(total)}`
}

/** Índice circular: wrapIndex(-1, 12) → 11. */
export function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

/** Limita un índice al rango [0, length - 1]. */
export function clampIndex(index: number, length: number) {
  if (length <= 0) return 0
  return Math.min(Math.max(index, 0), length - 1)
}
