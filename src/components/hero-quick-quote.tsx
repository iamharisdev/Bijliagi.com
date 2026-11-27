"use client";

import Link from "next/link";
import { useState } from "react";
import type { CategoryIcon } from "@/content/services";
import { cn, formatPKR, serviceWhatsappUrl } from "@/lib/utils";
import { ArrowRightIcon, CategoryGlyph, WhatsAppIcon } from "@/components/icons";

export type QuickQuoteCategory = {
  slug: string;
  short: string;
  icon: CategoryIcon;
  href: string;
  count: number;
  items: Array<{ key: string; name: string; summary: string; price: number; unit: string; from?: boolean }>;
};

/** Hero card: pick a service type, see the main services, contact us on WhatsApp about any of them. */
export function HeroQuickQuote({ categories, showPrices }: { categories: QuickQuoteCategory[]; showPrices: boolean }) {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((c) => c.slug === active) ?? categories[0];

  return (
    <div className="pop-in rounded-3xl border border-white/15 bg-white/[0.08] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl">
      <div className="rounded-[1.25rem] bg-white p-5 text-ink sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">Our services</p>
            <h2 className="mt-1 text-2xl">What do you need done?</h2>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-wa/10 px-3 py-1 text-xs font-semibold text-wa">
            <span className="live-dot size-2 rounded-full bg-wa" />
            Online now
          </span>
        </div>

        <div role="tablist" aria-label="Service type" className="mt-5 grid grid-cols-4 gap-2">
          {categories.map((c) => {
            const selected = c.slug === current.slug;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="quick-quote-panel"
                onClick={() => setActive(c.slug)}
                className={cn(
                  "group flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 text-[0.7rem] leading-tight font-semibold transition-all duration-200",
                  selected
                    ? "border-brand bg-brand text-white shadow-[0_8px_18px_-8px_rgb(22_103_217/0.8)]"
                    : "border-line text-steel hover:-translate-y-0.5 hover:border-brand hover:text-brand",
                )}
              >
                <CategoryGlyph icon={c.icon} className="size-6" />
                <span className="line-clamp-1">{c.short}</span>
              </button>
            );
          })}
        </div>

        <ul id="quick-quote-panel" role="tabpanel" aria-label={current.short} className="mt-4 divide-y divide-line">
          {current.items.map((item, i) => (
            <li key={item.key} className="word-in flex items-center gap-3 py-3" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="truncate text-sm text-steel tabular-nums">
                  {showPrices ? (
                    <>
                      {item.from && "from "}
                      <span className="font-bold text-brand-deep">{formatPKR(item.price)}</span> {item.unit}
                    </>
                  ) : (
                    item.summary
                  )}
                </p>
              </div>
              <a
                href={serviceWhatsappUrl(item.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact us about ${item.name} on WhatsApp`}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-wa px-3 text-sm font-semibold text-white transition-colors hover:bg-[#178f47]"
              >
                <WhatsAppIcon className="size-4" />
                Contact
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-3 border-t border-line pt-4">
          <Link href={current.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            All {current.count} {current.short.toLowerCase()} services
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
