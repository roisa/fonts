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
