import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing email or message" }, { status: 400 });
  }

  // TODO: wire to a real email service (e.g. Resend) to forward this to
  // support inbox. For now this just acknowledges receipt.
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
