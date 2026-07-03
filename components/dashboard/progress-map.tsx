import { CURRICULUM } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  completed: { phase: number; lesson: number }[]
  currentPhase: number
  currentLesson: number
}

export function ProgressMap({ completed, currentPhase, currentLesson }: Props) {
  const isDone = (p: number, l: number) => completed.some(c => c.phase === p && c.lesson === l)

  return (
    <div className="space-y-4">
      {CURRICULUM.map(phase => (
        <div key={phase.number}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Phase {phase.number}: {phase.title}
          </p>
          <div className="space-y-0.5 pl-2">
            {phase.lessons.map(lesson => {
              const done = isDone(phase.number, lesson.number)
              const current = phase.number === currentPhase && lesson.number === currentLesson
              return (
                <Link key={lesson.number} href={`/learn/${phase.number}/${lesson.number}`}
                  className={cn(
                    'block text-sm py-1 px-2 rounded hover:bg-muted transition-colors',
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
