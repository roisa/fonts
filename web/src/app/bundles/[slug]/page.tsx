import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheckoutButtons from "@/components/CheckoutButtons";
import { bundles, getBundleBySlug, getBundleFonts, getBundlePricing } from "@/lib/bundles";
import { getPostBySlug } from "@/lib/blog";
import { site } from "@/lib/site";
import { lemonSqueezyCheckoutUrl } from "@/lib/lemonsqueezy";

export async function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return {};

  const title = `${bundle.name} | ${bundle.useCase} Fonts`;
  const description = `${bundle.tagline} ${bundle.description}`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/bundles/${bundle.slug}` },
    openGraph: { title, description, url: `${site.url}/bundles/${bundle.slug}` },
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();

  const bundleFonts = getBundleFonts(bundle);
  const pricing = getBundlePricing(bundle);
  const relatedPost = bundle.relatedPostSlug ? getPostBySlug(bundle.relatedPostSlug) : undefined;
  const [headlineFont, bodyFont] = bundleFonts;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Breadcrumbs
            idSuffix={bundle.slug}
            items={[
              { label: "Home", href: "/" },
              { label: "Bundles", href: "/bundles" },
              { label: bundle.name },
            ]}
          />

          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {bundle.useCase}
              </span>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{bundle.name}</h1>
              <p className="mt-3 max-w-xl text-muted">{bundle.description}</p>

              {headlineFont && (
                <div className="mt-8 rounded-2xl border border-line bg-white p-8">
                  <div
                    className="text-4xl leading-tight"
                    style={{ fontFamily: headlineFont.previewFamily }}
                  >
                    {bundle.previewHeadline}
                  </div>
                  {bodyFont && (
                    <div
                      className="mt-3 text-lg text-muted"
                      style={{ fontFamily: bodyFont.previewFamily }}
                    >
                      {bundle.previewBody}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-10">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                  Included in this bundle
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {bundleFonts.map((font) => (
                    <Link
                      key={font.slug}
                      href={`/fonts/${font.slug}`}
                      className="flex flex-col gap-2 rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
                    >
                      <div
                        className="text-2xl font-bold"
                        style={{ fontFamily: font.previewFamily }}
                      >
                        Ag
                      </div>
                      <div className="text-sm font-semibold">{font.name}</div>
                      <div className="text-xs text-muted">${font.price} individually</div>
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPost && (
                <div className="mt-8 rounded-xl border border-line bg-[#fdece6] p-5 text-sm">
                  <Link href={`/blog/${relatedPost.slug}`} className="font-semibold hover:underline">
                    Read the full guide: {relatedPost.title} →
                  </Link>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-line bg-white p-6">
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="font-semibold">Desktop bundle</h2>
                  <span className="rounded-full bg-[#fdece6] px-2 py-0.5 text-[11px] font-bold text-accent">
                    Save {pricing.savingsPercent}%
                  </span>
                </div>
                <p className="mb-1 text-sm text-muted">
                  Print, packaging, client work — all {bundleFonts.length} fonts.
                </p>
                <p className="mb-4 text-xs text-muted line-through">
                  ${pricing.desktopTotal} bought separately
                </p>
                <CheckoutButtons
                  productName={`${bundle.name} — Desktop`}
                  amount={pricing.desktopPrice}
                  lemonSqueezyCheckoutUrl={lemonSqueezyCheckoutUrl(`${bundle.slug}-desktop`)}
                />
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="font-semibold">Web + App bundle</h2>
                  <span className="rounded-full bg-[#fdece6] px-2 py-0.5 text-[11px] font-bold text-accent">
                    Save {pricing.savingsPercent}%
                  </span>
                </div>
                <p className="mb-1 text-sm text-muted">
                  Website and app embedding for all {bundleFonts.length} fonts.
                </p>
                <p className="mb-4 text-xs text-muted line-through">
                  ${pricing.webTotal} bought separately
                </p>
                <CheckoutButtons
                  productName={`${bundle.name} — Web + App`}
                  amount={pricing.webPrice}
                  lemonSqueezyCheckoutUrl={lemonSqueezyCheckoutUrl(`${bundle.slug}-web-app`)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Script
        id={`ld-json-bundle-${bundle.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            name: bundle.name,
            description: bundle.description,
            brand: { "@type": "Brand", name: "IbraCreative" },
            hasVariant: [
              {
                "@type": "Product",
                name: `${bundle.name} — Desktop`,
                offers: {
                  "@type": "Offer",
                  price: pricing.desktopPrice,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: `${site.url}/bundles/${bundle.slug}`,
                },
              },
              {
                "@type": "Product",
                name: `${bundle.name} — Web + App`,
                offers: {
                  "@type": "Offer",
                  price: pricing.webPrice,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: `${site.url}/bundles/${bundle.slug}`,
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
