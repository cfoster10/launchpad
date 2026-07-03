import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { learnerProfiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')
  const [profile] = await db.select().from(learnerProfiles)
    .where(eq(learnerProfiles.userId, session.user.id)).limit(1)
  if (!profile) redirect('/onboard')

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b px-6 py-3 flex items-center justify-between">
        <span className="font-bold">Launchpad</span>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/artifacts" className="hover:underline">Artifacts</Link>
          <span className="text-muted-foreground">{session.user.email}</span>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
