import { describe, it, expect, vi } from 'vitest'

// Mock next-auth and its dependencies so we can import lib/auth in a node test env
// without resolving Next.js server internals (next/server is not available in vitest node env)
vi.mock('next-auth', () => ({
  default: (config: unknown) => ({
    handlers: { GET: vi.fn(), POST: vi.fn() },
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  }),
}))

vi.mock('@auth/drizzle-adapter', () => ({
  DrizzleAdapter: vi.fn(() => ({})),
}))

vi.mock('./db', () => ({
  db: {},
}))

vi.mock('./db/schema', () => ({
  users: {},
  accounts: {},
  sessions: {},
  verificationTokens: {},
}))

describe('auth', () => {
  it('exports auth handler', async () => {
    const mod = await import('./auth')
    expect(mod.auth).toBeDefined()
    expect(mod.handlers).toBeDefined()
  })
})
