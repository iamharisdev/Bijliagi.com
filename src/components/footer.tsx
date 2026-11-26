import Link from "next/link";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { whatsappUrl } from "@/lib/utils";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/header";
import { buttonClass, defaultWaMessage } from "@/components/ui";

const company = [
  { href: "/about", label: "About us" },
  // { href: "/#videos", label: "Our work" }, (video section hidden)
  { href: "/#how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
const legal = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-24 text-white/70 md:pb-0">
      <div className="circuit absolute inset-0" aria-hidden="true" />

      {/* CTA strip */}
      <div className="relative border-b border-white/10">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl text-white md:text-4xl">Need a technician today?</h2>
            <p className="mt-2 text-white/60">Call or WhatsApp. We usually reply within minutes during working hours.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${siteConfig.phoneE164}`} className={buttonClass("light")}>
              <PhoneIcon className="size-4" />
              {siteConfig.phoneDisplay}
            </a>
            <a href={whatsappUrl(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("wa")}>
              <WhatsAppIcon className="size-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="wrap relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_0.8fr_0.8fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 text-sm leading-relaxed">
            Electricians for homes, offices and buildings in {siteConfig.city}: wiring, faults, DBs, lighting, AC, UPS,
            solar and CCTV. We don&apos;t do WAPDA/LESCO grid work.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="size-4 text-brand-bright" />
              <a href={`tel:${siteConfig.phoneE164}`} className="hover:text-white">{siteConfig.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <ClockIcon className="size-4 text-brand-bright" />
              {siteConfig.hours.label}
            </li>
            <li className="flex items-center gap-2.5">
              <PinIcon className="size-4 text-brand-bright" />
              {siteConfig.streetAddress || `${siteConfig.city}, Pakistan`}
            </li>
          </ul>
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-brand-bright hover:bg-white/5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V22H14v-10.3h2.6l.4-3.2h-3Z" />
              </svg>
              Follow on Facebook
            </a>
          )}
        </div>
        <FooterCol
          title="Electrical services"
          links={[
            ...categories.filter((c) => c.group === "electrical").map((c) => ({ href: `/services/${c.slug}`, label: c.name })),
            ...categories.filter((c) => c.group === "plumbing").map((c) => ({ href: `/services/${c.slug}`, label: `${c.name} (separate)` })),
          ]}
        />
        <FooterCol title="Company" links={company} />
        <FooterCol title="Legal" links={legal} />
      </div>
      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-white/50">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <p>Professional electrical services in {siteConfig.city}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-[0.14em] text-white uppercase" style={{ fontStretch: "100%" }}>
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
