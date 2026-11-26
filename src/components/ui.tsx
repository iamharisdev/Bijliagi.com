import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";
import type { Faq, ServiceItem } from "@/content/services";
import { cn, formatPKR, whatsappUrl } from "@/lib/utils";
import { ArrowRightIcon, BoltIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { HeroPower } from "@/components/hero-power";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Small label above section titles, with the bolt mark. */
export function Eyebrow({ children, tone = "brand", className }: { children: ReactNode; tone?: "brand" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-sm font-bold tracking-[0.14em] uppercase",
        tone === "brand" ? "text-brand" : "text-brand-bright",
        className,
      )}
    >
      <BoltIcon className="size-4 text-spark" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  className,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn("mt-3 text-4xl md:text-[3.25rem]", tone === "light" && "text-white")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 text-lg", tone === "light" ? "text-white/70" : "text-steel")}>{intro}</p>}
    </div>
  );
}

type RateRow = Pick<ServiceItem, "name" | "unit" | "price" | "from" | "note">;

export function RateTable({ rates, caption }: { rates: RateRow[]; caption?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <table className="w-full text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-ink text-sm text-white">
          <tr>
            <th scope="col" className="px-5 py-3.5 font-semibold">Work</th>
            <th scope="col" className="hidden px-5 py-3.5 font-semibold sm:table-cell">Unit</th>
            <th scope="col" className="px-5 py-3.5 text-right font-semibold">Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rates.map((rate) => (
            <tr key={rate.name} className="align-top transition-colors hover:bg-brand-soft/60">
              <th scope="row" className="px-5 py-4 font-medium">
                {rate.name}
                <span className="block text-sm font-normal text-steel sm:hidden">{rate.unit}</span>
                {rate.note && <span className="mt-0.5 block text-sm font-normal text-steel">{rate.note}</span>}
              </th>
              <td className="hidden px-5 py-4 text-steel sm:table-cell">{rate.unit}</td>
              <td className="px-5 py-4 text-right whitespace-nowrap tabular-nums">
                {rate.from && <span className="mr-1 text-sm text-steel">from</span>}
                <span className="font-bold text-brand-deep">{formatPKR(rate.price)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IncludesList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
            <CheckIcon className="size-3.5" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-xl border border-line bg-white px-5 transition-shadow open:shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg leading-none text-brand transition-transform duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white"
            >
              +
            </span>
          </summary>
          <p className="max-w-prose pb-5 text-steel">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

const buttonVariants = {
  primary: "bg-brand text-white shadow-[0_10px_24px_-10px_rgb(22_103_217/0.7)] hover:bg-brand-deep",
  spark: "bg-spark text-ink shadow-[0_10px_24px_-10px_rgb(255_199_44/0.8)] hover:bg-[#ffd659]",
  outline: "border-2 border-ink/15 bg-white text-ink hover:border-brand hover:text-brand",
  light: "border-2 border-white/30 text-white backdrop-blur hover:border-white hover:bg-white/10",
  wa: "bg-wa text-white shadow-[0_10px_24px_-10px_rgb(31_168_85/0.7)] hover:bg-[#178f47]",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 active:scale-[0.98]",
    buttonVariants[variant],
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <ArrowRightIcon className="size-4 transition-transform group-hover/btn:translate-x-1" />}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-deep", className)}>
      {children}
      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export const defaultWaMessage = `Assalam o Alaikum ${siteConfig.name}, I need help with a job at my place.`;

/** Sticky call / WhatsApp bar on phones. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <a href={`tel:${siteConfig.phoneE164}`} className={buttonClass("outline", "py-3")}>
        <PhoneIcon className="size-4" />
        Call now
      </a>
      <a href={whatsappUrl(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("wa", "py-3")}>
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </a>
    </div>
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: Array<{ name: string; path: string }>; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", tone === "light" ? "text-white/60" : "text-steel")}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={tone === "light" ? "text-white" : "text-ink"}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={tone === "light" ? "hover:text-white" : "hover:text-brand"}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Dark page banner used at the top of inner pages. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  image,
  imageAlt,
}: {
  crumbs: Array<{ name: string; path: string }>;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image && (
        // Decorative backdrop; the image is described where it is shown in full.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={imageAlt ?? ""} className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="circuit absolute inset-0 -z-10" />
      <HeroPower />
      <div className="wrap pt-10 pb-16 md:pt-14 md:pb-20">
        <Breadcrumbs items={crumbs} tone="light" />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-5xl text-white md:text-7xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-white/75">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
