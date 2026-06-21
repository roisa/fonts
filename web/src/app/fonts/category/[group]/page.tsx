import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  fonts,
  categoryGroups,
  categoryGroupSlug,
  getCategoryGroupBySlug,
  type FontCategoryGroup,
} from "@/lib/fonts";
import { site } from "@/lib/site";

const groupIntros: Record<FontCategoryGroup, string> = {
  Script:
    "Flowing, handwritten-style typefaces for wedding stationery, signatures, and brands that want a personal, human touch.",
  Cartoon:
    "Playful, bold display fonts for kids' brands, comics, packaging, and anything that should feel fun rather than corporate.",
  Pixel:
    "Bitmap and pixel-style fonts for retro game UI, indie game branding, and 8-bit nostalgia.",
  Display:
    "Bold, attention-grabbing headline fonts for logos, posters, and packaging where the typeface needs to do the heavy lifting.",
  "Sans Serif":
    "Clean, modern sans serif typefaces for brand identity, UI, and any project that needs to read as minimal and timeless.",
  Serif:
    "Classic and vintage serif fonts for editorial design, premium branding, and projects that need a sense of heritage.",
  Signature:
    "Authentic signature-style fonts for logos, autographs, and branding that wants to feel hand-signed.",
};

export async function generateStaticParams() {
  return categoryGroups.map((group) => ({ group: categoryGroupSlug(group) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group: groupSlug } = await params;
  const group = getCategoryGroupBySlug(groupSlug);
  if (!group) return {};

  const title = `${group} Fonts | Premium ${group} Font Collection`;
  const description = `${groupIntros[group]} Browse ${
    fonts.filter((f) => f.categoryGroup === group).length
  } ${group.toLowerCase()} fonts on ${site.name} with instant download and commercial licensing.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/fonts/category/${groupSlug}` },
    openGraph: { title, description, url: `${site.url}/fonts/category/${groupSlug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group: groupSlug } = await params;
  const group = getCategoryGroupBySlug(groupSlug);
  if (!group) notFound();

  const groupFonts = fonts.filter((f) => f.categoryGroup === group);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#catalog" className="hover:text-ink">Fonts</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{group}</span>
          </nav>

          <h1 className="text-4xl font-extrabold tracking-tight">{group} fonts</h1>
          <p className="mt-3 max-w-2xl text-muted">{groupIntros[group]}</p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {groupFonts.map((font) => (
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

          <div className="mt-12">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              Other styles
            </h2>
            <div className="flex flex-wrap gap-2">
              {categoryGroups
                .filter((g) => g !== group)
                .map((g) => (
                  <Link
                    key={g}
                    href={`/fonts/category/${categoryGroupSlug(g)}`}
                    className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
                  >
                    {g}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
