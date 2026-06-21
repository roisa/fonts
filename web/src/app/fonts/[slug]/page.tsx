import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutButtons from "@/components/CheckoutButtons";
import { fonts, getFontBySlug } from "@/lib/fonts";
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

  const title = `${font.name} — ${font.category} Font`;
  const description = `${font.description} Commercial license from $${font.price}. Instant download, live preview before you buy.`;

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

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#catalog" className="hover:text-ink">Fonts</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{font.name}</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {font.category}
              </span>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{font.name}</h1>
              <p className="mt-3 max-w-xl text-muted">{font.description}</p>

              <div
                className="mt-8 rounded-2xl border border-line bg-white p-8 text-5xl leading-tight"
                style={{ fontFamily: font.previewFamily }}
              >
                Ag Bb Cc 123
              </div>
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
            description: font.description,
            category: font.category,
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
