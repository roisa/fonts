import type { MetadataRoute } from "next";
import { fonts, categoryGroups, categoryGroupSlug } from "@/lib/fonts";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...fonts.map((font) => ({
      url: `${site.url}/fonts/${font.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categoryGroups.map((group) => ({
      url: `${site.url}/fonts/category/${categoryGroupSlug(group)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/blog`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${site.url}/about`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${site.url}/contact`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${site.url}/license-terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${site.url}/refund-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
