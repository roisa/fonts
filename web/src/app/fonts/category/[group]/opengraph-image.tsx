import { fonts, getCategoryGroupBySlug } from "@/lib/fonts";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Font category";

export default async function Image({ params }: { params: Promise<{ group: string }> }) {
  const { group: groupSlug } = await params;
  const group = getCategoryGroupBySlug(groupSlug);
  if (!group) return buildOgImage("IbraFonts", "Category not found");

  const count = fonts.filter((f) => f.categoryGroup === group).length;
  return buildOgImage("Font collection", `${group} fonts`, `${count} fonts, ready to license`);
}
