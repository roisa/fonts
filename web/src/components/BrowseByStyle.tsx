import Link from "next/link";
import {
  categoryGroups,
  categoryGroupSlug,
  categoryGroupIntros,
  getCategoryGroupPreviewFamily,
} from "@/lib/fonts";

export default function BrowseByStyle() {
  return (
    <section id="styles" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Browse fonts by style</h2>
        <p className="mt-1 max-w-2xl text-muted">
          Seven type styles, each picked for a specific kind of brief — from wedding
          stationery to game UI.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map((group) => (
          <Link
            key={group}
            href={`/fonts/category/${categoryGroupSlug(group)}`}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
          >
            <div
              className="text-4xl font-bold"
              style={{ fontFamily: getCategoryGroupPreviewFamily(group) }}
            >
              Aa
            </div>
            <h3 className="text-lg font-bold">{group} fonts</h3>
            <p className="text-sm text-muted">{categoryGroupIntros[group]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
