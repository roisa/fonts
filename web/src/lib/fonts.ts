export type FontCategory = "Display" | "Script" | "Serif" | "Sans" | "Handwritten";

export type FontProduct = {
  slug: string;
  name: string;
  category: FontCategory;
  price: number;
  webPrice: number;
  previewFamily: string;
  badge?: "Bestseller" | "New";
  description: string;
};

// Placeholder catalog — replace with the real 20 fonts picked from
// ibracreative.com (name, category, pricing, and real @font-face files
// under /public/fonts) before launch.
export const fonts: FontProduct[] = [
  { slug: "marbella-display", name: "Marbella Display", category: "Display", price: 24, webPrice: 49, previewFamily: "Impact, sans-serif", badge: "Bestseller", description: "A bold, condensed display face built for headlines and packaging." },
  { slug: "velora-script", name: "Velora Script", category: "Script", price: 28, webPrice: 55, previewFamily: "'Brush Script MT', cursive", description: "A flowing modern script with elegant connecting swashes." },
  { slug: "ardent-serif", name: "Ardent Serif", category: "Serif", price: 22, webPrice: 45, previewFamily: "Georgia, serif", description: "An editorial serif with warm, classic proportions." },
  { slug: "northbound-sans", name: "Northbound Sans", category: "Sans", price: 20, webPrice: 40, previewFamily: "'Helvetica Neue', sans-serif", description: "A clean grotesque sans built for UI and branding systems." },
  { slug: "saltline-hand", name: "Saltline Hand", category: "Handwritten", price: 18, webPrice: 36, previewFamily: "'Comic Sans MS', cursive", description: "A casual handwritten face for cards, packaging, and social posts." },
  { slug: "quorum-display", name: "Quorum Display", category: "Display", price: 26, webPrice: 52, previewFamily: "'Arial Black', sans-serif", description: "A geometric display font with a confident, modern stance." },
  { slug: "belmonte-serif", name: "Belmonte Serif", category: "Serif", price: 24, webPrice: 48, previewFamily: "'Times New Roman', serif", description: "A refined transitional serif suited for long-form editorial work." },
  { slug: "driftwood-script", name: "Driftwood Script", category: "Script", price: 30, webPrice: 58, previewFamily: "cursive", description: "A relaxed brush script with an organic, handcrafted feel." },
  { slug: "modular-mono", name: "Modular Mono", category: "Sans", price: 20, webPrice: 40, previewFamily: "'Courier New', monospace", badge: "New", description: "A technical monospace family for code, labels, and product UI." },
  { slug: "harlow-display", name: "Harlow Display", category: "Display", price: 25, webPrice: 50, previewFamily: "fantasy", description: "A quirky retro display face with a playful, vintage feel." },
  { slug: "petal-script", name: "Petal Script", category: "Script", price: 27, webPrice: 53, previewFamily: "cursive", description: "A delicate script ideal for invitations and feminine branding." },
  { slug: "civic-serif", name: "Civic Serif", category: "Serif", price: 23, webPrice: 46, previewFamily: "serif", description: "A sturdy, institutional serif for reports and editorial layouts." },
  { slug: "outline-sans", name: "Outline Sans", category: "Sans", price: 19, webPrice: 38, previewFamily: "sans-serif", description: "A neutral workhorse sans for body copy and interfaces." },
  { slug: "lantern-hand", name: "Lantern Hand", category: "Handwritten", price: 18, webPrice: 36, previewFamily: "cursive", description: "A friendly handwritten face with a warm, approachable tone." },
  { slug: "bravado-display", name: "Bravado Display", category: "Display", price: 29, webPrice: 56, previewFamily: "'Arial Black', sans-serif", badge: "Bestseller", description: "A heavyweight display face built to dominate a headline." },
  { slug: "foundry-serif", name: "Foundry Serif", category: "Serif", price: 24, webPrice: 48, previewFamily: "Georgia, serif", description: "A versatile serif with foundry-grade detailing across weights." },
  { slug: "wisteria-script", name: "Wisteria Script", category: "Script", price: 26, webPrice: 51, previewFamily: "'Brush Script MT', cursive", description: "A romantic script with delicate flourishes for premium branding." },
  { slug: "brutalist-sans", name: "Brutalist Sans", category: "Sans", price: 21, webPrice: 42, previewFamily: "Arial, sans-serif", description: "A raw, utilitarian sans with sharp, unapologetic forms." },
  { slug: "penny-hand", name: "Penny Hand", category: "Handwritten", price: 17, webPrice: 34, previewFamily: "cursive", description: "A light, sketchy handwritten style for informal layouts." },
  { slug: "monarch-display", name: "Monarch Display", category: "Display", price: 28, webPrice: 54, previewFamily: "Impact, sans-serif", description: "A regal, high-contrast display face for luxury branding." },
];

export const categories: FontCategory[] = ["Display", "Script", "Serif", "Sans", "Handwritten"];

export function getFontBySlug(slug: string): FontProduct | undefined {
  return fonts.find((f) => f.slug === slug);
}
