import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { commitments, stats, story } from "@/content/general";
import { breadcrumbSchema } from "@/lib/schema";
import { ButtonLink, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { CountUp } from "@/components/motion";
import { CategoryGlyph, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About us",
  description: `Why ${siteConfig.name} works with clear rates, written contracts and a trained in-house team in ${siteConfig.city}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="About us" title={story.title} intro={story.body} image={story.image} />

      <section aria-label="Bijliagi in numbers" className="wrap relative z-10 -mt-10">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col px-6 py-7 text-center ${i > 0 ? "border-l border-line" : ""} ${i === 2 ? "max-md:border-l-0 max-md:border-t" : ""} ${i === 3 ? "max-md:border-t" : ""}`}>
              <dt className="text-sm text-steel">{s.label}</dt>
              <dd className="condensed order-first text-5xl font-extrabold text-brand-deep">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap grid items-center gap-14 py-24 lg:grid-cols-2">
        <Image
          src={story.image}
          alt={story.imageAlt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
          data-reveal
        />
        <div>
          <SectionHeading eyebrow="Electricians first" title="Electrical work, done properly" intro="Electrical work is our main business: wiring, faults, DBs, lighting, AC, UPS, solar and CCTV. Every job follows the same rules on safety and finish." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 font-semibold">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CategoryGlyph icon={c.icon} className="size-5" />
                </span>
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="values" className="relative isolate overflow-hidden bg-ink py-24 text-white">
        <div className="circuit absolute inset-0 -z-10" />
        <div className="wrap">
          <SectionHeading id="values" tone="light" eyebrow="How we work" title="Our promises on every job" />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors hover:border-brand-bright/50 hover:bg-white/10" data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                  <CheckIcon className="size-5" />
                </span>
                <dt className="condensed mt-5 text-2xl font-extrabold text-white">{c.title}</dt>
                <dd className="mt-2 text-white/65">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="wrap flex flex-wrap gap-3 py-16">
        <ButtonLink href="/services" arrow>Browse services</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
