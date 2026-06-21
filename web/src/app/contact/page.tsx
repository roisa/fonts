import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about licensing, custom requests, or an order on ${site.name}? Get in touch.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Contact us</h1>
          <p className="mt-3 text-muted">
            Questions about licensing, a custom font request, or an existing order?
            Send us a message and we&apos;ll reply by email.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
