import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MURALS } from '@/modules/murals'
import { TATTOOS } from '@/modules/tattoos'
import { useHomeVM } from './useHomeVM'

describe('useHomeVM', () => {
  it('la galería abre el modal con la pieza tocada', () => {
    const { result } = renderHook(() => useHomeVM())

    act(() => result.current.tattoos.open(4))

    expect(result.current.preview.kind).toBe('tattoo')
    expect(result.current.preview.item?.title).toBe(TATTOOS[4].title)
    expect(result.current.preview.counter).toBe(`05 / ${TATTOOS.length}`)
  })

  it('la portada del carrusel abre el modal y navegar murales mueve el carrusel', () => {
    const { result } = renderHook(() => useHomeVM())
    const start = result.current.murals.selected

    act(() => result.current.murals.activate(start))
    expect(result.current.preview.kind).toBe('mural')
    expect(result.current.preview.item?.title).toBe(MURALS[start].title)

    act(() => result.current.preview.next())
    expect(result.current.murals.selected).toBe(start + 1)

    act(() => result.current.preview.prev())
    act(() => result.current.preview.prev())
    expect(result.current.murals.selected).toBe(start - 1)
  })

  it('navegar tatuajes en el modal no mueve el carrusel de murales', () => {
    const { result } = renderHook(() => useHomeVM())
    const start = result.current.murals.selected

    act(() => result.current.tattoos.open(0))
    act(() => result.current.preview.next())
    expect(result.current.murals.selected).toBe(start)
  })
})
