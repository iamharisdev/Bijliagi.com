import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { allItems, electricalCategories, plumbingCategories } from "@/content/services";
import { scopeNote } from "@/content/general";
import { breadcrumbSchema } from "@/lib/schema";
import { Eyebrow, JsonLd, PageHero } from "@/components/ui";
import { ItemCard } from "@/components/item-card";
import { FilterableGrid } from "@/components/filterable-grid";
import { CategoryGlyph, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "All services & rates",
  description: `Electrician rates in ${siteConfig.city}: house wiring, fault finding, lighting, AC, generator and UPS, solar and CCTV. Add services to a quote list and send it on WhatsApp.`,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const electricalItems = allItems.filter((i) => electricalCategories.some((c) => c.slug === i.categorySlug));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Rate list"
        title="All services & rates"
        intro={`${electricalItems.length} electrical services${plumbingCategories.length > 0 ? ", plus a separate plumbing service" : ""}. Standard labour rates for ${siteConfig.city}; the final quote is confirmed after we check the site.`}
        image="/images/categories/house-building-wiring.jpg"
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {[...electricalCategories, ...plumbingCategories].map((c) => (
            <li key={c.slug}>
              <Link
                href={`/services/${c.slug}`}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                <CategoryGlyph icon={c.icon} className="size-4" />
                {c.short}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="py-14 md:py-20">
        <div className="wrap">
          <Eyebrow>Electrical services</Eyebrow>
          <h2 className="mt-3 mb-8 text-4xl md:text-5xl">Electrician rates</h2>
          <FilterableGrid items={electricalItems} categories={electricalCategories.map(({ slug, short, icon }) => ({ slug, short, icon }))} />

          {plumbingCategories.map((c) => {
            const items = allItems.filter((i) => i.categorySlug === c.slug);
            return (
              <section key={c.slug} aria-labelledby={`sec-${c.slug}`} className="mt-20 border-t border-line pt-16">
                <Eyebrow>Separate service</Eyebrow>
                <h2 id={`sec-${c.slug}`} className="mt-3 text-4xl md:text-5xl">{c.name}</h2>
                <p className="mt-3 max-w-2xl text-lg text-steel">{c.summary}</p>
                <div className={`mt-8 grid gap-6 sm:grid-cols-2 ${items.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                  {items.map((item) => (
                    <ItemCard key={item.key} item={item} showCategory={false} />
                  ))}
                </div>
              </section>
            );
          })}
          <p className="mt-14 flex max-w-3xl gap-3 rounded-2xl border border-spark/50 bg-spark-soft px-5 py-4">
            <ShieldIcon className="mt-0.5 size-5 shrink-0 text-brand-deep" />
            <span>
              <strong>{scopeNote.title}:</strong> {scopeNote.body}
            </span>
          </p>
        </div>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
