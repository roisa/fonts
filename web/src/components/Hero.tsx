"use client";

import { useState } from "react";

const previewFonts = [
  { label: "Editorial Serif", family: "Georgia, serif" },
  { label: "Modern Script", family: "'Brush Script MT', cursive" },
  { label: "Bold Display", family: "Impact, sans-serif" },
  { label: "Studio Mono", family: "'Courier New', monospace" },
];

export default function Hero() {
  const [text, setText] = useState("Design Something Bold");
  const [activeFont, setActiveFont] = useState(previewFonts[0].family);

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Fonts that make brands look like they paid an agency.
        </h1>
        <p className="mt-5 max-w-md text-muted">
          20 hand-picked typefaces, ready for commercial use in seconds. Type your own
          headline below and see it live before you buy.
        </p>
        <div className="mt-7 flex gap-3">
          <a href="#catalog" className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-black">
            Explore the collection
          </a>
          <a href="#pricing" className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold hover:border-ink">
            View licensing
          </a>
        </div>
        <div className="mt-7 flex flex-wrap gap-6 text-sm text-muted">
          <span><strong className="text-ink">20</strong> curated fonts</span>
          <span><strong className="text-ink">Instant</strong> download</span>
          <span><strong className="text-ink">Commercial</strong> license included</span>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)]">
        <label htmlFor="preview-input" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Try your own text
        </label>
        <input
          id="preview-input"
          type="text"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 mb-5 w-full rounded-lg border border-line px-3.5 py-3 text-base focus:border-ink focus:outline-none"
        />
        <div
          className="min-h-[90px] border-t border-line pt-4 text-4xl leading-tight break-words"
          style={{ fontFamily: activeFont }}
        >
          {text || " "}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {previewFonts.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFont(f.family)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                activeFont === f.family
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
