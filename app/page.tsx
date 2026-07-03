import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 flex items-center justify-between border-b">
        <span className="font-bold text-lg">Launchpad</span>
        <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'sm' })}>Sign in</Link>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            From idea to shipped product,<br />guided by AI.
          </h1>
          <p className="text-xl text-muted-foreground">
            Launchpad teaches you how to plan, build, deploy, and manage a real software project —
            with Claude as your personal tutor, every step of the way.
          </p>
        </div>
        <Link href="/login" className={buttonVariants({ size: 'lg' })}>Start for free →</Link>
        <div className="grid grid-cols-3 gap-6 max-w-2xl text-left mt-4">
          {[
            { title: 'Project-first learning', desc: 'Every lesson applies directly to your project. No generic examples.' },
            { title: 'Adapts to you', desc: 'Tell us your background and role. Explanations match your level.' },
            { title: 'Real deliverables', desc: 'Leave with a project brief, architecture doc, and a live deployed product.' },
          ].map(f => (
            <div key={f.title} className="space-y-1">
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
