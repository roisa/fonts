"use client";

import { useState } from "react";

export default function FontTypePreview({
  fontFamily,
  defaultText = "Ag Bb Cc 123",
}: {
  fontFamily: string;
  defaultText?: string;
}) {
  const [text, setText] = useState(defaultText);

  return (
    <div className="mt-8 rounded-2xl border border-line bg-white p-8">
      <div
        className="min-h-[3.5rem] break-words text-5xl leading-tight"
        style={{ fontFamily }}
      >
        {text || defaultText}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your own text to preview…"
        maxLength={80}
        className="mt-6 w-full rounded-lg border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-ink"
        aria-label="Preview text"
      />
    </div>
  );
}
