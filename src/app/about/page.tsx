import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { commitments, journey, stats, story } from "@/content/general";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { ButtonLink, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { whatsappUrl } from "@/lib/utils";
import { CountUp } from "@/components/motion";
import { BoltIcon, CategoryGlyph, CheckIcon, ClockIcon, PhoneIcon, PlayIcon } from "@/components/icons";

const journeyIcons = [ClockIcon, PhoneIcon, PlayIcon];

export const metadata: Metadata = {
  title: "About us",
  description: `Why ${siteConfig.name} works with agreed prices, written contracts and a trained in-house team in ${siteConfig.city}.`,
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

      {/* Highlight: 35 years of experience, now online */}
      <section aria-labelledby="journey-title" className="wrap pt-20">
        <div className="relative isolate overflow-hidden rounded-3xl border border-brand/20 bg-white p-7 shadow-lift md:p-12" data-reveal>
          <div className="circuit-dark absolute inset-0 -z-10" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="condensed pointer-events-none absolute -top-10 -right-4 -z-10 text-[16rem] leading-none font-extrabold text-brand/[0.06] select-none md:text-[22rem]"
          >
            35
          </span>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>{journey.eyebrow}</Eyebrow>
              <h2 id="journey-title" className="mt-3 text-4xl md:text-[3.25rem]">
                {journey.title}
              </h2>
              <p className="mt-5 text-lg text-steel">{journey.body}</p>
              <p className="mt-8 flex gap-3 rounded-2xl border border-spark/60 bg-spark-soft px-5 py-4 font-semibold text-ink">
                <BoltIcon className="mt-0.5 size-5 shrink-0 text-brand-deep" />
                {journey.note}
              </p>
            </div>

            <ol className="relative space-y-4">
              <span aria-hidden="true" className="absolute top-8 bottom-8 left-7 w-0.5 bg-gradient-to-b from-brand-deep via-brand to-spark" />
              {journey.steps.map((step, i) => {
                const Icon = journeyIcons[i % journeyIcons.length];
                const soon = "soon" in step && step.soon;
                return (
                  <li
                    key={step.label}
                    className="relative flex gap-5 rounded-2xl border border-line bg-white/90 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
                    data-reveal
                    style={{ "--reveal-i": i } as React.CSSProperties}
                  >
                    <span
                      className={`relative flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_12px_24px_-10px_rgb(22_103_217/0.9)] ${soon ? "bg-spark text-ink" : "bg-brand-gradient text-white"}`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand uppercase">
                        {step.label}
                        {soon && (
                          <span className="flex items-center gap-1.5 rounded-full bg-live/10 px-2 py-0.5 text-[0.65rem] tracking-normal text-live normal-case">
                            <span className="live-dot size-1.5 rounded-full bg-live" />
                            Coming soon
                          </span>
                        )}
                      </p>
                      <h3 className="mt-1 text-2xl">{step.title}</h3>
                      <p className="mt-1 text-steel">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
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

      {/* Quick facts: one clear summary for customers, Google and AI assistants */}
      <section aria-labelledby="facts-title" className="wrap pt-20">
        <SectionHeading id="facts-title" eyebrow="Quick facts" title={`${siteConfig.name} at a glance`} />
        <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2" data-reveal>
          {[
            ["Business", `${siteConfig.name}, professional electrical services`],
            ["Experience", `${siteConfig.yearsExperience}+ years in electrical work, trained in-house team`],
            ["Services", categories.map((c) => c.name).join(", ")],
            ["Location", `${siteConfig.city}, ${siteConfig.region}, Pakistan`],
            ["Areas covered", siteConfig.serviceAreas.join(", ")],
            ["Working hours", siteConfig.hours.label],
            ["Phone / WhatsApp", siteConfig.phoneDisplay],
            ["How to book", "Message us on WhatsApp with the work and your area. The price is agreed before any work starts."],
          ].map(([term, value]) => (
            <div key={term} className="bg-white px-6 py-5">
              <dt className="text-sm font-bold tracking-[0.08em] text-brand uppercase">{term}</dt>
              <dd className="mt-1.5 text-ink">
                {term === "Phone / WhatsApp" ? (
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brand">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="wrap flex flex-wrap gap-3 py-16">
        <ButtonLink href="/services" arrow>Browse services</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema("AboutPage", "/about", `About ${siteConfig.name}`, story.body)} />
    </>
  );
}
