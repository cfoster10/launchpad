export type ArtifactType = 'brief' | 'architecture' | 'tech_stack' | 'deployment' | 'playbook' | 'other'

export interface Lesson {
  number: number
  title: string
  exercisePrompt: string
  artifactType: ArtifactType
  artifactTitle: string
}

export interface Phase {
  number: number
  title: string
  description: string
  phaseDeliverable: string
  lessons: Lesson[]
}

export const CURRICULUM: Phase[] = [
  {
    number: 1,
    title: 'Planning',
    description: 'Define what you\'re building and why.',
    phaseDeliverable: 'One-page project brief',
    lessons: [
      {
        number: 1,
        title: 'What problem are you solving?',
        exercisePrompt: `Ask the learner to describe the problem their project solves in plain language. Help them identify: who has this problem, how they currently deal with it, and why a software solution makes sense. Guide them to write a clear one-sentence problem statement for their specific project.`,
        artifactType: 'brief',
        artifactTitle: 'Problem Statement',
      },
      {
        number: 2,
        title: 'Who are your users?',
        exercisePrompt: `Guide the learner to identify 2–3 types of people who will use their product. For each: what is their role, what do they want to accomplish, what frustrates them today? Keep it concrete — real people they can picture, not abstract "users". Frame this around their specific project.`,
        artifactType: 'brief',
        artifactTitle: 'User Personas',
      },
      {
        number: 3,
        title: 'What does it need to do?',
        exercisePrompt: `Help the learner create a prioritized feature list for their project. Start by brainstorming everything it might do, then apply MoSCoW (Must / Should / Could / Won't) to narrow to a realistic MVP. Emphasize ruthless cutting — the first version should do one thing really well.`,
        artifactType: 'brief',
        artifactTitle: 'Feature List (MoSCoW)',
      },
      {
        number: 4,
        title: 'What does success look like?',
        exercisePrompt: `Ask: how will you know if this worked? Help the learner define 2–3 measurable goals — not "users love it" but specific, countable outcomes. Then help them combine everything from this phase into a one-page project brief.`,
        artifactType: 'brief',
        artifactTitle: 'Project Brief',
      },
    ],
  },
  {
    number: 2,
    title: 'System Design',
    description: 'Map out the moving parts before writing a line of code.',
    phaseDeliverable: 'Architecture diagram + data model sketch',
    lessons: [
      {
        number: 1,
        title: 'How do users interact with it?',
        exercisePrompt: `Walk the learner through their product's core user flows. For each main action a user takes, trace the path: what screen are they on, what do they click, what happens next? Focus on 2–3 critical flows for their MVP.`,
        artifactType: 'architecture',
        artifactTitle: 'User Flows',
      },
      {
        number: 2,
        title: 'What are the moving parts?',
        exercisePrompt: `Introduce frontend, backend, and database as distinct layers — no jargon, use analogies. Help the learner map their specific product: what pages exist (frontend), what business logic needs a server (backend), what data needs saving (database). Add any external services they need.`,
        artifactType: 'architecture',
        artifactTitle: 'System Components',
      },
      {
        number: 3,
        title: 'How does data flow between them?',
        exercisePrompt: `Pick one of their user flows and trace how data moves end-to-end: user clicks → frontend sends request → backend processes → database stores → response returns → UI updates. Make every step concrete to their project.`,
        artifactType: 'architecture',
        artifactTitle: 'Data Flow Diagram',
      },
      {
        number: 4,
        title: 'What does your data look like?',
        exercisePrompt: `Help the learner sketch their data model. What are the main "things" their app stores? For each, what attributes does it have? How do they relate? No SQL needed — named boxes with fields and arrows showing relationships. Ground every example in their project.`,
        artifactType: 'architecture',
        artifactTitle: 'Data Model',
      },
    ],
  },
  {
    number: 3,
    title: 'Tech Stack & Setup',
    description: 'Choose your tools and get your environment ready.',
    phaseDeliverable: 'Tech stack decision doc + initialized repo',
    lessons: [
      {
        number: 1,
        title: 'Choosing your stack',
        exercisePrompt: `Explain what a "tech stack" is. Walk through the main categories (frontend framework, backend, database, auth, hosting) and explain tradeoffs for 2–3 options in each. Then help the learner make concrete, reasoned choices for their specific project.`,
        artifactType: 'tech_stack',
        artifactTitle: 'Tech Stack Decisions',
      },
      {
        number: 2,
        title: 'Monorepo vs. single app',
        exercisePrompt: `Explain the difference between a monorepo and separate repos. Walk through when each makes sense. Help the learner decide for their project and understand what tooling that implies (pnpm workspaces, Turborepo, or just a plain repo).`,
        artifactType: 'tech_stack',
        artifactTitle: 'Repository Structure Decision',
      },
      {
        number: 3,
        title: 'Version control and CI/CD basics',
        exercisePrompt: `Introduce git branching strategy (main, feature branches, PRs). Explain CI/CD in plain terms (automated checks on every push). Walk through setting up a GitHub repo and a simple GitHub Actions workflow that runs tests on push.`,
        artifactType: 'tech_stack',
        artifactTitle: 'CI/CD Setup Notes',
      },
      {
        number: 4,
        title: 'Local development environment',
        exercisePrompt: `Guide the learner through local dev setup for their chosen stack: installing dependencies, environment variables (.env pattern, never commit secrets), running the dev server, connecting to a local database. Make every step specific to their project.`,
        artifactType: 'tech_stack',
        artifactTitle: 'Dev Environment Checklist',
      },
    ],
  },
  {
    number: 4,
    title: 'Building',
    description: 'Write the code that makes it work.',
    phaseDeliverable: 'Working MVP',
    lessons: [
      {
        number: 1,
        title: 'Frontend basics: pages, components, routing',
        exercisePrompt: `Explain how modern frontend frameworks organize code into pages and components. Walk through creating the first real screen of their product — one page, one component, real data shape. Explain how routing works (URLs → pages) for their framework.`,
        artifactType: 'other',
        artifactTitle: 'First Page Built',
      },
      {
        number: 2,
        title: 'Backend basics: APIs, databases, auth',
        exercisePrompt: `Explain what an API is (the contract between frontend and backend), how to write a simple endpoint, how it queries the database, and how auth protects routes. Walk through implementing one real API endpoint for their product.`,
        artifactType: 'other',
        artifactTitle: 'First API Route Built',
      },
      {
        number: 3,
        title: 'Connecting frontend to backend',
        exercisePrompt: `Show how frontend fetches from backend: HTTP requests, loading states, error handling, displaying real data. Walk through connecting one real screen to one real API route so data flows end-to-end in their product.`,
        artifactType: 'other',
        artifactTitle: 'End-to-End Data Flow Working',
      },
      {
        number: 4,
        title: 'Third-party integrations',
        exercisePrompt: `Explain what a third-party integration means and how to add one safely (API keys in env vars, error handling, testing without hitting prod). Help the learner identify and implement one integration their MVP actually needs.`,
        artifactType: 'other',
        artifactTitle: 'Integration Implemented',
      },
      {
        number: 5,
        title: 'Testing your work',
        exercisePrompt: `Introduce the testing pyramid: unit tests (functions), integration tests (API routes), end-to-end tests (user flows). Explain why tests save time long-term. Walk through writing tests for one important piece of their product's logic.`,
        artifactType: 'other',
        artifactTitle: 'Test Suite Started',
      },
    ],
  },
  {
    number: 5,
    title: 'Deployment',
    description: 'Put it on the internet.',
    phaseDeliverable: 'Live, deployed project',
    lessons: [
      {
        number: 1,
        title: 'Where does it live?',
        exercisePrompt: `Explain hosting options: managed platforms (Vercel, Railway, Render) vs. self-hosted (VPS, Docker). Cover cost, complexity, and control tradeoffs. Help the learner choose hosting for their project with concrete reasoning.`,
        artifactType: 'deployment',
        artifactTitle: 'Hosting Decision',
      },
      {
        number: 2,
        title: 'Environment variables and secrets',
        exercisePrompt: `Explain the difference between dev and production environments. Walk through setting production env vars securely (hosting dashboard, not .env files). Cover: database URL, auth secrets, API keys, and the principle of least privilege.`,
        artifactType: 'deployment',
        artifactTitle: 'Production Env Checklist',
      },
      {
        number: 3,
        title: 'Your first deploy',
        exercisePrompt: `Walk through first production deployment step by step for their chosen platform: connect repo, configure build settings, trigger deploy, verify it works. Explain what a failed deploy looks like and how to read deploy logs.`,
        artifactType: 'deployment',
        artifactTitle: 'First Deployment Complete',
      },
      {
        number: 4,
        title: 'Monitoring and error tracking',
        exercisePrompt: `Explain why monitoring matters. Walk through setting up basic error tracking (Sentry free tier) and uptime monitoring. Show what a production error looks like and how to trace it back to the code.`,
        artifactType: 'deployment',
        artifactTitle: 'Monitoring Setup',
      },
    ],
  },
  {
    number: 6,
    title: 'Management',
    description: 'Keep it running and growing.',
    phaseDeliverable: 'Maintenance + growth playbook',
    lessons: [
      {
        number: 1,
        title: 'Handling bugs and feedback',
        exercisePrompt: `Explain the bug lifecycle: report → reproduce → fix → test → deploy. Walk through setting up a simple bug tracking process (GitHub Issues or Linear) and how to triage user feedback. What makes a good bug report? How do you decide what to fix first?`,
        artifactType: 'playbook',
        artifactTitle: 'Bug & Feedback Process',
      },
      {
        number: 2,
        title: 'Adding features without breaking things',
        exercisePrompt: `Explain safe feature development: feature branches, database migrations without downtime, backwards compatibility, rollback plans. Walk through how to add one new feature to their product without breaking what already works.`,
        artifactType: 'playbook',
        artifactTitle: 'Feature Development Checklist',
      },
      {
        number: 3,
        title: 'Working with a team or future developers',
        exercisePrompt: `Cover collaborative development basics: PR reviews, documentation (README, CLAUDE.md), onboarding a new developer, communication practices. Help the learner write a developer onboarding guide for their project.`,
        artifactType: 'playbook',
        artifactTitle: 'Developer Onboarding Guide',
      },
      {
        number: 4,
        title: 'Scaling when you grow',
        exercisePrompt: `Explain what "scaling" actually means in practice. Cover signals that you need to scale and the common levers: database indexes, caching, CDN, horizontal scaling. Help the learner identify their first likely bottleneck.`,
        artifactType: 'playbook',
        artifactTitle: 'Growth & Scaling Playbook',
      },
    ],
  },
]

export function getPhase(phase: number): Phase | undefined {
  return CURRICULUM.find(p => p.number === phase)
}

export function getLesson(phase: number, lesson: number): Lesson | undefined {
  return getPhase(phase)?.lessons.find(l => l.number === lesson)
}

export function getTotalLessons(): number {
  return CURRICULUM.reduce((sum, p) => sum + p.lessons.length, 0)
}
