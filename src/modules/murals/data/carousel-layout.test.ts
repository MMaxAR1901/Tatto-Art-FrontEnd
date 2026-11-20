import { describe, expect, it } from 'vitest'
import { computeSpineLayout } from './carousel-layout'

describe('computeSpineLayout', () => {
  it('centra la portada seleccionada sin escala ni desplazamiento', () => {
    expect(computeSpineLayout(0)).toEqual({
      offset: 0,
      isCenter: true,
      x: 0,
      scale: 1,
      zIndex: 60,
      hidden: false,
    })
  })

  it('separa los lomos con x = sign·(260 + (|d|−1)·96)', () => {
    expect(computeSpineLayout(1).x).toBe(260)
    expect(computeSpineLayout(-1).x).toBe(-260)
    expect(computeSpineLayout(3).x).toBe(260 + 2 * 96)
    expect(computeSpineLayout(-6).x).toBe(-(260 + 5 * 96))
  })

  it('reduce la escala 0.065 por posición y apila hacia el centro', () => {
    expect(computeSpineLayout(2).scale).toBeCloseTo(1 - 2 * 0.065)
    expect(computeSpineLayout(-4).scale).toBeCloseTo(1 - 4 * 0.065)
    expect(computeSpineLayout(1).zIndex).toBe(49)
    expect(computeSpineLayout(-5).zIndex).toBe(45)
  })

  it('oculta los lomos más allá de |d| > 6', () => {
    expect(computeSpineLayout(6).hidden).toBe(false)
    expect(computeSpineLayout(7).hidden).toBe(true)
    expect(computeSpineLayout(-11).hidden).toBe(true)
  })
})
