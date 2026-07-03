import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { artifacts, progress } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 })
  const rows = await db.select().from(artifacts)
    .where(eq(artifacts.userId, session.user.id))
    .orderBy(artifacts.phase, artifacts.createdAt)
  return Response.json(rows)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 })

  const { phase, lesson, type, title, content } = await req.json() as {
    phase: number; lesson: number; type: string; title: string; content: string
  }

  const [artifact] = await db.insert(artifacts)
    .values({ userId: session.user.id, phase, lesson, type, title, content })
    .returning()

  // Mark lesson complete
  const [existingProgress] = await db.select().from(progress)
    .where(and(
      eq(progress.userId, session.user.id),
      eq(progress.phase, phase),
      eq(progress.lesson, lesson),
    )).limit(1)

  if (existingProgress) {
    await db.update(progress)
      .set({ completedAt: new Date(), updatedAt: new Date() })
      .where(eq(progress.id, existingProgress.id))
  } else {
    await db.insert(progress)
      .values({ userId: session.user.id, phase, lesson, completedAt: new Date() })
  }

  return Response.json(artifact)
}
