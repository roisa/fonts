const steps = [
  {
    title: "Preview live",
    body: "Type your own headline or logo text and see exactly how it looks before paying anything.",
  },
  {
    title: "Pick your license",
    body: "Desktop, Web, or App license — scoped to how you'll actually use the font.",
  },
  {
    title: "Download instantly",
    body: "OTF, TTF and WOFF2 files delivered immediately, plus a receipt for your records.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <p className="mt-1 text-muted">From preview to commercial use in three steps.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-line bg-white p-7">
            <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
              {i + 1}
            </span>
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
