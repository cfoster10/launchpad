import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { getLesson, getPhase } from '@/lib/curriculum'
import Link from 'next/link'

export function NextLessonCard({ phase, lesson }: { phase: number; lesson: number }) {
  const p = getPhase(phase)
  const l = getLesson(phase, lesson)
  if (!p || !l) return null
  return (
    <Card>
      <CardHeader>
        <CardDescription>Up next — Phase {phase}: {p.title}</CardDescription>
        <CardTitle>{l.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/learn/${phase}/${lesson}`} className={buttonVariants()}>Continue →</Link>
      </CardContent>
    </Card>
  )
}
