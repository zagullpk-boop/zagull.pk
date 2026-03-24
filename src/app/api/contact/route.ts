import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Section 5: UltraMsg Integration (DISABLED for now)
    console.log("Contact form submission logged:", { name, email, subject });
    return NextResponse.json({ success: true }, { status: 200 });
    
    /*
    const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
    const token = process.env.ULTRAMSG_TOKEN;
    const adminPhone = "923329024005"; 

    if (!instanceId || !token) {
      console.error("Missing UltraMsg credentials");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const body = `*New Contact Inquiry - ZAGULL.pk*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject || 'General'}\n*Message:* ${message}`;

    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token: token,
        to: adminPhone,
        body: body,
      }),
    });

    const result = await response.json();

    if (result.sent === "true" || result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.error("UltraMsg Error:", result);
      return NextResponse.json({ success: false, message: 'Provider Error' }, { status: 500 });
    }
    */

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
