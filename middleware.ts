import { auth } from '@/lib/auth'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isPublic = ['/', '/login', '/verify'].some(p => pathname.startsWith(p))
  const isAuthApi = pathname.startsWith('/api/auth')
  if (!req.auth && !isPublic && !isAuthApi) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
