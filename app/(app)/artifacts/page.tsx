import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { artifacts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CURRICULUM } from '@/lib/curriculum'

export default async function ArtifactsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const allArtifacts = await db.select().from(artifacts)
    .where(eq(artifacts.userId, session.user.id))
    .orderBy(artifacts.phase, artifacts.createdAt)

  const exportContent = allArtifacts.map(a => `# ${a.title}\n\n${a.content}`).join('\n\n---\n\n')

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Artifacts</h1>
          <p className="text-muted-foreground">{allArtifacts.length} deliverables</p>
        </div>
        {allArtifacts.length > 0 && (
          <a
            href={`data:text/markdown;charset=utf-8,${encodeURIComponent(exportContent)}`}
            download="launchpad-artifacts.md"
            className={buttonVariants({ variant: 'outline' })}
          >
            Export as Markdown
          </a>
        )}
      </div>

      {CURRICULUM.map(phase => {
        const phaseArtifacts = allArtifacts.filter(a => a.phase === phase.number)
        if (!phaseArtifacts.length) return null
        return (
          <div key={phase.number}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Phase {phase.number}: {phase.title}
            </h2>
            <div className="space-y-3">
              {phaseArtifacts.map(a => (
                <Card key={a.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{a.title}</CardTitle>
                      <Badge variant="outline">{a.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans line-clamp-4">{a.content}</pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {allArtifacts.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No artifacts yet.</p>
          <p className="text-sm mt-1">Complete lessons to produce your first deliverable.</p>
        </div>
      )}
    </div>
  )
}
