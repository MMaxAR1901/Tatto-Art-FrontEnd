import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { PreviewCollections, PreviewItem } from '../model/preview.types'
import { usePreviewModalVM } from './usePreviewModalVM'

const item = (id: string, extra: Partial<PreviewItem> = {}): PreviewItem => ({
  id,
  title: `Pieza ${id}`,
  subtitle: 'Black & Grey',
  art: { pattern: 'lines' },
  whatsappMessage: `Hola, me interesa ${id}`,
  ...extra,
})

const COLLECTIONS: PreviewCollections = {
  tattoo: {
    label: 'Tatuaje',
    items: Array.from({ length: 12 }, (_, i) => item(`t${i}`, { available: i === 3 })),
  },
  mural: { label: 'Mural', items: [item('m0'), item('m1'), item('m2')] },
}

function setup(onNavigate = vi.fn()) {
  const hook = renderHook(() => usePreviewModalVM(COLLECTIONS, { onNavigate }))
  return { ...hook, onNavigate }
}

const press = (key: string) =>
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  })

describe('usePreviewModalVM', () => {
  it('empieza cerrado', () => {
    const { result } = setup()
    expect(result.current.isOpen).toBe(false)
    expect(result.current.item).toBeNull()
    expect(result.current.counter).toBe('')
  })

  it('abre una pieza con su tipo, contador, badge y CTA de WhatsApp', () => {
    const { result } = setup()

    act(() => result.current.open('tattoo', 2))

    expect(result.current.isOpen).toBe(true)
    expect(result.current.kind).toBe('tattoo')
    expect(result.current.typeLabel).toBe('Tatuaje')
    expect(result.current.counter).toBe('03 / 12')
    expect(result.current.item?.id).toBe('t2')
    expect(result.current.item?.available).toBe(false)
    expect(result.current.whatsappUrl).toContain('https://wa.me/')
    expect(result.current.whatsappUrl).toContain(encodeURIComponent('Hola, me interesa t2'))

    act(() => result.current.open('tattoo', 3))
    expect(result.current.item?.available).toBe(true)
  })

  it('navega en círculo con siguiente / anterior', () => {
    const { result } = setup()

    act(() => result.current.open('tattoo', 11))
    act(() => result.current.next())
    expect(result.current.index).toBe(0)
    expect(result.current.counter).toBe('01 / 12')

    act(() => result.current.prev())
    act(() => result.current.prev())
    expect(result.current.index).toBe(10)
  })

  it('cada colección navega sólo entre sus piezas', () => {
    const { result } = setup()

    act(() => result.current.open('mural', 2))
    expect(result.current.typeLabel).toBe('Mural')
    expect(result.current.counter).toBe('03 / 03')

    act(() => result.current.next())
    expect(result.current.item?.id).toBe('m0')
  })

  it('notifica cada cambio de pieza (para sincronizar el carrusel)', () => {
    const { result, onNavigate } = setup()

    act(() => result.current.open('mural', 1))
    act(() => result.current.next())

    expect(onNavigate).toHaveBeenNthCalledWith(1, { kind: 'mural', index: 1 })
    expect(onNavigate).toHaveBeenNthCalledWith(2, { kind: 'mural', index: 2 })
  })

  it('limita un índice fuera de rango al abrir', () => {
    const { result } = setup()
    act(() => result.current.open('mural', 40))
    expect(result.current.index).toBe(2)
  })

  it('se cierra con close()', () => {
    const { result } = setup()
    act(() => result.current.open('tattoo', 0))
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })

  it('responde a Esc y a las flechas sólo mientras está abierto', () => {
    const { result, onNavigate } = setup()

    press('ArrowRight')
    expect(onNavigate).not.toHaveBeenCalled()

    act(() => result.current.open('tattoo', 5))
    press('ArrowRight')
    expect(result.current.index).toBe(6)
    press('ArrowLeft')
    press('ArrowLeft')
    expect(result.current.index).toBe(4)

    press('Escape')
    expect(result.current.isOpen).toBe(false)
  })

  it('bloquea el scroll del body mientras está abierto', () => {
    const { result } = setup()

    act(() => result.current.open('tattoo', 0))
    expect(document.body.style.overflow).toBe('hidden')

    act(() => result.current.close())
    expect(document.body.style.overflow).toBe('')
  })
})
