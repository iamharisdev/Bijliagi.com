import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { allItems, getCategory, getItem } from "@/content/services";
import { highlights, scopeNote } from "@/content/general";
import { formatPKR, whatsappUrl } from "@/lib/utils";
import { breadcrumbSchema, faqSchema, itemSchema } from "@/lib/schema";
import { Breadcrumbs, FaqList, IncludesList, JsonLd } from "@/components/ui";
import { ItemCard } from "@/components/item-card";
import { AddToQuoteWithQty } from "@/components/add-to-quote";
import { CategoryGlyph, ClockIcon, DocIcon, PhoneIcon, ShieldIcon, WhatsAppIcon } from "@/components/icons";

const highlightIcons = [ClockIcon, DocIcon, ShieldIcon];

export function generateStaticParams() {
  return allItems.map((i) => ({ category: i.categorySlug, item: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]/[item]">): Promise<Metadata> {
  const { category, item: slug } = await params;
  const item = getItem(category, slug);
  if (!item) return {};
  return {
    title: `${item.name} in ${siteConfig.city}: ${item.from ? "from " : ""}${formatPKR(item.price)} ${item.unit}`,
    description: `${item.summary} ${item.from ? "From " : ""}${formatPKR(item.price)} ${item.unit}. Book with ${siteConfig.name} on WhatsApp.`,
    alternates: { canonical: item.href },
    openGraph: {
      url: item.href,
      title: `${item.name} in ${siteConfig.city} | ${siteConfig.name}`,
      images: [{ url: item.image, width: 1200, height: 900, alt: item.imageAlt ?? item.name }],
    },
  };
}

export default async function ItemPage({ params }: PageProps<"/services/[category]/[item]">) {
  const { category: categorySlug, item: slug } = await params;
  const item = getItem(categorySlug, slug);
  const category = getCategory(categorySlug);
  if (!item || !category) notFound();

  const related = allItems.filter((i) => i.categorySlug === item.categorySlug && i.key !== item.key).slice(0, 4);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: category.name, path: `/services/${category.slug}` },
    { name: item.name, path: item.href },
  ];
  const waMessage = `Assalam o Alaikum ${siteConfig.name}, I need: ${item.name} (${item.from ? "from " : ""}${formatPKR(item.price)} ${item.unit}). Please share details.`;

  return (
    <>
      <div className="wrap pt-8">
        <Breadcrumbs items={crumbs} />
      </div>

      <div className="wrap grid gap-10 pt-6 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="relative self-start">
          <Image
            src={item.image}
            alt={item.imageAlt ?? ""}
            width={1200}
            height={900}
            priority
            sizes="(min-width: 1024px) 38rem, 100vw"
            className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
          />
          {item.badge && (
            <span className="absolute top-5 left-5 rounded-full bg-spark px-3 py-1 text-sm font-bold text-ink shadow">{item.badge}</span>
          )}
          <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-2xl bg-white/95 py-2 pr-4 pl-2 text-sm font-semibold shadow-lift backdrop-blur">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
              <CategoryGlyph icon={category.icon} className="size-5" />
            </span>
            {category.name}
          </span>
        </div>

        <div className="lg:py-4">
          <Link href={`/services/${category.slug}`} className="text-sm font-bold tracking-[0.1em] text-brand uppercase hover:underline">
            {category.name}
          </Link>
          <h1 className="mt-2 text-5xl md:text-6xl">{item.name}</h1>
          <p className="mt-5 inline-flex items-baseline gap-2 rounded-2xl bg-brand-soft px-5 py-3 tabular-nums">
            {item.from && <span className="text-steel">from</span>}
            <span className="condensed text-5xl font-extrabold text-brand-deep">{formatPKR(item.price)}</span>
            <span className="text-lg text-steel">{item.unit}</span>
          </p>
          {item.note && <p className="mt-2 text-sm text-steel">{item.note}</p>}
          <p className="mt-6 max-w-lg text-lg">{item.summary}</p>

          <div className="mt-8 space-y-5 rounded-3xl border border-line bg-white p-5 shadow-card md:p-6">
            <AddToQuoteWithQty itemKey={item.key} name={item.name} unit={item.unit} />
            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
              <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-wa hover:underline">
                <WhatsAppIcon className="size-5" />
                Ask on WhatsApp
              </a>
              <a href={`tel:${siteConfig.phoneE164}`} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand">
                <PhoneIcon className="size-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {highlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length];
              return (
                <li key={h.title} className="flex items-start gap-2.5 text-sm">
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>
                    <strong className="block">{h.title}</strong>
                    <span className="text-steel">{h.body}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-steel">Labour rate. Final quote confirmed after the site is checked.</p>
        </div>
      </div>

      <div className="border-y border-line bg-white py-16">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="included" data-reveal>
            <h2 id="included" className="text-3xl">What&apos;s included</h2>
            <div className="mt-6">
              <IncludesList items={category.includes} />
            </div>
            <p className="mt-6 text-sm text-steel">{scopeNote.body}</p>
          </section>
          <section aria-labelledby="faq" data-reveal>
            <h2 id="faq" className="text-3xl">Questions</h2>
            <div className="mt-6">
              <FaqList faqs={category.faqs} />
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="wrap py-16 md:py-20">
          <h2 id="related" className="text-4xl">Often booked with this</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <div key={r.key} className="h-full" data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <ItemCard item={r} showCategory={false} />
              </div>
            ))}
          </div>
        </section>
      )}

      <JsonLd data={itemSchema(item)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {category.faqs.length > 0 && <JsonLd data={faqSchema(category.faqs)} />}
    </>
  );
}
