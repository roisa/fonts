"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, fonts, type FontCategory } from "@/lib/fonts";

const filters: Array<FontCategory | "All"> = ["All", ...categories];

export default function FontCatalog() {
  const [active, setActive] = useState<FontCategory | "All">("All");

  const visible = useMemo(
    () => (active === "All" ? fonts : fonts.filter((f) => f.category === active)),
    [active]
  );

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">The 20-font collection</h2>
          <p className="mt-1 text-muted">
            Every font here is yours to preview — full files unlock after purchase.
          </p>
        </div>
      </div>

      <div className="mb-7 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              active === f
                ? "border-ink bg-ink text-paper"
                : "border-line bg-white text-muted"
            }`}
          >
            {f === "All" ? "All styles" : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((font) => (
          <Link
            key={font.slug}
            href={`/fonts/${font.slug}`}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
          >
            {font.badge && (
              <span className="self-start rounded-md bg-[#fdece6] px-2 py-1 text-[11px] font-bold uppercase text-accent">
                {font.badge}
              </span>
            )}
            <div className="text-3xl font-bold" style={{ fontFamily: font.previewFamily }}>
              Ag
            </div>
            <div className="font-bold">{font.name}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              {font.category}
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-bold">${font.price}</span>
              <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold">
                Preview
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
