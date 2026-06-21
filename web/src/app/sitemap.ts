import type { MetadataRoute } from "next";
import { fonts } from "@/lib/fonts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...fonts.map((font) => ({
      url: `${site.url}/fonts/${font.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
