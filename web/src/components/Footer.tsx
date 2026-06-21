import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="text-xl font-extrabold tracking-tight">
            {site.name.replace("Fonts", "")}
            <span className="text-accent">Fonts</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            A small, curated type foundry. 20 fonts, no clutter, full commercial rights.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Collection</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li><Link href="/#catalog" className="hover:text-ink">Display</Link></li>
            <li><Link href="/#catalog" className="hover:text-ink">Script</Link></li>
            <li><Link href="/#catalog" className="hover:text-ink">Serif</Link></li>
            <li><Link href="/#catalog" className="hover:text-ink">Sans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-ink">About</Link></li>
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li><Link href="/license-terms" className="hover:text-ink">License terms</Link></li>
            <li><Link href="/refund-policy" className="hover:text-ink">Refund policy</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-6 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All fonts licensed, not sold outright.
      </div>
    </footer>
  );
}
