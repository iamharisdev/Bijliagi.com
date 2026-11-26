import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { generalFaqs } from "@/content/general";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { FaqList, JsonLd, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `Answers about rates, contracts, materials and service areas at ${siteConfig.name}.`,
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  const all = [...generalFaqs, ...categories.flatMap((c) => c.faqs)];
  return (
    <>
    <PageHero crumbs={crumbs} eyebrow="Help" title="Frequently asked questions" intro="Rates, materials, contracts and service areas. Still unsure? Message us on WhatsApp." />
    <div className="wrap max-w-3xl pt-4 pb-24">
      <section aria-labelledby="general" className="mt-12">
        <h2 id="general" className="text-3xl">General</h2>
        <div className="mt-4"><FaqList faqs={generalFaqs} /></div>
      </section>
      {categories.filter((c) => c.faqs.length > 0).map((c) => (
        <section key={c.slug} aria-labelledby={`faq-${c.slug}`} className="mt-12">
          <h2 id={`faq-${c.slug}`} className="text-3xl">{c.name}</h2>
          <div className="mt-4"><FaqList faqs={c.faqs} /></div>
        </section>
      ))}
      <JsonLd data={faqSchema(all)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </div>
    </>
  );
}
