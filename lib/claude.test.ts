import { describe, it, expect } from 'vitest'
import { buildSystemPrompt } from './claude'

const base = {
  learnerProfile: {
    background: 'non_technical' as const,
    role: 'building_myself' as const,
    goals: ['understand deployment'],
    templateId: 'business_tool' as const,
    projectDescription: 'A CRM for my bakery to track wholesale customers',
  },
  currentPhase: 1,
  currentLesson: 1,
  priorArtifacts: [],
}

describe('buildSystemPrompt', () => {
  it('includes background', () => expect(buildSystemPrompt(base)).toContain('non_technical'))
  it('includes project description', () => expect(buildSystemPrompt(base)).toContain('bakery'))
  it('includes lesson exercise prompt', () => expect(buildSystemPrompt(base)).toContain('problem'))
  it('includes prior artifacts when present', () => {
    const prompt = buildSystemPrompt({
      ...base,
      priorArtifacts: [{ title: 'Problem Statement', content: 'We help bakeries.' }],
    })
    expect(prompt).toContain('Problem Statement')
  })
})
