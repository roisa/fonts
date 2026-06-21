import { getPostBySlug } from "@/lib/blog";
import { buildOgImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildOgImage("IbraFonts Blog", "Post not found");

  return buildOgImage("Font guide", post.title, post.excerpt);
}
