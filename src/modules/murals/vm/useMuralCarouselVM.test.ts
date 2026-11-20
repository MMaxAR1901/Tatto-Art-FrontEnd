import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MURALS } from '../data/murals.data'
import { useMuralCarouselVM } from './useMuralCarouselVM'

describe('useMuralCarouselVM', () => {
  it('arranca en el índice inicial con la portada al centro', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 4 }))

    expect(result.current.selected).toBe(4)
    expect(result.current.current?.id).toBe(MURALS[4].id)
    expect(result.current.spines[4].layout.isCenter).toBe(true)
    expect(result.current.spines[5].layout.x).toBe(260)
    expect(result.current.spines[3].layout.x).toBe(-260)
    expect(result.current.spines[4].label).toBe(`Ver mural ${MURALS[4].title} en grande`)
    expect(result.current.spines[0].label).toBe(`Mural 01: ${MURALS[0].title}`)
  })

  it('limita el índice inicial al rango de murales', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 99 }))
    expect(result.current.selected).toBe(MURALS.length - 1)
  })

  it('no expone selección por hover', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS))
    expect(result.current).not.toHaveProperty('hover')
  })

  it('step() avanza y retrocede un mural por paso', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 4 }))

    act(() => result.current.step(1))
    expect(result.current.selected).toBe(5)

    act(() => {
      result.current.step(1)
      result.current.step(1)
    })
    expect(result.current.selected).toBe(7)

    act(() => result.current.step(-1))
    expect(result.current.selected).toBe(6)
  })

  it('se detiene en los extremos y lo indica con canPrev / canNext', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 0 }))

    expect(result.current.canPrev).toBe(false)
    act(() => result.current.step(-1))
    expect(result.current.selected).toBe(0)

    act(() => result.current.select(MURALS.length - 1))
    expect(result.current.canNext).toBe(false)
    act(() => result.current.step(1))
    expect(result.current.selected).toBe(MURALS.length - 1)
    expect(result.current.canPrev).toBe(true)
  })

  it('clic en un lomo lo selecciona; clic en la portada abre el modal', () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 4, onOpen }))

    act(() => result.current.activate(8))
    expect(result.current.selected).toBe(8)
    expect(onOpen).not.toHaveBeenCalled()

    act(() => result.current.activate(8))
    expect(onOpen).toHaveBeenCalledWith(8)
  })

  it('"Ver en grande" abre el mural seleccionado', () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 3, onOpen }))

    act(() => result.current.open())
    expect(onOpen).toHaveBeenCalledWith(3)
  })

  it('select() mueve el carrusel y oculta los lomos lejanos', () => {
    const { result } = renderHook(() => useMuralCarouselVM(MURALS, { initialIndex: 4 }))

    act(() => result.current.select(10))
    expect(result.current.selected).toBe(10)
    expect(result.current.spines[3].layout.hidden).toBe(true)
  })
})
