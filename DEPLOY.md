# Launchpad — Deployment Checklist

Complete these steps in order to get Launchpad live on Vercel.

---

## Step 1: Neon DB

1. Go to [neon.tech](https://neon.tech) → create free account
2. New project → name it `launchpad`
3. Copy the connection string (looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`)

---

## Step 2: Run Migrations

From this directory:

```bash
nvm use 20
DATABASE_URL="<your-neon-string>" pnpm drizzle-kit migrate
```

Expected: all tables created with no errors.

---

## Step 3: Resend (magic link email)

1. Go to [resend.com](https://resend.com) → create free account
2. Create an API key
3. Verify a sending domain — OR use Resend's sandbox for initial testing
4. Update `lib/auth.ts` line with `from:` to use your verified domain instead of `noreply@launchpad.dev`

---

## Step 4: Deploy to Vercel

```bash
npx vercel --prod
```

When prompted: new project, name `launchpad`, root directory `./`

---

## Step 5: Set Environment Variables

In Vercel dashboard → Project → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `DATABASE_URL` | Neon connection string from Step 1 |
| `NEXTAUTH_SECRET` | `9xlIgVOejnhPvE3dDkSV0QO+/9JAtp8eyVUj1r2yo9s=` |
| `NEXTAUTH_URL` | Your Vercel URL (e.g. `https://launchpad-abc.vercel.app`) |
| `AUTH_RESEND_KEY` | Your Resend API key from Step 3 |

---

## Step 6: Redeploy

```bash
npx vercel --prod
```

---

## Step 7: Smoke Test

Visit your Vercel URL and verify:
- [ ] Landing page loads
- [ ] Sign in with your email (magic link arrives)
- [ ] Complete onboarding (5 steps)
- [ ] Chat with Claude in Lesson 1
- [ ] Save artifact → appears on `/artifacts`

---

## GitHub Repo

https://github.com/cfoster10/launchpad
