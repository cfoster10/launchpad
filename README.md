# Launchpad

An AI-native learning platform that guides anyone from project idea to shipped product.
Claude acts as your personal tutor, personalizing every lesson to your background and project.

## Setup

1. Clone the repo
2. `cp .env.example .env.local` and fill in values
3. `pnpm install`
4. `pnpm drizzle-kit migrate`
5. `pnpm dev`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Base URL of the app |
| `AUTH_RESEND_KEY` | Resend API key for magic link emails |

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind · Shadcn/ui · Anthropic SDK ·
Vercel AI SDK · Drizzle ORM · Neon Postgres · NextAuth.js

## Deploy

Connect repo to Vercel, set env vars, deploy. Push to `main` auto-deploys.
