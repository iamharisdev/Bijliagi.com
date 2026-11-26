import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { allItems, categories, getCategory, headlineItem } from "@/content/services";
import { highlights, scopeNote } from "@/content/general";
import { formatPKR, whatsappUrl } from "@/lib/utils";
import { breadcrumbSchema, categorySchema, faqSchema } from "@/lib/schema";
import { buttonClass, Eyebrow, FaqList, IncludesList, JsonLd, PageHero, RateTable } from "@/components/ui";
import { ItemCard } from "@/components/item-card";
import { InquiryForm } from "@/components/inquiry-form";
import { ArrowRightIcon, CategoryGlyph, CheckIcon, WhatsAppIcon } from "@/components/icons";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const path = `/services/${category.slug}`;
  const first = headlineItem(category);
  return {
    title: `${category.name} in ${siteConfig.city}`,
    description: `${category.summary} ${first.name}: ${formatPKR(first.price)} ${first.unit}.`,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${category.name} in ${siteConfig.city} | ${siteConfig.name}`,
      images: [{ url: category.image, width: 1200, height: 900, alt: category.imageAlt }],
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/services/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = allItems.filter((i) => i.categorySlug === category.slug);
  const from = Math.min(...category.items.map((i) => i.price));
  const others = categories.filter((c) => c.slug !== category.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: category.name, path: `/services/${category.slug}` },
  ];

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={`${items.length} services · from ${formatPKR(from)}`}
        title={
          <>
            {category.name} <span className="text-brand-bright">in {siteConfig.city}</span>
          </>
        }
        intro={category.description}
        image={category.image}
        imageAlt={category.imageAlt}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#services" className={buttonClass("primary")}>
            See services &amp; rates
          </a>
          <a
            href={whatsappUrl(`Assalam o Alaikum ${siteConfig.name}, I need ${category.name.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("wa")}
          >
            <WhatsAppIcon className="size-4" />
            Ask on WhatsApp
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
          {highlights.map((h) => (
            <li key={h.title} className="flex items-center gap-2">
              <CheckIcon className="size-4 text-brand-bright" />
              {h.title}
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="services" aria-labelledby="items-title" className="py-16 md:py-20">
        <div className="wrap">
          <Eyebrow>Book online</Eyebrow>
          <h2 id="items-title" className="mt-3 text-4xl md:text-5xl">
            {items.length} {category.short.toLowerCase()} services
          </h2>
          <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${items.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {items.map((item, i) => (
              <div key={item.key} className="h-full" data-reveal style={{ "--reveal-i": i % 4 } as React.CSSProperties}>
                <ItemCard item={item} showCategory={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-16 md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal>
            <h2 id="rates" className="text-4xl">Rate list</h2>
            <div className="mt-6">
              <RateTable rates={category.items} caption={`${category.name} rates`} />
            </div>
            <p className="mt-4 text-sm text-steel">Labour rates. Final quote confirmed after the site is checked. {scopeNote.body}</p>
          </div>
          <div data-reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={category.image}
                alt={category.imageAlt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="aspect-16/10 w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lift">
                <CategoryGlyph icon={category.icon} className="size-7" />
              </span>
            </div>
            <h2 id="included" className="mt-8 text-3xl">What&apos;s included</h2>
            <div className="mt-5">
              <IncludesList items={category.includes} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10" data-reveal>
            <h2 id="quote" className="text-4xl">Get a quote</h2>
            <p className="mt-3 text-steel">It opens WhatsApp with your message ready to send.</p>
            <div className="mt-8">
              <InquiryForm serviceOptions={categories.map((c) => c.name)} defaultService={category.name} />
            </div>
          </div>
          <div data-reveal>
            <h2 id="faq" className="text-3xl">Questions</h2>
            <div className="mt-6">
              <FaqList faqs={category.faqs} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-services" className="border-t border-line bg-white py-16">
        <div className="wrap">
          <h2 id="other-services" className="text-3xl">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-line p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-card"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <CategoryGlyph icon={c.icon} className="size-5" />
                  </span>
                  <span className="flex-1 font-semibold">{c.name}</span>
                  <ArrowRightIcon className="size-4 text-steel transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={categorySchema(category, items)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {category.faqs.length > 0 && <JsonLd data={faqSchema(category.faqs)} />}
    </>
  );
}
