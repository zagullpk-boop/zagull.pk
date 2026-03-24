import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const secretToken = process.env.ADMIN_SECRET_TOKEN;

    // Ensure env vars are actually set
    if (!expectedUsername || !expectedPassword || !secretToken) {
      console.error('Admin env vars not configured');
      return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 });
    }

    if (username.trim() === expectedUsername && password === expectedPassword) {
      const res = NextResponse.json({ success: true });
      
      res.cookies.set('zagull_admin_token', secretToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });
      
      return res;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
