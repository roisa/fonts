import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          {site.name.replace("Fonts", "")}
          <span className="text-accent">Fonts</span>
        </Link>
        <nav aria-label="Primary" className="hidden gap-7 text-sm font-medium text-muted md:flex">
          <Link href="/#catalog" className="hover:text-ink">Fonts</Link>
          <Link href="/#how" className="hover:text-ink">How it works</Link>
          <Link href="/#pricing" className="hover:text-ink">Licensing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/#catalog"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-black"
          >
            Browse fonts
          </Link>
        </div>
      </div>
    </header>
  );
}
