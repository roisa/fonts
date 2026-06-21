import { getFontBySlug, type FontProduct } from "@/lib/fonts";

export type FontBundle = {
  slug: string;
  name: string;
  /** Short use-case tag shown as a badge, e.g. "Wedding & Events" */
  useCase: string;
  tagline: string;
  description: string;
  fontSlugs: string[];
  relatedPostSlug?: string;
  badge?: "Popular" | "New";
  /** Headline shown in the first font, used in the live pairing preview */
  previewHeadline: string;
  /** Supporting line shown in the second font, used in the live pairing preview */
  previewBody: string;
};

export const bundles: FontBundle[] = [
  {
    slug: "wedding-invitation-bundle",
    name: "Wedding Invitation Bundle",
    useCase: "Wedding & Events",
    tagline: "An elegant script for the names, a vintage serif for the details.",
    description:
      "The pairing designers reach for most on wedding stationery: a flowing script that carries the emotion of the piece, plus a classic serif that keeps RSVP details legible at small print sizes. Includes a softer handwritten alternative for less formal, garden-party invites.",
    fontSlugs: ["dunyah-script-font", "parandea-vintage-serif-font", "mominacute-handwritten-font"],
    relatedPostSlug: "best-fonts-wedding-invitations",
    badge: "Popular",
    previewHeadline: "Sarah & James",
    previewBody: "Request the pleasure of your company — Saturday, the 12th of June",
  },
  {
    slug: "esports-gaming-brand-bundle",
    name: "Esports & Gaming Brand Bundle",
    useCase: "Gaming & Esports",
    tagline: "Sharp, technical type for team logos, overlays, and merch.",
    description:
      "Three fonts built to read fast on a stream overlay: a sleek technical display face for the primary logo, a sci-fi-edged alternative for trailers and title cards, and a true pixel font for retro in-game UI and nostalgia-driven branding.",
    fontSlugs: ["strateen-techno-font", "galberta-futuristic-font", "pixelate-pixel-font"],
    relatedPostSlug: "best-esports-gaming-brand-fonts",
    badge: "Popular",
    previewHeadline: "NOVA ESPORTS",
    previewBody: "REGIONAL FINALS — LIVE NOW",
  },
  {
    slug: "kids-brand-packaging-bundle",
    name: "Kids' Brand & Packaging Bundle",
    useCase: "Kids & Packaging",
    tagline: "Three levels of playful, from loud headline to readable body copy.",
    description:
      "A versatile comic-style font for headlines and packaging, a chunkier bubble-letter face for toy logos and characters, and a more restrained cartoon font for body copy where the louder options get too noisy at small sizes.",
    fontSlugs: ["comicoon-cartoon-font", "boxiest-bubble-font", "bublah-cartoon-font"],
    relatedPostSlug: "best-cartoon-fonts-kids-brands-packaging",
    previewHeadline: "Snack Time!",
    previewBody: "Now with extra crunch — ages 3 and up",
  },
  {
    slug: "personal-brand-signature-bundle",
    name: "Personal Brand & Signature Bundle",
    useCase: "Personal Branding",
    tagline: "Two hand-signed-style fonts for logos that look genuinely signed.",
    description:
      "An athletic, energetic signature font for creator and athlete merch, paired with a softer, rounder signature style suited to beauty, coaching, and lifestyle brands. Both hold up convincingly at social-profile size and on a hero banner.",
    fontSlugs: ["lewis-hamilton-signature-font", "alexandra-signature-font"],
    relatedPostSlug: "best-signature-fonts-logos-personal-branding",
    previewHeadline: "Alex Rivera",
    previewBody: "Creator · Coach · Speaker",
  },
  {
    slug: "minimalist-logo-bundle",
    name: "Minimalist Logo & Identity Bundle",
    useCase: "Brand Identity",
    tagline: "Three clean sans serifs for wordmarks that need to feel timeless.",
    description:
      "A true-minimalist grotesque for wordmarks that need to work from a favicon to a billboard, a slightly warmer alternative for wellness and lifestyle brands, and a premium option built for fashion, beauty, and hospitality identities.",
    fontSlugs: ["garbentas-minimal-sans-font", "gailes-sans-serif-font", "debraht-elegant-sans-font"],
    relatedPostSlug: "best-minimalist-sans-serif-fonts-logo-design",
    previewHeadline: "NORTHFIELD",
    previewBody: "Studio for brand & digital design",
  },
  {
    slug: "editorial-premium-branding-bundle",
    name: "Editorial & Premium Branding Bundle",
    useCase: "Editorial & Premium",
    tagline: "Heritage serif headlines with a clean sans serif for body copy.",
    description:
      "Two vintage serifs with real heritage character for mastheads, wine labels, and legacy-brand relaunches, paired with a clean sans serif for body copy — the editorial contrast most premium brand systems are built around.",
    fontSlugs: ["parandea-vintage-serif-font", "rishiona-serif-font", "gailes-sans-serif-font"],
    relatedPostSlug: "best-vintage-serif-fonts-editorial-premium-branding",
    previewHeadline: "The Quiet Issue",
    previewBody: "Essays on craft, design, and slow business",
  },
  {
    slug: "tech-startup-bundle",
    name: "Tech Startup & SaaS Bundle",
    useCase: "Tech & SaaS",
    tagline: "Futuristic display type to stand out from the safe grotesque crowd.",
    description:
      "Sharp, geometric letterforms for a logo or landing-page hero that wants to signal frontier tech, a more structured alternative for dashboards and developer tools, and a calmer display option for teams that want futuristic without being aggressive.",
    fontSlugs: ["galberta-futuristic-font", "strateen-techno-font", "rachelasti-display-font"],
    relatedPostSlug: "best-futuristic-sans-fonts-tech-startup-branding",
    previewHeadline: "Orbit",
    previewBody: "The fastest way to ship your API",
  },
];

export function getBundleBySlug(slug: string): FontBundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleFonts(bundle: FontBundle): FontProduct[] {
  return bundle.fontSlugs
    .map((slug) => getFontBySlug(slug))
    .filter((f): f is FontProduct => Boolean(f));
}

const BUNDLE_DISCOUNT = 0.25;

export function getBundlePricing(bundle: FontBundle) {
  const bundleFonts = getBundleFonts(bundle);
  const desktopTotal = bundleFonts.reduce((sum, f) => sum + f.price, 0);
  const webTotal = bundleFonts.reduce((sum, f) => sum + f.webPrice, 0);
  const desktopPrice = Math.round(desktopTotal * (1 - BUNDLE_DISCOUNT));
  const webPrice = Math.round(webTotal * (1 - BUNDLE_DISCOUNT));
  return {
    desktopTotal,
    desktopPrice,
    webTotal,
    webPrice,
    savingsPercent: Math.round(BUNDLE_DISCOUNT * 100),
  };
}

export function getBundlesForFont(fontSlug: string): FontBundle[] {
  return bundles.filter((b) => b.fontSlugs.includes(fontSlug));
}
