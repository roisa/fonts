import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FontCatalog from "@/components/FontCatalog";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FontCatalog />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
