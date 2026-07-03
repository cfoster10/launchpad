import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { learnerProfiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard'

export default async function OnboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')
  const [profile] = await db.select().from(learnerProfiles)
    .where(eq(learnerProfiles.userId, session.user.id)).limit(1)
  if (profile) redirect('/dashboard')
  return <OnboardingWizard />
}
