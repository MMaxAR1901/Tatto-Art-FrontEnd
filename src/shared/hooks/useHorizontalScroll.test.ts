import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useHorizontalScroll } from './useHorizontalScroll'

let el: HTMLDivElement
let now = 0

function wheel(init: WheelEventInit) {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, ...init })
  el.dispatchEvent(event)
  return event
}

function swipe(from: [number, number], to: [number, number]) {
  const touch = (x: number, y: number) => ({ clientX: x, clientY: y }) as Touch
  const start = new Event('touchstart') as TouchEvent
  Object.defineProperty(start, 'touches', { value: [touch(...from)] })
  const end = new Event('touchend') as TouchEvent
  Object.defineProperty(end, 'changedTouches', { value: [touch(...to)] })
  el.dispatchEvent(start)
  el.dispatchEvent(end)
}

function setup(options = {}) {
  const onStep = vi.fn()
  const ref = { current: el }
  renderHook(() => useHorizontalScroll(ref, onStep, { stepPx: 60, lockMs: 350, ...options }))
  return onStep
}

describe('useHorizontalScroll', () => {
  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
    now = 1000
    vi.spyOn(performance, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    el.remove()
  })

  it('acumula deltaX hasta el umbral y da un paso a la derecha', () => {
    const onStep = setup()

    wheel({ deltaX: 30 })
    expect(onStep).not.toHaveBeenCalled()
    wheel({ deltaX: 30 })
    expect(onStep).toHaveBeenCalledWith(1)
  })

  it('el scroll hacia la izquierda retrocede', () => {
    const onStep = setup()
    wheel({ deltaX: -80 })
    expect(onStep).toHaveBeenCalledWith(-1)
  })

  it('ignora el scroll vertical y no bloquea la página', () => {
    const onStep = setup()
    const event = wheel({ deltaY: 200, deltaX: 10 })
    expect(onStep).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })

  it('evita el gesto del navegador en scroll horizontal', () => {
    setup()
    expect(wheel({ deltaX: 20 }).defaultPrevented).toBe(true)
  })

  it('Shift + rueda vertical cuenta como scroll lateral', () => {
    const onStep = setup()
    wheel({ deltaY: 100, shiftKey: true })
    expect(onStep).toHaveBeenCalledWith(1)
  })

  it('tras un paso ignora la inercia durante lockMs', () => {
    const onStep = setup()

    wheel({ deltaX: 100 })
    now += 200
    wheel({ deltaX: 100 })
    expect(onStep).toHaveBeenCalledTimes(1)

    now += 200
    wheel({ deltaX: 100 })
    expect(onStep).toHaveBeenCalledTimes(2)
  })

  it('un deslizamiento táctil a la izquierda avanza y a la derecha retrocede', () => {
    const onStep = setup()

    swipe([300, 200], [200, 210])
    expect(onStep).toHaveBeenLastCalledWith(1)

    swipe([100, 200], [220, 190])
    expect(onStep).toHaveBeenLastCalledWith(-1)
  })

  it('ignora toques cortos o verticales', () => {
    const onStep = setup()
    swipe([200, 200], [180, 200])
    swipe([200, 100], [150, 300])
    expect(onStep).not.toHaveBeenCalled()
  })

  it('no escucha si está deshabilitado', () => {
    const onStep = setup({ enabled: false })
    wheel({ deltaX: 200 })
    expect(onStep).not.toHaveBeenCalled()
  })
})
