import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { bundles, getBundleFonts, getBundlePricing } from "@/lib/bundles";
import { getFontFamilyCss } from "@/lib/fonts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Font Bundles by Use Case",
  description:
    "Pre-paired font bundles for wedding invitations, gaming brands, kids' packaging, personal branding, and more — discounted vs. buying each font separately.",
  alternates: { canonical: `${site.url}/bundles` },
  openGraph: {
    title: "Font Bundles by Use Case",
    description:
      "Pre-paired font bundles for wedding invitations, gaming brands, kids' packaging, personal branding, and more.",
    url: `${site.url}/bundles`,
  },
};

export default function BundlesIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Breadcrumbs
            idSuffix="bundles"
            items={[{ label: "Home", href: "/" }, { label: "Bundles" }]}
          />

          <h1 className="text-4xl font-extrabold tracking-tight">Font bundles by use case</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Skip the guesswork. Each bundle pairs fonts that designers already reach for
            together on a specific kind of brief — at a discount over buying them one by one.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((bundle) => {
              const bundleFonts = getBundleFonts(bundle);
              const pricing = getBundlePricing(bundle);
              return (
                <Link
                  key={bundle.slug}
                  href={`/bundles/${bundle.slug}`}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#fdece6] px-2 py-1 text-[11px] font-bold uppercase text-accent">
                      {bundle.useCase}
                    </span>
                    {bundle.badge && (
                      <span className="text-[11px] font-bold uppercase text-muted">
                        {bundle.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-bold">{bundle.name}</div>
                  <p className="text-sm text-muted">{bundle.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {bundleFonts.map((f) => (
                      <span
                        key={f.slug}
                        className="text-2xl"
                        style={{ fontFamily: getFontFamilyCss(f) }}
                      >
                        Aa
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                      <span className="font-bold">${pricing.desktopPrice}</span>
                      <span className="ml-1 text-xs text-muted line-through">
                        ${pricing.desktopTotal}
                      </span>
                    </div>
                    <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold">
                      {bundleFonts.length} fonts
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
