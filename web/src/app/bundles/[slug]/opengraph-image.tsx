import { getBundleBySlug } from "@/lib/bundles";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Font bundle preview";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return buildOgImage("IbraFonts", "Bundle not found");

  return buildOgImage(bundle.useCase, bundle.name, bundle.tagline);
}
