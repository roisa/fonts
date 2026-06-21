import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, getPostBySlug } from "@/lib/blog";
import { getFontBySlug } from "@/lib/fonts";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `${site.url}/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedFonts = post.relatedFontSlugs
    .map((s) => getFontBySlug(s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-12">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
          </nav>

          <time className="text-xs font-semibold uppercase tracking-wide text-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{post.title}</h1>

          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {relatedFonts.length > 0 && (
            <div className="mt-10 rounded-2xl border border-line bg-white p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Fonts mentioned in this guide
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedFonts.map((font) => (
                  <Link
                    key={font.slug}
                    href={`/fonts/${font.slug}`}
                    className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:border-ink"
                  >
                    {font.name} — ${font.price}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />

      <Script
        id={`ld-json-post-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: "IbraCreative" },
            url: `${site.url}/blog/${post.slug}`,
          }),
        }}
      />
    </>
  );
}
