import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true });
  
  // Clear the cookie
  res.cookies.set('zagull_admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return res;
}
