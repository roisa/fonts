import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Font bundles preview";

export default function Image() {
  return buildOgImage("IbraFonts", "Font Bundles by Use Case", "Pre-paired fonts for wedding, gaming, kids, and more.");
}
