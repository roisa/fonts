/**
 * Builds a Lemon Squeezy hosted checkout link for a given product slug.
 * Requires NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL and a real product/variant
 * created in the Lemon Squeezy dashboard with a matching slug.
 */
export function lemonSqueezyCheckoutUrl(productSlug: string): string | undefined {
  const storeUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL;
  if (!storeUrl) return undefined;
  return `${storeUrl}/buy/${productSlug}`;
}

export type LemonSqueezyOrder = {
  id: string;
  email: string;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
};

export type LemonSqueezySummary = {
  configured: boolean;
  orders: LemonSqueezyOrder[];
  totalRevenue: number;
  error?: string;
};

/**
 * Pulls recent orders from the Lemon Squeezy API. Returns configured: false
 * (instead of throwing) when LEMONSQUEEZY_API_KEY isn't set yet, so the admin
 * dashboard can render a "not connected" state.
 */
export async function getLemonSqueezyOrders(): Promise<LemonSqueezySummary> {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    return { configured: false, orders: [], totalRevenue: 0 };
  }

  try {
    const res = await fetch(
      "https://api.lemonsqueezy.com/v1/orders?page[size]=25&sort=-created_at",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/vnd.api+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        configured: true,
        orders: [],
        totalRevenue: 0,
        error: `Lemon Squeezy API error: ${res.status}`,
      };
    }

    const data = await res.json();
    const orders: LemonSqueezyOrder[] = (data.data ?? []).map(
      (item: { id: string; attributes: Record<string, unknown> }) => ({
        id: item.id,
        email: String(item.attributes.user_email ?? ""),
        total: Number(item.attributes.total) / 100,
        currency: String(item.attributes.currency ?? "USD"),
        status: String(item.attributes.status ?? "unknown"),
        createdAt: String(item.attributes.created_at ?? ""),
      })
    );

    return {
      configured: true,
      orders,
      totalRevenue: orders
        .filter((o) => o.status === "paid")
        .reduce((sum, o) => sum + o.total, 0),
    };
  } catch {
    return {
      configured: true,
      orders: [],
      totalRevenue: 0,
      error: "Failed to reach Lemon Squeezy API",
    };
  }
}
