import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { conversations, progress, artifacts } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { getLesson, getPhase } from '@/lib/curriculum'
import { CurriculumSidebar } from '@/components/learn/curriculum-sidebar'
import { LessonPanel } from '@/components/learn/lesson-panel'
import { ClaudeChat } from '@/components/learn/claude-chat'
import { revalidatePath } from 'next/cache'

interface Props { params: Promise<{ phase: string; lesson: string }> }

export default async function LearnPage({ params }: Props) {
  const { phase: phaseStr, lesson: lessonStr } = await params
  const phase = parseInt(phaseStr)
  const lesson = parseInt(lessonStr)

  const phaseData = getPhase(phase)
  const lessonData = getLesson(phase, lesson)
  if (!phaseData || !lessonData) notFound()

  const session = await auth()
  if (!session?.user?.id) redirect('/login')
  const userId = session.user.id

  const [convo] = await db.select().from(conversations)
    .where(and(eq(conversations.userId, userId), eq(conversations.phase, phase), eq(conversations.lesson, lesson)))
    .limit(1)

  const completedLessons = await db
    .select({ phase: progress.phase, lesson: progress.lesson })
    .from(progress).where(eq(progress.userId, userId))

  const [existingArtifact] = await db.select().from(artifacts)
    .where(and(eq(artifacts.userId, userId), eq(artifacts.phase, phase), eq(artifacts.lesson, lesson)))
    .limit(1)

  async function saveArtifact(content: string) {
    'use server'
    const s = await auth()
    if (!s?.user?.id) return
    const existing = await db.select().from(artifacts)
      .where(and(eq(artifacts.userId, s.user.id), eq(artifacts.phase, phase), eq(artifacts.lesson, lesson)))
      .limit(1)
    if (existing[0]) {
      await db.update(artifacts).set({ content, updatedAt: new Date() }).where(eq(artifacts.id, existing[0].id))
    } else {
      await db.insert(artifacts).values({
        userId: s.user.id, phase, lesson,
        type: lessonData!.artifactType,
        title: lessonData!.artifactTitle,
        content,
      })
    }
    // Mark complete
    const existingProgress = await db.select().from(progress)
      .where(and(eq(progress.userId, s.user.id), eq(progress.phase, phase), eq(progress.lesson, lesson)))
      .limit(1)
    if (existingProgress[0]) {
      await db.update(progress).set({ completedAt: new Date(), updatedAt: new Date() }).where(eq(progress.id, existingProgress[0].id))
    } else {
      await db.insert(progress).values({ userId: s.user.id, phase, lesson, completedAt: new Date() })
    }
    revalidatePath('/dashboard')
  }

  return (
    <div className="h-[calc(100vh-49px)] grid grid-cols-[200px_1fr_340px]">
      <div className="border-r overflow-hidden">
        <CurriculumSidebar currentPhase={phase} currentLesson={lesson} completed={completedLessons} />
      </div>
      <div className="border-r overflow-hidden">
        <LessonPanel phase={phaseData} lesson={lessonData} onSaveArtifact={saveArtifact} existingArtifact={existingArtifact?.content} />
      </div>
      <div className="overflow-hidden">
        <ClaudeChat phase={phase} lesson={lesson}
          initialMessages={(convo?.messages as { role: 'user' | 'assistant'; content: string }[]) ?? []}
        />
      </div>
    </div>
  )
}
