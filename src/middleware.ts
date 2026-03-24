import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('zagull_admin_token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isLoginApi = request.nextUrl.pathname.startsWith('/api/admin');

  // Allow login page and admin API routes through without auth
  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (isAdminRoute) {
    const secretToken = process.env.ADMIN_SECRET_TOKEN;
    
    // If no secret token configured, allow through (prevents lockout during setup)
    if (!secretToken) {
      return NextResponse.next();
    }
    
    if (token !== secretToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ['/admin/:path*', '/api/admin/:path*'] 
};
