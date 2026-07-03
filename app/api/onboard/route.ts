import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { learnerProfiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 })

  const body = await req.json() as {
    background: 'non_technical' | 'some_coding' | 'developer'
    role: 'building_myself' | 'leading_team' | 'learning'
    goals: string[]
    templateId: 'business_tool' | 'ecommerce' | 'community' | 'saas' | 'custom'
    projectDescription: string
  }

  const [existing] = await db.select().from(learnerProfiles)
    .where(eq(learnerProfiles.userId, session.user.id)).limit(1)

  if (existing) {
    await db.update(learnerProfiles).set(body).where(eq(learnerProfiles.id, existing.id))
  } else {
    await db.insert(learnerProfiles).values({ userId: session.user.id, ...body })
  }

  return Response.json({ ok: true })
}
