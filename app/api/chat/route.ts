import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { learnerProfiles, conversations, artifacts } from '@/lib/db/schema'
import { buildSystemPrompt } from '@/lib/claude'
import { eq, and } from 'drizzle-orm'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 })

  const { messages, phase, lesson } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
    phase: number
    lesson: number
  }

  const userId = session.user.id

  const [profile] = await db.select().from(learnerProfiles)
    .where(eq(learnerProfiles.userId, userId)).limit(1)
  if (!profile) return new Response('Complete onboarding first', { status: 404 })

  const priorArtifacts = await db
    .select({ title: artifacts.title, content: artifacts.content })
    .from(artifacts).where(eq(artifacts.userId, userId))

  const systemPrompt = buildSystemPrompt({
    learnerProfile: {
      background: profile.background,
      role: profile.role,
      goals: profile.goals,
      templateId: profile.templateId,
      projectDescription: profile.projectDescription,
    },
    currentPhase: phase,
    currentLesson: lesson,
    priorArtifacts,
  })

  // Persist incoming message
  const [existing] = await db.select().from(conversations)
    .where(and(
      eq(conversations.userId, userId),
      eq(conversations.phase, phase),
      eq(conversations.lesson, lesson),
    )).limit(1)

  const prevMessages = (existing?.messages ?? []) as typeof messages
  const allMessages = [...prevMessages, messages[messages.length - 1]]

  if (existing) {
    await db.update(conversations)
      .set({ messages: allMessages, updatedAt: new Date() })
      .where(eq(conversations.id, existing.id))
  } else {
    await db.insert(conversations).values({ userId, phase, lesson, messages: allMessages })
  }

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: systemPrompt,
    messages,
    async onFinish({ text }) {
      await db.update(conversations)
        .set({
          messages: [...allMessages, { role: 'assistant', content: text }],
          updatedAt: new Date(),
        })
        .where(and(
          eq(conversations.userId, userId),
          eq(conversations.phase, phase),
          eq(conversations.lesson, lesson),
        ))
    },
  })

  return result.toTextStreamResponse()
}
