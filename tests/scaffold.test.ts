// Scaffold smoke test — verifies project structure is set up correctly
import { describe, it, expect } from 'vitest'

describe('scaffold', () => {
  it('should be configured with node environment', () => {
    expect(typeof process).toBe('object')
  })
})
