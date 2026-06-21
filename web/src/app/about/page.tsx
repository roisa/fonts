import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a small, curated type foundry — 20 hand-picked fonts, full commercial rights, no clutter.`,
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">About {site.name}</h1>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
            <p>
              {site.name} is a small, curated type foundry built around one idea: most designers
              don&apos;t want to scroll through ten thousand fonts to find the right one. They want
              twenty good ones, clearly organized, with a license that&apos;s easy to understand.
            </p>
            <p>
              Every font in the collection is selected by IbraCreative based on real demand — proven
              download numbers, recurring requests from clients, and what actually gets used in
              finished branding, packaging, and product work, not just what looks good in a preview
              image.
            </p>
            <p>
              Licensing is priced per font with a Desktop tier for print and client work, and a Web +
              App tier for embedding on websites and in software. No subscriptions — pay once, use the
              font within your license scope for as long as you need it.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
