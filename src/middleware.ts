import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('zagull_admin_token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  // If trying to access admin route (but not the login page) without valid token
  if (isAdminRoute && !isLoginPage && token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ['/admin/:path*'] 
};
