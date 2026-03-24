import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // In a real production app, you would:
    // 1. Validate the email
    // 2. Add to Mailchimp, Loops, etc.
    // 3. Store in Supabase 'newsletter_subscribers' table

    console.log('New Newsletter Subscription:', { email });

    return NextResponse.json({ success: true, message: 'Subscribed' }, { status: 200 });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
