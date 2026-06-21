import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  const { amount, description } = await request.json();

  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    const order = await createPayPalOrder(amount, description ?? "IbraFonts license");
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
  }
}
