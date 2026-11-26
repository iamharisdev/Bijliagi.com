"use client";

import Link from "next/link";
import { useState } from "react";
import type { CategoryIcon } from "@/content/services";
import { siteConfig } from "@/content/site";
import { whatsappUrl } from "@/lib/utils";
import { Modal } from "@/components/modal";
import { CategoryGlyph, CloseIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function MobileMenu({
  nav,
  categories,
}: {
  nav: Array<{ href: string; label: string }>;
  categories: Array<{ slug: string; name: string; icon: CategoryIcon; group: "electrical" | "plumbing" }>;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-1 flex size-11 items-center justify-center rounded-xl border border-line bg-white lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" className="size-5" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M10 17h10" />
        </svg>
      </button>

      <Modal open={open} onClose={close} label="Menu" className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm">
        <div className="drawer-in flex h-full flex-col overflow-y-auto bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="condensed text-2xl font-extrabold">Menu</p>
            <button type="button" onClick={close} className="flex size-10 items-center justify-center rounded-xl hover:bg-paper" aria-label="Close menu">
              <CloseIcon className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-3 py-3">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={close} className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-brand-soft hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line px-5 py-4">
            <p className="text-xs font-bold tracking-[0.14em] text-steel uppercase">Electrical services</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {categories.filter((c) => c.group === "electrical").map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/services/${c.slug}`}
                    onClick={close}
                    className="flex h-full flex-col gap-2 rounded-xl border border-line p-3 text-sm font-semibold hover:border-brand hover:text-brand"
                  >
                    <CategoryGlyph icon={c.icon} className="size-6 text-brand" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            {categories
              .filter((c) => c.group === "plumbing")
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${c.slug}`}
                  onClick={close}
                  className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-line p-3 text-sm font-semibold hover:border-brand hover:text-brand"
                >
                  <CategoryGlyph icon={c.icon} className="size-5 text-steel" />
                  {c.name}
                  <span className="ml-auto text-xs font-medium text-steel">Separate service</span>
                </Link>
              ))}
          </div>

          <div className="mt-auto grid gap-2 border-t border-line p-5">
            <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink/15 py-3 font-semibold">
              <PhoneIcon className="size-4" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-wa py-3 font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp us
            </a>
            <p className="text-center text-sm text-steel">{siteConfig.hours.label}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
