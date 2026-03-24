import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // In a real production app, you would:
    // 1. Validate the input
    // 2. Send an email using Resend, SendGrid, etc.
    // 3. Store the inquiry in Supabase 'contact_inquiries' table

    console.log('New Contact Inquiry:', { name, email, subject, message });

    return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
