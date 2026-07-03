import { CURRICULUM } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  currentPhase: number
  currentLesson: number
  completed: { phase: number; lesson: number }[]
}

export function CurriculumSidebar({ currentPhase, currentLesson, completed }: Props) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <Link href="/dashboard" className="text-xs text-muted-foreground hover:underline">← Dashboard</Link>
      {CURRICULUM.map(phase => (
        <div key={phase.number}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {phase.title}
          </p>
          <div className="space-y-0.5">
            {phase.lessons.map(lesson => {
              const done = completed.some(c => c.phase === phase.number && c.lesson === lesson.number)
              const current = phase.number === currentPhase && lesson.number === currentLesson
              return (
                <Link key={lesson.number} href={`/learn/${phase.number}/${lesson.number}`}
                  className={cn(
                    'block text-xs py-1 px-2 rounded hover:bg-muted transition-colors',
                    done && 'text-muted-foreground line-through',
                    current && 'bg-primary/10 text-primary font-medium'
                  )}>
                  {done ? '✓' : current ? '→' : '○'} {lesson.title}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
