import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Sin `globals: true`, Testing Library no desmonta solo: lo hacemos tras cada prueba.
afterEach(() => {
  cleanup()
})
