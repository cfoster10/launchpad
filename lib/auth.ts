import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from './db'
import { users, accounts, sessions, verificationTokens } from './db/schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'Launchpad <noreply@launchpad.dev>',
    }),
  ],
  pages: { signIn: '/login', verifyRequest: '/verify' },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})
