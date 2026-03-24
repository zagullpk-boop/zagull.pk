import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = "zagull-admin-secret-key-12345"
const key = new TextEncoder().encode(secretKey)

async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'
  const isApiAdminRoute = req.nextUrl.pathname.startsWith('/api/admin')

  // Skip middleware for non-admin routes
  if (!isAdminRoute && !isApiAdminRoute) {
    return NextResponse.next()
  }

  const session = req.cookies.get("admin_session")?.value
  const payload = session ? await decrypt(session) : null

  // 1. Not logged in + trying to access admin (except login page) → redirect to login
  if (isAdminRoute && !isLoginPage && !payload) {
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
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
