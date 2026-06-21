import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund policy for digital font purchases on ${site.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Refund policy</h1>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
            <p>
              Fonts on {site.name} are digital goods delivered instantly after purchase. Because the
              font files and license key are accessible to you immediately, we generally do not
              offer refunds once a download has been issued — the same policy we apply across our
              font sales on other platforms.
            </p>
            <p>
              We will issue a full refund if any of the following apply:
            </p>
            <ul className="flex flex-col gap-2 [&>li]:before:mr-2 [&>li]:before:content-['—']">
              <li>You were charged more than once for the same order.</li>
              <li>The font files you received are corrupted or do not match the product purchased.</li>
              <li>You contact us within 24 hours of purchase and have not yet downloaded the files.</li>
            </ul>
            <p>
              To request a refund, email us via the <a href="/contact" className="text-ink underline">contact page</a> with your order
              reference and the reason for your request. We aim to respond within 2 business days.
            </p>
            <p>
              Refunds for orders placed through Lemon Squeezy are processed back to your original
              payment method via Lemon Squeezy. Refunds for direct PayPal payments are processed
              through PayPal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
