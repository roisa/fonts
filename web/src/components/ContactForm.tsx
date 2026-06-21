"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl border border-line bg-white p-6 text-sm">
        Thanks — your message has been sent. We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-line px-3.5 py-3 text-base focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-line px-3.5 py-3 text-base focus:border-ink focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-line px-3.5 py-3 text-base focus:border-ink focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-black disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-accent">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
