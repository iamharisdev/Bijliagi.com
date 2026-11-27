import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { whatsappUrl } from "@/lib/utils";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { JsonLd, PageHero } from "@/components/ui";
import { InquiryForm } from "@/components/inquiry-form";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Call or WhatsApp ${siteConfig.name} for electrical work in ${siteConfig.city}. ${siteConfig.hours.label}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const cards = [
    { href: `tel:${siteConfig.phoneE164}`, label: "Call us", value: siteConfig.phoneDisplay, Icon: PhoneIcon, tone: "bg-brand-soft text-brand", external: false },
    { href: whatsappUrl(), label: "WhatsApp", value: siteConfig.phoneDisplay, Icon: WhatsAppIcon, tone: "bg-wa/10 text-wa", external: true },
  ];
  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="Contact" title="Let's get your job done" intro="Tell us what you need. Photos of the site help us quote faster." />

      <div className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {cards.map(({ href, label, value, Icon, tone, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lift"
            >
              <span className={`flex size-14 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="size-6" />
              </span>
              <span>
                <span className="block text-sm text-steel">{label}</span>
                <span className="text-xl font-bold">{value}</span>
              </span>
            </a>
          ))}
          <dl className="space-y-5 rounded-3xl border border-line bg-white p-6">
            <div className="flex gap-3">
              <ClockIcon className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <dt className="text-sm text-steel">Hours</dt>
                <dd className="font-semibold">{siteConfig.hours.label}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <dt className="text-sm text-steel">Service area</dt>
                <dd className="font-semibold">{siteConfig.serviceAreas.join(", ")}, {siteConfig.city}</dd>
              </div>
            </div>
          </dl>
        </div>

        <section aria-labelledby="form-title" className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10">
          <h2 id="form-title" className="text-4xl">Send your requirement</h2>
          <p className="mt-2 text-steel">It opens WhatsApp with your message ready to send.</p>
          <div className="mt-8">
            <InquiryForm serviceOptions={categories.map((c) => c.name)} />
          </div>
        </section>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema("ContactPage", "/contact", `Contact ${siteConfig.name}`, `Call or WhatsApp ${siteConfig.phoneDisplay}. ${siteConfig.hours.label}.`)} />
    </>
  );
}
