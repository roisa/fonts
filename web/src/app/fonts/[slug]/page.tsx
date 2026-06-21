import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheckoutButtons from "@/components/CheckoutButtons";
import { fonts, getFontBySlug, categoryGroupSlug } from "@/lib/fonts";
import { getBundlesForFont, getBundlePricing } from "@/lib/bundles";
import { site } from "@/lib/site";
import { lemonSqueezyCheckoutUrl } from "@/lib/lemonsqueezy";

export async function generateStaticParams() {
  return fonts.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const font = getFontBySlug(slug);
  if (!font) return {};

  const title = `${font.name} Font | Download ${font.category}`;
  const description = `${font.name} is a ${font.category} font by IbraCreative. ${font.notes} Instant download. Desktop, web & app licenses.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/fonts/${font.slug}` },
    openGraph: { title, description, url: `${site.url}/fonts/${font.slug}` },
  };
}

export default async function FontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const font = getFontBySlug(slug);
  if (!font) notFound();

  const related = fonts
    .filter((f) => f.categoryGroup === font.categoryGroup && f.slug !== font.slug)
    .slice(0, 4);
  const fontBundles = getBundlesForFont(font.slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Breadcrumbs
            idSuffix={font.slug}
            items={[
              { label: "Home", href: "/" },
              {
                label: font.categoryGroup,
                href: `/fonts/category/${categoryGroupSlug(font.categoryGroup)}`,
              },
              { label: font.name },
            ]}
          />

          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {font.category}
              </span>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight">
                {font.name} — {font.seoKeyword}
              </h1>
              <p className="mt-3 max-w-xl text-muted">{font.notes}</p>

              <div
                className="mt-8 rounded-2xl border border-line bg-white p-8 text-5xl leading-tight"
                style={{ fontFamily: font.previewFamily }}
              >
                Ag Bb Cc 123
              </div>

              {font.dafontDownloads && (
                <div className="mt-6 rounded-xl border border-line bg-[#fdece6] p-5 text-sm">
                  <strong>Free version available on DaFont</strong> ({font.dafontDownloads}{" "}
                  downloads). That version is for personal use only — the licenses below cover
                  client work, products for sale, and business use.
                </div>
              )}

              {fontBundles.length > 0 && (
                <div className="mt-8 flex flex-col gap-3">
                  {fontBundles.map((bundle) => {
                    const pricing = getBundlePricing(bundle);
                    return (
                      <Link
                        key={bundle.slug}
                        href={`/bundles/${bundle.slug}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-line bg-[#fdece6] p-5 text-sm transition hover:border-ink"
                      >
                        <span>
                          <strong>Part of the {bundle.name}</strong> — get this font plus{" "}
                          {bundle.fontSlugs.length - 1} pairing font
                          {bundle.fontSlugs.length - 1 === 1 ? "" : "s"} and save{" "}
                          {pricing.savingsPercent}%.
                        </span>
                        <span className="whitespace-nowrap font-semibold">View bundle →</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {related.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                    More {font.categoryGroup} fonts
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/fonts/${r.slug}`}
                        className="flex flex-col gap-2 rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
                      >
                        <div
                          className="text-2xl font-bold"
                          style={{ fontFamily: r.previewFamily }}
                        >
                          Ag
                        </div>
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className="text-xs text-muted">${r.price}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="mb-1 font-semibold">Desktop license</h2>
                <p className="mb-4 text-sm text-muted">Print, packaging, client work.</p>
                <CheckoutButtons
                  productName={`${font.name} — Desktop`}
                  amount={font.price}
                  lemonSqueezyCheckoutUrl={lemonSqueezyCheckoutUrl(`${font.slug}-desktop`)}
                />
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="mb-1 font-semibold">Web + App license</h2>
                <p className="mb-4 text-sm text-muted">Website and app embedding included.</p>
                <CheckoutButtons
                  productName={`${font.name} — Web + App`}
                  amount={font.webPrice}
                  lemonSqueezyCheckoutUrl={lemonSqueezyCheckoutUrl(`${font.slug}-web-app`)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Script
        id={`ld-json-${font.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: font.name,
            description: font.notes,
            category: font.category,
            brand: { "@type": "Brand", name: "IbraCreative" },
            offers: {
              "@type": "Offer",
              price: font.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `${site.url}/fonts/${font.slug}`,
            },
          }),
        }}
      />
    </>
  );
}
