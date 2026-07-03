'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import type { Lesson, Phase } from '@/lib/curriculum'

interface Props {
  phase: Phase
  lesson: Lesson
  onSaveArtifact: (content: string) => Promise<void>
  existingArtifact?: string
}

export function LessonPanel({ phase, lesson, onSaveArtifact, existingArtifact }: Props) {
  const [content, setContent] = useState(existingArtifact ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(!!existingArtifact)

  async function handleSave() {
    setSaving(true)
    await onSaveArtifact(content)
    setSaved(true)
    setSaving(false)
  }

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Phase {phase.number}: {phase.title}</p>
        <h1 className="text-2xl font-bold mt-1">{lesson.title}</h1>
      </div>
      <Card className="bg-muted/40">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Deliverable</CardTitle></CardHeader>
        <CardContent><p className="text-sm">{lesson.artifactTitle}</p></CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        Work through the exercise in the Claude chat panel →. When ready, write your artifact below.
      </p>
      <div className="space-y-3">
        <label className="text-sm font-medium">{lesson.artifactTitle}</label>
        <Textarea rows={12} value={content}
          onChange={e => { setContent(e.target.value); setSaved(false) }}
          placeholder="Work through the exercise with Claude, then write your artifact here..."
          className="font-mono text-sm"
        />
        <Button onClick={handleSave} disabled={saving || !content.trim() || saved}>
          {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save & Complete Lesson'}
        </Button>
      </div>
    </div>
  )
}
