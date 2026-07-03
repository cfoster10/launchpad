// lib/curriculum.test.ts
import { describe, it, expect } from 'vitest'
import { CURRICULUM, getPhase, getLesson, getTotalLessons } from './curriculum'

describe('curriculum', () => {
  it('has 6 phases', () => expect(CURRICULUM).toHaveLength(6))
  it('each phase has 3+ lessons', () => {
    CURRICULUM.forEach(p => expect(p.lessons.length).toBeGreaterThanOrEqual(3))
  })
  it('every lesson has required fields', () => {
    CURRICULUM.forEach(p => p.lessons.forEach(l => {
      expect(l.title).toBeTruthy()
      expect(l.exercisePrompt).toBeTruthy()
      expect(l.artifactTitle).toBeTruthy()
    }))
  })
  it('getPhase(1) returns Planning', () => expect(getPhase(1)?.title).toBe('Planning'))
  it('getLesson(1,1) returns a lesson', () => expect(getLesson(1, 1)?.title).toBeTruthy())
  it('getTotalLessons is > 0', () => expect(getTotalLessons()).toBeGreaterThan(0))
})
