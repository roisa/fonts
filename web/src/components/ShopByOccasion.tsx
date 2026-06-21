import Link from "next/link";
import { bundles, getBundleFonts, getBundlePricing } from "@/lib/bundles";
import { getFontFamilyCss } from "@/lib/fonts";

export default function ShopByOccasion() {
  return (
    <section id="bundles" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shop by occasion</h2>
          <p className="mt-1 max-w-2xl text-muted">
            Not sure where to start? These bundles pair fonts that already work well
            together for a specific brief — wedding invites, a gaming brand, a kids&apos;
            product line — at a discount over buying each font on its own.
          </p>
        </div>
        <Link href="/bundles" className="text-sm font-semibold hover:underline">
          View all bundles →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bundles.slice(0, 4).map((bundle) => {
          const bundleFonts = getBundleFonts(bundle);
          const pricing = getBundlePricing(bundle);
          return (
            <Link
              key={bundle.slug}
              href={`/bundles/${bundle.slug}`}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
            >
              {bundle.badge && (
                <span className="self-start rounded-md bg-[#fdece6] px-2 py-1 text-[11px] font-bold uppercase text-accent">
                  {bundle.badge}
                </span>
              )}
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {bundle.useCase}
              </span>
              <div className="font-bold">{bundle.name}</div>
              <div className="flex gap-2">
                {bundleFonts.map((f) => (
                  <span key={f.slug} className="text-2xl" style={{ fontFamily: getFontFamilyCss(f) }}>
                    Aa
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold">${pricing.desktopPrice}</span>
                <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold">
                  Save {pricing.savingsPercent}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
