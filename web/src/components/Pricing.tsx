import CheckoutButtons from "@/components/CheckoutButtons";
import { site } from "@/lib/site";
import { lemonSqueezyCheckoutUrl } from "@/lib/lemonsqueezy";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Licensing, kept simple</h2>
        <p className="mt-1 text-muted">
          No subscriptions. Pay once, use forever within your license scope.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-7">
          <h3 className="font-semibold">Desktop</h3>
          <div className="text-3xl font-extrabold">
            $24<span className="text-base font-medium text-muted"> / font</span>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-muted [&>li]:before:mr-1 [&>li]:before:font-bold [&>li]:before:text-accent [&>li]:before:content-['✓']">
            <li>Personal &amp; client projects</li>
            <li>Print, packaging, social</li>
            <li>1 user, unlimited projects</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border-2 border-ink bg-white p-7">
          <h3 className="font-semibold">Web + App</h3>
          <div className="text-3xl font-extrabold">
            $49<span className="text-base font-medium text-muted"> / font</span>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-muted [&>li]:before:mr-1 [&>li]:before:font-bold [&>li]:before:text-accent [&>li]:before:content-['✓']">
            <li>Everything in Desktop</li>
            <li>Website embedding (WOFF2)</li>
            <li>Mobile app embedding</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-7">
          <h3 className="font-semibold">Full Collection</h3>
          <div className="text-3xl font-extrabold">
            ${site.bundlePrice}
            <span className="text-base font-medium text-muted"> / all 20 fonts</span>
          </div>
          <ul className="mb-1 flex flex-col gap-2 text-sm text-muted [&>li]:before:mr-1 [&>li]:before:font-bold [&>li]:before:text-accent [&>li]:before:content-['✓']">
            <li>All licenses included</li>
            <li>Free updates &amp; new weights</li>
            <li>Best value for agencies</li>
          </ul>
          <CheckoutButtons
            productName="IbraFonts Full Collection"
            amount={site.bundlePrice}
            lemonSqueezyCheckoutUrl={lemonSqueezyCheckoutUrl("full-collection")}
          />
        </div>
      </div>
    </section>
  );
}
