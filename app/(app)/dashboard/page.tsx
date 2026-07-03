import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { progress, artifacts } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { CURRICULUM, getTotalLessons } from '@/lib/curriculum'
import { ProgressMap } from '@/components/dashboard/progress-map'
import { NextLessonCard } from '@/components/dashboard/next-lesson-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')
  const userId = session.user.id

  const completedLessons = await db
    .select({ phase: progress.phase, lesson: progress.lesson })
    .from(progress).where(eq(progress.userId, userId))

  const recentArtifacts = await db.select().from(artifacts)
    .where(eq(artifacts.userId, userId))
    .orderBy(desc(artifacts.updatedAt)).limit(3)

  // Find first incomplete lesson
  let nextPhase = 1, nextLesson = 1
  outer: for (const phase of CURRICULUM) {
    for (const lesson of phase.lessons) {
      if (!completedLessons.some(c => c.phase === phase.number && c.lesson === lesson.number)) {
        nextPhase = phase.number; nextLesson = lesson.number; break outer
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground">{completedLessons.length} of {getTotalLessons()} lessons complete</p>
        </div>
        <NextLessonCard phase={nextPhase} lesson={nextLesson} />
        {recentArtifacts.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3">Recent Artifacts</h2>
            <div className="space-y-2">
              {recentArtifacts.map(a => (
                <Card key={a.id}>
                  <CardHeader className="py-3 pb-1"><CardTitle className="text-sm">{a.title}</CardTitle></CardHeader>
                  <CardContent className="pb-3"><p className="text-sm text-muted-foreground line-clamp-2">{a.content}</p></CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="font-semibold mb-3">Curriculum</h2>
        <ProgressMap completed={completedLessons} currentPhase={nextPhase} currentLesson={nextLesson} />
      </div>
    </div>
  )
}
