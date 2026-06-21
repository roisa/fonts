export type BlogPost = {
  slug: string;
  title: string;
  keyword: string;
  excerpt: string;
  publishedAt: string;
  relatedFontSlugs: string[];
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "best-fonts-wedding-invitations",
    title: "Best Fonts for Wedding Invitations in 2026",
    keyword: "best fonts for wedding invitations",
    excerpt:
      "Elegant script and vintage serif pairings that make wedding stationery look custom-designed, not templated.",
    publishedAt: "2026-01-12",
    relatedFontSlugs: ["dunyah-script-font", "parandea-vintage-serif-font", "mominacute-handwritten-font"],
    body: [
      "Wedding stationery buyers are some of the highest-converting font customers — they're working on a single, emotionally important project and they're willing to pay for a typeface that feels personal rather than generic.",
      "An elegant script for the couple's names paired with a vintage serif for the body copy is the most reliable combination we see designers reach for. The script carries the emotion of the piece; the serif keeps the details (date, time, venue) legible at small sizes on a printed card.",
      "Dunyah Script is built specifically around this brief — flowing connected letterforms that still hold up at the small point sizes used on RSVP cards. Pair it with Parandea, a vintage serif with the kind of classic proportions you'd expect from letterpress wedding suites from decades past.",
      "If the couple wants something a little more relaxed and modern — think destination weddings, garden parties — Mominacute's handwritten warmth works well as a softer alternative to a formal script.",
    ],
  },
  {
    slug: "best-esports-gaming-brand-fonts",
    title: "Best Fonts for Esports and Gaming Brands",
    keyword: "best esports gaming brand fonts",
    excerpt:
      "Sharp, technical typefaces for team logos, stream overlays, and gaming merch — without looking like a stock template.",
    publishedAt: "2026-02-03",
    relatedFontSlugs: ["strateen-techno-font", "galberta-futuristic-font", "pixelate-pixel-font"],
    body: [
      "Gaming and esports brands need typography that reads as fast and technical at a glance — on a stream overlay, a viewer has half a second to register your logo before the action pulls their eye back.",
      "Strateen's sleek, futuristic structure was built for exactly this: team logos, tournament brackets, sponsor call-outs. It holds its shape at the small sizes used in stream graphics, which a lot of 'futuristic-looking' display fonts fail to do.",
      "Galberta leans more sci-fi and works well for game studio branding or trailer title cards, where you have more room to let the letterforms breathe.",
      "For retro and indie game branding specifically, Pixelate is the standard pick — it's the same pixel aesthetic players already associate with classic game UI, which makes it an easy shortcut to nostalgia-driven branding.",
    ],
  },
  {
    slug: "best-minimalist-sans-serif-fonts-logo-design",
    title: "Best Minimalist Sans Serif Fonts for Logo Design",
    keyword: "best minimalist sans serif fonts for logo design",
    excerpt:
      "Clean, modern sans serif typefaces that brand identity designers reach for when a logo needs to feel timeless.",
    publishedAt: "2026-02-21",
    relatedFontSlugs: ["garbentas-minimal-sans-font", "gailes-sans-serif-font", "debraht-elegant-sans-font"],
    body: [
      "Minimalist sans serif is the single most searched, most purchased font category among brand identity designers — and also the easiest category to get wrong, because the differences between a forgettable grotesque and a genuinely well-built one are subtle: stroke contrast, x-height, spacing at small sizes.",
      "Garbentas is built around true minimalism — even stroke weights, restrained letterforms — and is a strong default choice for a logo wordmark that needs to work across packaging, signage, and a favicon at 16px.",
      "Gailes has slightly more personality in its curves, which makes it a good pick when the brand wants 'clean' but not 'cold' — wellness, consumer tech, and lifestyle brands lean toward this kind of warmth.",
      "Debraht sits at the premium end of the category — designed for fashion, beauty, and hospitality brands where the sans serif needs to read as expensive rather than just neutral.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
