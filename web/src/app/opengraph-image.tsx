import { site } from "@/lib/site";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = site.name;

export default function Image() {
  return buildOgImage("20 hand-picked fonts", site.tagline, site.description);
}
