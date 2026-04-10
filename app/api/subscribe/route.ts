import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Log the subscriber (in production, add to Resend audience or database)
    console.log(`[Subscribe] New subscriber: ${email}`);

    // If Resend audience ID is configured, add contact
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const apiKey = process.env.RESEND_API_KEY;

    if (audienceId && apiKey) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
