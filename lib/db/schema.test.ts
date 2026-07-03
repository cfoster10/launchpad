import { describe, it, expect } from 'vitest'
import { users, learnerProfiles, progress, artifacts, conversations } from './schema'

describe('schema', () => {
  it('users has id and email', () => {
    expect(users.id).toBeDefined()
    expect(users.email).toBeDefined()
  })
  it('learnerProfiles references userId', () => {
    expect(learnerProfiles.userId).toBeDefined()
  })
  it('artifacts has content column', () => {
    expect(artifacts.content).toBeDefined()
  })
  it('conversations has messages jsonb', () => {
    expect(conversations.messages).toBeDefined()
  })
})
