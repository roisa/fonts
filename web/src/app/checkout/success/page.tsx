import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Order confirmed" };

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-lg px-6 py-24 text-center">
          <h1 className="text-3xl font-extrabold">Thanks for your order!</h1>
          <p className="mt-3 text-muted">
            Your font files and receipt will be emailed to you shortly. If you don&apos;t see
            it in a few minutes, check your spam folder or contact support.
          </p>
          <Link
            href="/#catalog"
            className="mt-8 inline-block rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-black"
          >
            Browse more fonts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
