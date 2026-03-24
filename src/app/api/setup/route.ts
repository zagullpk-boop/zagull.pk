import { NextResponse } from 'next/server';
import { setupInitialAdmin } from '@/lib/admin/actions';

export async function GET() {
  try {
    const result = await setupInitialAdmin();
    
    if (result.error) {
      if (result.error.code === '23505') {
        return NextResponse.json({ 
          success: true, 
          message: 'Admin account already exists! You can log in now.', 
          credentials: { username: 'zagull.pk@gmail.com', password: '10101213' }
        });
      }
      return NextResponse.json({ success: false, error: result.error });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Admin account created successfully!',
      credentials: { username: 'zagull.pk@gmail.com', password: '10101213' }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to run setup' }, { status: 500 });
  }
}
