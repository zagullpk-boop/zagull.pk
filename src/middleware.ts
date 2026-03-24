import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || "zagull-admin-fallback-secret-2026"
const key = new TextEncoder().encode(secretKey)

async function decrypt(input: string): Promise<any> {
  if (!input) return null
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("JWT Decrypt Error:", error.message)
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isApiAdminRoute = pathname.startsWith('/api/admin')

  // Skip middleware for non-admin routes
  if (!isAdminRoute && !isApiAdminRoute) {
    return NextResponse.next()
  }

  const session = req.cookies.get("admin_session")?.value
  const payload = session ? await decrypt(session) : null

  // 1. Not logged in + trying to access admin (except login page) → redirect to login
  if (isAdminRoute && !isLoginPage && !payload) {
    console.log("Blocking unauthorized access to:", pathname)
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Not logged in + trying to access admin API → returned 401
  if (isApiAdminRoute && !payload && !isLoginPage) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  // 3. Already logged in + visiting login page → redirect to dashboard
  if (isLoginPage && payload) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin((?!login).*)', // Matches /admin and all sub-routes EXCEPT /admin/login
    '/api/admin/:path*'
  ],
}
