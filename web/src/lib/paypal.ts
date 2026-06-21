const PAYPAL_API_BASE =
  process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET env vars");
  }


  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(amountUsd: number, description: string) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          description,
          amount: { currency_code: "USD", value: amountUsd.toFixed(2) },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PayPal order create failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const res = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`PayPal order capture failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export type PayPalTransaction = {
  id: string;
  payerEmail: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
};

export type PayPalSummary = {
  configured: boolean;
  transactions: PayPalTransaction[];
  totalRevenue: number;
  error?: string;
};

/**
 * Pulls the last 31 days of completed PayPal transactions via the Reporting
 * API. Returns configured: false (instead of throwing) when PayPal
 * credentials aren't set yet, so the admin dashboard can render a
 * "not connected" state. Requires the app to have "Transaction Search" added
 * in the PayPal developer dashboard.
 */
export async function getPaypalTransactions(): Promise<PayPalSummary> {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return { configured: false, transactions: [], totalRevenue: 0 };
  }

  try {
    const accessToken = await getAccessToken();
    const end = new Date();
    const start = new Date(end.getTime() - 31 * 24 * 60 * 60 * 1000);

    const res = await fetch(
      `${PAYPAL_API_BASE}/v1/reporting/transactions?start_date=${start.toISOString()}&end_date=${end.toISOString()}&fields=transaction_info,payer_info`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        configured: true,
        transactions: [],
        totalRevenue: 0,
        error: `PayPal reporting API error: ${res.status}`,
      };
    }

    const data = await res.json();
    type RawTransaction = {
      transaction_info: {
        transaction_id: string;
        transaction_amount: { value: string; currency_code: string };
        transaction_status: string;
        transaction_initiation_date: string;
      };
      payer_info?: { email_address?: string };
    };
    const transactions: PayPalTransaction[] = (
      (data.transaction_details ?? []) as RawTransaction[]
    ).map((t) => ({
      id: t.transaction_info.transaction_id,
      payerEmail: t.payer_info?.email_address ?? "",
      amount: Number(t.transaction_info.transaction_amount.value),
      currency: t.transaction_info.transaction_amount.currency_code,
      status: t.transaction_info.transaction_status,
      date: t.transaction_info.transaction_initiation_date,
    }));

    return {
      configured: true,
      transactions,
      totalRevenue: transactions
        .filter((t) => t.status === "S")
        .reduce((sum, t) => sum + t.amount, 0),
    };
  } catch {
    return {
      configured: true,
      transactions: [],
      totalRevenue: 0,
      error: "Failed to reach PayPal reporting API",
    };
  }
}
