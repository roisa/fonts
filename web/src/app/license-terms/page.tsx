import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "License Terms",
  description: `License terms for fonts purchased on ${site.name} — Desktop and Web + App usage rights explained.`,
};

export default function LicenseTermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">License terms</h1>
          <div className="mt-6 flex flex-col gap-6 text-base leading-relaxed text-muted">
            <p>
              Every font on {site.name} is sold under a paid-use commercial license, not given away
              as freeware. Buying a font grants you a license to use it under the scope below — you
              never own the underlying font software itself.
            </p>

            <div>
              <h2 className="text-lg font-bold text-ink">Desktop license</h2>
              <p className="mt-2">
                Covers installation on your own computers for personal and client design work:
                print, packaging, social media graphics, logos, merchandise mockups, and PDF exports.
                One license covers one user across unlimited projects. Desktop licenses do not cover
                embedding the font file in a website or app — see Web + App below.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Web + App license</h2>
              <p className="mt-2">
                Includes everything in the Desktop license, plus the right to embed the font (as
                WOFF2) on websites via @font-face, and to bundle the font inside mobile or desktop
                applications. Page-view and app-install limits are not enforced — use is scoped to
                the projects you control as a single license holder.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Full Collection license</h2>
              <p className="mt-2">
                Grants both Desktop and Web + App rights for all 20 fonts in the {site.name}
                collection, including any new weights or styles added to existing families later.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">What&apos;s not allowed</h2>
              <ul className="mt-2 flex flex-col gap-2 [&>li]:before:mr-2 [&>li]:before:content-['—']">
                <li>Reselling, redistributing, or sublicensing the font files themselves.</li>
                <li>Uploading the original font files to a public repository, font marketplace, or font-sharing site.</li>
                <li>Registering the font (or a derivative of it) as a trademark or logo for sale as a font product.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Logo use</h2>
              <p className="mt-2">
                You may use any licensed font to design a logo for your own brand or a client&apos;s
                brand. The license does not transfer ownership of the font itself — only of the
                finished logo artwork you create with it.
              </p>
            </div>

            <p>
              Questions about a use case not covered here? <a href="/contact" className="text-ink underline">Contact us</a> before purchasing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
