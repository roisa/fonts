import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy policy</h1>
          <div className="mt-6 flex flex-col gap-6 text-base leading-relaxed text-muted">
            <p>
              This policy explains what information {site.name} collects when you browse the site,
              make a purchase, or contact us, and how that information is used.
            </p>

            <div>
              <h2 className="text-lg font-bold text-ink">Information we collect</h2>
              <p className="mt-2">
                When you purchase a font, our payment providers (Lemon Squeezy and/or PayPal)
                collect your name, email address, and payment details directly — we do not store
                your card number or PayPal credentials ourselves. When you use the contact form, we
                collect the name, email, and message you submit.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">How we use it</h2>
              <p className="mt-2">
                We use your email address to deliver purchased font files and license confirmation,
                to respond to support requests, and — only if you opt in — to send occasional news
                about new font releases.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Third parties</h2>
              <p className="mt-2">
                Payments are processed by Lemon Squeezy (acting as merchant of record) and PayPal.
                Each handles your payment data under its own privacy policy. We do not sell your
                information to advertisers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-ink">Your rights</h2>
              <p className="mt-2">
                You may request a copy of the data we hold about you, or ask us to delete it, by
                emailing us via the <a href="/contact" className="text-ink underline">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
