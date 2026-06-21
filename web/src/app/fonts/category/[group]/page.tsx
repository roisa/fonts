import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
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

const groupFaqs: Record<FontCategoryGroup, { question: string; answer: string }[]> = {
  Script: [
    {
      question: "Can I use a script font for wedding invitations I'm selling to clients?",
      answer:
        "Yes. The desktop license covers print work you create for clients, including wedding stationery, packaging, and signage.",
    },
    {
      question: "Do script fonts include a web license for online invitation builders?",
      answer:
        "Each script font has a separate web + app license that covers embedding it on a website or in an app, in addition to the desktop license for print and design files.",
    },
    {
      question: "Are the free DaFont versions of these script fonts different from the paid ones?",
      answer:
        "Free DaFont versions are personal-use only. The paid licenses on this page grant commercial rights for client work, products for sale, and business use.",
    },
  ],
  Cartoon: [
    {
      question: "Can I use a cartoon font on a product I'm selling, like merchandise or packaging?",
      answer:
        "Yes, the desktop license covers commercial print use including packaging, merchandise, and client deliverables.",
    },
    {
      question: "Are cartoon fonts good for YouTube thumbnails and kids' content branding?",
      answer:
        "Yes, bold cartoon and comic-style fonts are commonly used for thumbnails, kids' brand identities, and playful packaging where readability at a glance matters.",
    },
    {
      question: "Do I need the web license to use a cartoon font on my website?",
      answer:
        "Yes, embedding a font on a website or in an app requires the web + app license rather than the desktop-only license.",
    },
  ],
  Pixel: [
    {
      question: "Can I use a pixel font in a game I'm releasing commercially?",
      answer:
        "Yes, the desktop license covers embedding the font in game assets and branding you ship commercially.",
    },
    {
      question: "Do pixel fonts work well for retro and 8-bit style game UI?",
      answer:
        "Yes, bitmap and pixel-style fonts are built for crisp rendering at small sizes, which is exactly what retro game UI and indie branding need.",
    },
    {
      question: "Is there a separate license for using a pixel font on a game's website?",
      answer:
        "Yes, the web + app license covers using the font on a website or within an app interface, separate from the desktop license used for design files.",
    },
  ],
  Display: [
    {
      question: "Can I use a display font for a logo I'm designing for a client?",
      answer:
        "Yes, the desktop license covers logo design, posters, and packaging work created for clients.",
    },
    {
      question: "Are bold display fonts suitable for packaging and poster headlines?",
      answer:
        "Yes, display fonts are designed for large, attention-grabbing headline use on posters, packaging, and signage.",
    },
    {
      question: "Do I need a different license to use a display font on a website headline?",
      answer:
        "Yes, the web + app license covers embedding the font on websites and in apps, in addition to the desktop license for print design.",
    },
  ],
  "Sans Serif": [
    {
      question: "Can I use a sans serif font for a brand identity I'm building for a client?",
      answer:
        "Yes, the desktop license covers brand identity, print collateral, and client work.",
    },
    {
      question: "Are these sans serif fonts suitable for UI and product design?",
      answer:
        "Yes, clean modern sans serif fonts are commonly used in UI design, and the web + app license covers embedding them in apps and digital products.",
    },
    {
      question: "Do sans serif fonts in this collection support multiple weights?",
      answer:
        "Weight availability varies by font — check each font's detail page for specifics before purchasing.",
    },
  ],
  Serif: [
    {
      question: "Can I use a serif font for editorial or publishing work I'm paid for?",
      answer:
        "Yes, the desktop license covers editorial design, publishing, and other paid client work.",
    },
    {
      question: "Are vintage serif fonts appropriate for premium or heritage branding?",
      answer:
        "Yes, classic and vintage serif fonts are well suited to premium branding that wants a sense of heritage and craftsmanship.",
    },
    {
      question: "Do I need the web license to use a serif font on a digital magazine site?",
      answer:
        "Yes, the web + app license covers embedding the font on websites, including digital publications, separate from the desktop license.",
    },
  ],
  Signature: [
    {
      question: "Can I use a signature font for a logo that looks hand-signed?",
      answer:
        "Yes, the desktop license covers logo design and branding work, including client projects.",
    },
    {
      question: "Are signature fonts appropriate for certificates and autographs in commercial products?",
      answer:
        "Yes, signature-style fonts are commonly used for certificates, autograph-style branding, and any project that wants a personal, hand-signed feel.",
    },
    {
      question: "Do signature fonts need a separate license for app embedding?",
      answer:
        "Yes, the web + app license covers embedding the font on websites or within apps, in addition to the desktop license for design files.",
    },
  ],
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
  const faqs = groupFaqs[group];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Breadcrumbs
            idSuffix={groupSlug}
            items={[
              { label: "Home", href: "/" },
              { label: "Fonts", href: "/#catalog" },
              { label: group },
            ]}
          />

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

          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-line bg-white p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Script
        id={`ld-json-faq-${groupSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
