import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { categories, electricalCategories, featuredItems, plumbingCategories } from "@/content/services";
import {
  closing,
  commitments,
  generalFaqs,
  hero,
  highlights,
  processSteps,
  scopeNote,
  stats,
  story,
  tickerItems,
  // videos, (video section hidden)
} from "@/content/general";
import { formatPKR, whatsappUrl } from "@/lib/utils";
import { faqSchema } from "@/lib/schema";
import { buttonClass, ButtonLink, defaultWaMessage, Eyebrow, FaqList, JsonLd, SectionHeading, TextLink } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { FilterableGrid } from "@/components/filterable-grid";
import { Ticker } from "@/components/ticker";
import { CountUp, RotatingWord } from "@/components/motion";
import { HeroQuickQuote, type QuickQuoteCategory } from "@/components/hero-quick-quote";
import { CustomerReviews } from "@/components/customer-reviews";
import { HeroPower } from "@/components/hero-power";
// import { VideoShowcase } from "@/components/video-showcase"; (video section hidden)
import {
  ArrowRightIcon,
  CategoryGlyph,
  CheckIcon,
  ClockIcon,
  DocIcon,
  PinIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/icons";

const highlightIcons = [ClockIcon, DocIcon, ShieldIcon];

const quickQuote: QuickQuoteCategory[] = categories.map((c) => ({
  slug: c.slug,
  short: c.short,
  icon: c.icon,
  href: `/services/${c.slug}`,
  count: c.items.length,
  items: c.items.slice(0, 3).map((i) => ({ key: `${c.slug}/${i.slug}`, name: i.name, price: i.price, unit: i.unit, from: i.from })),
}));

const filterCategories = categories.map(({ slug, short, icon }) => ({ slug, short, icon }));

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero banner ───────────── */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={hero.poster} alt="" fill priority sizes="100vw" className="-z-30 object-cover opacity-40" />
        <video
          className="absolute inset-0 -z-20 size-full object-cover opacity-45 motion-reduce:hidden"
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-ink)_8%,rgb(10_26_51/0.88)_45%,rgb(11_65_146/0.55)_100%)]" />
        <div className="circuit absolute inset-0 -z-10" />
        <div className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
        <HeroPower />

        <div className="wrap grid items-center gap-12 pt-14 pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-24 lg:pb-36">
          <div>
            <p className="pop-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-1.5 text-sm font-semibold backdrop-blur">
              <span className="rounded-full bg-spark px-2.5 py-0.5 text-xs font-bold text-ink">{siteConfig.city}</span>
              {hero.kicker}
            </p>
            <h1 id="hero-title" className="mt-6 text-[3.1rem] text-white sm:text-7xl xl:text-[5.4rem]">
              <span className="block">{hero.titleStart}</span>
              <span className="block">
                <RotatingWord words={hero.rotatingWords} />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl">{hero.body}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={whatsappUrl(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("wa", "px-7 py-4")}>
                <WhatsAppIcon className="size-5" />
                Get a free quote
              </a>
              <ButtonLink href="/services" variant="light" arrow className="px-7 py-4">
                Services &amp; rates
              </ButtonLink>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <li key={h.title} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-bright ring-1 ring-white/15">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{h.title}</span>
                      <span className="block text-xs text-white/60">{h.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <HeroQuickQuote categories={quickQuote} />
        </div>
      </section>

      {/* ───────────── Stats bar ───────────── */}
      <section aria-label="Bijliagi in numbers" className="wrap relative z-10 -mt-16">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative flex flex-col px-6 py-7 text-center md:py-9 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="text-sm font-medium text-steel">{s.label}</dt>
              <dd className="condensed order-first text-5xl font-extrabold text-brand-deep md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── Electrical services (main business) ───────────── */}
      <section aria-labelledby="services-title" className="wrap py-24 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="services-title"
            eyebrow="Electrical services"
            title="Complete electrical work for homes and buildings"
            intro="Everything inside your premises, from the meter onwards, done by trained electricians."
          />
          <TextLink href="/services">Full rate list</TextLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {electricalCategories.map((c, i) => {
            const from = Math.min(...c.items.map((item) => item.price));
            const lead = i === 0;
            return (
              <li key={c.slug} className={lead ? "sm:col-span-2" : undefined} data-reveal style={{ "--reveal-i": i % 4 } as React.CSSProperties}>
                <Link
                  href={`/services/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-lift"
                >
                  <div className="relative h-44 overflow-hidden bg-ink">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes={lead ? "(min-width: 1024px) 36rem, 100vw" : "(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"}
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    {lead && (
                      <span className="absolute top-3 left-3 rounded-full bg-spark px-2.5 py-1 text-xs font-bold text-ink">Our core service</span>
                    )}
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur">
                      {c.items.length} services
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col px-6 pt-10 pb-6">
                    <span className="absolute -top-7 left-6 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_12px_24px_-10px_rgb(22_103_217/0.9)] ring-4 ring-white transition-transform duration-300 group-hover:-rotate-6">
                      <CategoryGlyph icon={c.icon} className="size-7" />
                    </span>
                    <h3 className="text-[1.65rem] transition-colors group-hover:text-brand">{c.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-steel">{c.summary}</p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className="text-sm text-steel">
                        from <span className="font-bold text-ink tabular-nums">{formatPKR(from)}</span>
                      </p>
                      <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand transition-all group-hover:bg-brand group-hover:text-white">
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Plumbing: a separate, secondary service */}
        {plumbingCategories.map((c) => (
          <div
            key={c.slug}
            className="mt-14 grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-[0.8fr_1.2fr]"
            data-reveal
          >
            <div className="relative min-h-56 bg-ink">
              <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 768px) 28rem, 100vw" className="object-cover" />
              <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">Separate service</span>
            </div>
            <div className="p-6 md:p-9">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CategoryGlyph icon={c.icon} className="size-6" />
                </span>
                <h3 className="text-3xl">Also available: {c.name.toLowerCase()}</h3>
              </div>
              <p className="mt-3 max-w-xl text-steel">{c.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${c.slug}/${item.slug}`}
                      className="inline-block rounded-full border border-line px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <TextLink href={`/services/${c.slug}`} className="mt-6">
                Plumbing rates
              </TextLink>
            </div>
          </div>
        ))}
      </section>

      <Ticker items={tickerItems} />

      {/* ───────────── Videos: hidden for now ─────────────
          To show the "Our work" video section again:
          1. remove this comment wrapper (this line and the closing line below),
          2. uncomment the VideoShowcase and `videos` imports at the top of this file,
          3. uncomment the "Our work" links in header.tsx and footer.tsx.
      <section id="videos" aria-labelledby="videos-title" className="relative isolate overflow-hidden bg-ink py-24 text-white md:py-28">
        <div className="circuit absolute inset-0 -z-10" />
        <div className="absolute -bottom-48 -left-48 -z-10 size-[34rem] rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
        <div className="wrap">
          <SectionHeading
            id="videos-title"
            tone="light"
            eyebrow="Our work"
            title="See how our team works on site"
            intro="Short clips from wiring, solar and repair jobs. Neat, safe and tested before handover."
            className="mb-12"
          />
          <VideoShowcase videos={videos} />
        </div>
      </section>
      ───────────── end of hidden video section ───────────── */}

      {/* ───────────── Most booked ───────────── */}
      <section aria-labelledby="popular-title" className="py-24 md:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="popular-title"
              eyebrow="Most booked"
              title="Popular services, clear rates"
              intro="Add services to your quote list and send them to us in one WhatsApp message."
            />
            <TextLink href="/services">Full rate list</TextLink>
          </div>
          <div className="mt-10">
            <FilterableGrid items={featuredItems} categories={filterCategories} />
          </div>
          <p className="mt-12 flex max-w-3xl gap-3 rounded-2xl border border-spark/50 bg-spark-soft px-5 py-4 text-ink/90">
            <ShieldIcon className="mt-0.5 size-5 shrink-0 text-brand-deep" />
            <span>
              <strong>{scopeNote.title}:</strong> {scopeNote.body}
            </span>
          </p>
        </div>
      </section>

      {/* ───────────── Why us ───────────── */}
      <section aria-labelledby="why-title" className="border-y border-line bg-white py-24 md:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div className="relative" data-reveal>
            <Image
              src={story.image}
              alt={story.imageAlt}
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="aspect-[4/4.4] w-full rounded-3xl object-cover shadow-lift"
            />
            <div className="absolute -right-3 -bottom-6 rounded-2xl bg-brand-gradient p-5 text-white shadow-lift sm:-right-6 sm:p-6">
              <p className="condensed text-5xl font-extrabold">
                <CountUp value={stats[2].value} suffix={stats[2].suffix} />
              </p>
              <p className="text-sm text-white/80">{stats[2].label}</p>
            </div>
            <div className="absolute top-6 -left-3 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift sm:-left-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-wa/10 text-wa">
                <ShieldIcon className="size-6" />
              </span>
              <span>
                <span className="block text-sm font-bold">Work guarantee</span>
                <span className="block text-xs text-steel">We come back if it fails</span>
              </span>
            </div>
          </div>

          <div>
            <SectionHeading id="why-title" eyebrow="Why Bijliagi" title={story.title} intro={story.body} />
            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {commitments.map((c, i) => (
                <div key={c.title} className="flex gap-4" data-reveal style={{ "--reveal-i": i % 2 } as React.CSSProperties}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <CheckIcon className="size-5" />
                  </span>
                  <div>
                    <dt className="font-bold">{c.title}</dt>
                    <dd className="mt-1 text-sm text-steel">{c.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ButtonLink href="/about" variant="outline" arrow>
                More about us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section aria-labelledby="how-it-works" className="circuit-dark py-24 md:py-28">
        <div className="wrap">
          <SectionHeading id="how-it-works" eyebrow="How it works" title="From quote to handover in four steps" align="center" />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-brand)_0_10px,transparent_10px_18px)] opacity-40 md:block" />
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative text-center" data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <span className="condensed relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-gradient text-3xl font-extrabold text-white shadow-[0_14px_28px_-12px_rgb(22_103_217/0.9)] ring-8 ring-paper">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-2xl">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-steel">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Reviews (submitted through the private review link) ───────────── */}
      <CustomerReviews />

      {/* ───────────── Areas ───────────── */}
      <section aria-labelledby="areas" className="border-t border-line bg-white py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            id="areas"
            eyebrow="Service areas"
            title={`Areas we cover in ${siteConfig.city}`}
            intro="Not on the list? Message us. We regularly take jobs nearby, and more cities are coming soon."
          />
          <ul className="flex flex-wrap gap-2.5" data-reveal>
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="flex cursor-default items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 font-medium transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft hover:text-brand"
              >
                <PinIcon className="size-4 text-brand" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Quote form + FAQ ───────────── */}
      <section aria-labelledby="contact" className="py-24 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10" data-reveal>
            <Eyebrow>Free quote</Eyebrow>
            <h2 id="contact" className="mt-3 text-4xl md:text-5xl">Tell us what you need</h2>
            <p className="mt-3 text-steel">Fill this in and it opens WhatsApp with your message ready to send.</p>
            <div className="mt-8">
              <InquiryForm serviceOptions={categories.map((c) => c.name)} />
            </div>
          </div>
          <div data-reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 text-4xl">Common questions</h2>
            <div className="mt-8">
              <FaqList faqs={generalFaqs} />
            </div>
            <TextLink href="/faq" className="mt-6">
              All questions
            </TextLink>
          </div>
        </div>
      </section>

      {/* ───────────── Closing banner ───────────── */}
      <section className="wrap pb-24">
        <div className="bg-brand-gradient relative isolate overflow-hidden rounded-3xl px-7 py-12 text-white md:px-14 md:py-16" data-reveal>
          <div className="circuit absolute inset-0 -z-10" />
          <div className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-spark/25 blur-3xl" aria-hidden="true" />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl text-white md:text-5xl">{closing.title}</h2>
              <p className="mt-3 text-lg text-white/80">{closing.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/services" variant="spark" arrow>
                Start your quote list
              </ButtonLink>
              <a href={`tel:${siteConfig.phoneE164}`} className={buttonClass("light")}>
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqSchema(generalFaqs)} />
    </>
  );
}
