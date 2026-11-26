import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { whatsappUrl } from "@/lib/utils";
import { ArrowRightIcon, CategoryGlyph, ChevronDownIcon, ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { HeaderActions } from "@/components/header-actions";
import { MobileMenu } from "@/components/mobile-menu";
import { StickyHeader } from "@/components/sticky-header";
import { buttonClass, defaultWaMessage } from "@/components/ui";
import logoMark from "../../public/brand/logo-mark.png";

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  // { href: "/#videos", label: "Our work" }, (video section hidden)
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
      <Image src={logoMark} alt="" priority className="h-11 w-auto" sizes="52px" />
      <span className="leading-none">
        <span className={`condensed block text-[1.45rem] font-extrabold tracking-tight uppercase ${tone === "dark" ? "text-brand-deep" : "text-white"}`}>
          {siteConfig.shortName}
          <span className="text-brand-bright">.com</span>
        </span>
        <span className={`mt-0.5 hidden text-[0.62rem] sm:block font-semibold tracking-[0.16em] uppercase ${tone === "dark" ? "text-steel" : "text-white/60"}`}>
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const menuCategories = categories.map((c) => ({ slug: c.slug, name: c.name, icon: c.icon, group: c.group }));
  const electrical = menuCategories.filter((c) => c.group === "electrical");
  const plumbing = menuCategories.filter((c) => c.group === "plumbing");

  return (
    <StickyHeader>
      {/* Info bar */}
      <div className="hidden bg-ink text-white/75 md:block">
        <div className="wrap flex h-10 items-center justify-between text-[0.8rem]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4 text-brand-bright" />
              {siteConfig.hours.label}
            </span>
            <span className="flex items-center gap-1.5">
              <PinIcon className="size-4 text-brand-bright" />
              Serving {siteConfig.serviceAreas.length}+ areas in {siteConfig.city}
            </span>
          </div>
          <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center gap-1.5 font-semibold text-white hover:text-spark">
            <PhoneIcon className="size-3.5" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-line bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-[0.95rem] font-semibold">
              {mainNav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href} className="group relative">
                    <Link
                      href="/services"
                      className="flex items-center gap-1 rounded-lg px-3.5 py-2 hover:bg-brand-soft hover:text-brand"
                      aria-haspopup="true"
                    >
                      Services
                      <ChevronDownIcon className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                    </Link>
                    {/* Mega menu: opens on hover and keyboard focus */}
                    <div className="invisible absolute top-full left-1/2 w-[40rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl border border-line bg-white p-3 shadow-lift">
                        <p className="px-3 pt-1 pb-2 text-xs font-bold tracking-[0.14em] text-steel uppercase">Electrical services</p>
                        <ul className="grid grid-cols-2 gap-1">
                          {electrical.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/services/${c.slug}`}
                                className="group/item flex items-center gap-3 rounded-xl p-3 hover:bg-brand-soft"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                                  <CategoryGlyph icon={c.icon} className="size-5" />
                                </span>
                                <span className="font-semibold">{c.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {plumbing.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/services/${c.slug}`}
                            className="group/item mt-2 flex items-center gap-3 rounded-xl border border-dashed border-line p-3 hover:border-brand hover:bg-brand-soft"
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-paper text-steel transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                              <CategoryGlyph icon={c.icon} className="size-5" />
                            </span>
                            <span className="font-semibold">{c.name}</span>
                            <span className="ml-auto rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold text-steel">Separate service</span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="group/all mt-2 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm text-white hover:bg-brand-deep"
                        >
                          <span>
                            <strong>All services &amp; rate list</strong>
                            <span className="ml-2 text-white/60">Add to your quote and send on WhatsApp</span>
                          </span>
                          <ArrowRightIcon className="size-4 transition-transform group-hover/all:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-lg px-3.5 py-2 hover:bg-brand-soft hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <HeaderActions />
            <a
              href={whatsappUrl(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("wa", "ml-2 px-4 py-2.5 text-sm max-md:hidden")}
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
            <MobileMenu nav={mainNav} categories={menuCategories} />
          </div>
        </div>
      </div>
    </StickyHeader>
  );
}
