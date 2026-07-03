'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { ONBOARDING_STEPS } from './steps'
import { cn } from '@/lib/utils'

interface FormState {
  background: string
  role: string
  templateId: string
  projectDescription: string
  goals: string[]
}

const GOAL_OPTIONS = [
  'Understand how to plan a software project',
  'Learn how the tech stack fits together',
  'Know how to deploy and manage an app',
  'Be able to lead a development team',
  'Build and ship a real product',
  'All of the above',
]

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Partial<FormState>>({})
  const [loading, setLoading] = useState(false)

  const progress = ((step + 1) / 5) * 100

  async function handleFinish() {
    setLoading(true)
    await fetch('/api/onboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        goals: form.goals?.length ? form.goals : ['understand the full development process'],
      }),
    })
    router.push('/dashboard')
  }

  // Steps 0–2: multiple choice
  if (step < 3) {
    const s = ONBOARDING_STEPS[step]
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <Progress value={progress} className="w-full max-w-lg" />
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{s.question}</CardTitle>
            <CardDescription>{s.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {s.options.map(opt => (
              <button key={opt.value}
                onClick={() => { setForm(f => ({ ...f, [s.id]: opt.value })); setStep(step + 1) }}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-colors hover:border-primary',
                  (form as Record<string, string>)[s.id] === opt.value ? 'border-primary bg-primary/5' : 'border-border'
                )}
              >
                <div className="font-medium">{opt.label}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{opt.description}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 3: project description
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <Progress value={progress} className="w-full max-w-lg" />
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Describe your project</CardTitle>
            <CardDescription>2–3 sentences is plenty. What is it, who is it for, what problem does it solve?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea rows={4}
              placeholder="e.g. A CRM for my bakery to track wholesale customers, their order history, and follow-up reminders."
              value={form.projectDescription ?? ''}
              onChange={e => setForm(f => ({ ...f, projectDescription: e.target.value }))}
            />
            <Button className="w-full" disabled={!form.projectDescription?.trim()}
              onClick={() => setStep(4)}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Step 4: goals
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <Progress value={100} className="w-full max-w-lg" />
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>What do you most want to understand?</CardTitle>
          <CardDescription>Pick everything that applies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {GOAL_OPTIONS.map(goal => {
            const selected = (form.goals ?? []).includes(goal)
            return (
              <button key={goal}
                onClick={() => setForm(f => ({
                  ...f,
                  goals: selected ? (f.goals ?? []).filter(g => g !== goal) : [...(f.goals ?? []), goal],
                }))}
                className={cn(
                  'w-full text-left p-3 rounded-lg border-2 text-sm transition-colors hover:border-primary',
                  selected ? 'border-primary bg-primary/5 font-medium' : 'border-border'
                )}
              >
                {goal}
              </button>
            )
          })}
          <Button className="w-full mt-2" disabled={loading || !(form.goals ?? []).length}
            onClick={handleFinish}>
            {loading ? 'Setting up your course...' : 'Start Learning →'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
