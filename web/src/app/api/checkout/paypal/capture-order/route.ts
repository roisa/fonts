import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  const { orderId } = await request.json();

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  try {
    const capture = await capturePayPalOrder(orderId);
    // TODO: once captured, look up the purchased font/license from your own
    // order record and email/serve the real font files + license. For now
    // this just confirms the capture status back to the client.
    return NextResponse.json({ status: capture.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to capture PayPal order" }, { status: 500 });
  }
}
