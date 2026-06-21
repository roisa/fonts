import { getFontBySlug } from "@/lib/fonts";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Font preview";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const font = getFontBySlug(slug);
  if (!font) return buildOgImage("IbraFonts", "Font not found");

  return buildOgImage(font.category, font.name, font.notes);
}
