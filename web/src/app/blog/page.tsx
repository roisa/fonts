import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Font Guides & Pairings",
  description:
    "Practical font picks for wedding stationery, gaming brands, and logo design from the IbraFonts collection.",
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Font guides &amp; pairings</h1>
          <p className="mt-3 max-w-xl text-muted">
            Practical picks from the IbraFonts collection for real design briefs.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.3)]"
              >
                <time className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-1 text-xl font-bold">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
