"use client";

import { useState } from "react";
import type { CategoryIcon } from "@/content/services";
import { cn } from "@/lib/utils";
import { ItemCard, type ItemCardData } from "@/components/item-card";
import { BoltIcon, CategoryGlyph } from "@/components/icons";

export function FilterableGrid({
  items,
  categories,
}: {
  items: ItemCardData[];
  categories: Array<{ slug: string; short: string; icon: CategoryIcon }>;
}) {
  const [active, setActive] = useState("all");
  const tabs = categories.filter((c) => items.some((i) => i.categorySlug === c.slug));
  const visible = active === "all" ? items : items.filter((i) => i.categorySlug === active);
  const tabClass = (on: boolean) =>
    cn(
      "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200",
      on
        ? "border-brand bg-brand text-white shadow-[0_8px_18px_-8px_rgb(22_103_217/0.8)]"
        : "border-line bg-white text-ink hover:border-brand hover:text-brand",
    );

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")} className={tabClass(active === "all")}>
          <BoltIcon className="size-4" />
          All
          <span className="opacity-60">{items.length}</span>
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            aria-pressed={active === tab.slug}
            onClick={() => setActive(tab.slug)}
            className={tabClass(active === tab.slug)}
          >
            <CategoryGlyph icon={tab.icon} className="size-4" />
            {tab.short}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} services
      </p>
      <div key={active} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item, i) => (
          <div key={item.key} className="pop-in h-full" style={{ animationDelay: `${Math.min(i, 8) * 40}ms`, animationFillMode: "both" }}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
