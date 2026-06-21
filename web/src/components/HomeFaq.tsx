import Script from "next/script";
import { site } from "@/lib/site";

const faqs = [
  {
    question: "What file formats do I get when I buy a font?",
    answer: "Every license includes OTF and TTF files, plus a WOFF2 file for web embedding.",
  },
  {
    question: "What's the difference between the Desktop and Web + App license?",
    answer:
      "The Desktop license covers print, packaging, and client design work. The Web + App license adds the right to embed the font on websites and in mobile apps.",
  },
  {
    question: "Are the free versions on DaFont the same as the fonts sold here?",
    answer:
      "Several fonts in this collection have a free, personal-use-only version on DaFont. The licenses sold here grant commercial rights for client work, products for sale, and business use.",
  },
  {
    question: "Is there a one-time bundle for all 20 fonts?",
    answer:
      `Yes — the Full Collection license at $${site.bundlePrice} includes commercial rights to all 20 fonts plus free updates and new weights.`,
  },
  {
    question: "Do I need a subscription?",
    answer: "No. Every license is a one-time purchase — pay once and use the font within your license scope indefinitely.",
  },
];

export default function HomeFaq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
      </div>
      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-line bg-white p-5">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="mt-2 text-sm text-muted">{faq.answer}</p>
          </div>
        ))}
      </div>

      <Script
        id="ld-json-home-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
