import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fonts, categoryGroups, categoryGroupSlug } from "@/lib/fonts";

export default function NotFound() {
  const popular = fonts.slice(0, 6);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="text-sm font-semibold uppercase tracking-wide text-accent">404</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            That page doesn&apos;t exist
          </h1>
          <p className="mt-3 text-muted">
            The font or page you&apos;re looking for may have moved. Try browsing the
            collection instead.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categoryGroups.map((group) => (
              <Link
                key={group}
                href={`/fonts/category/${categoryGroupSlug(group)}`}
                className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
              >
                {group}
              </Link>
            ))}
          </div>

          <div className="mt-10 text-left">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Popular fonts
            </h2>
            <ul className="flex flex-col gap-2">
              {popular.map((font) => (
                <li key={font.slug}>
                  <Link
                    href={`/fonts/${font.slug}`}
                    className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold hover:border-ink"
                  >
                    {font.name} — {font.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="mt-10 inline-block rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-black"
          >
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
