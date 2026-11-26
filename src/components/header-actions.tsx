"use client";

import { useEffect, useState } from "react";
import { useQuote } from "@/components/quote-provider";
import { QuoteDrawer } from "@/components/quote-drawer";
import { SearchDialog, SearchIcon } from "@/components/search-dialog";
import { QuoteListIcon } from "@/components/icons";

export function HeaderActions() {
  const { count, open } = useQuote();
  const [searchOpen, setSearchOpen] = useState(false);
  // "/" or Ctrl/Cmd+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const iconBtn = "relative flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-brand-soft hover:text-brand";

  return (
    <>
      <button type="button" className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search services" title="Search ( / )">
        <SearchIcon className="size-5" />
      </button>
      <button type="button" className={iconBtn} onClick={open} aria-label={`Quote list, ${count} ${count === 1 ? "item" : "items"}`}>
        <QuoteListIcon className="size-5" />
        {count > 0 && (
          // Re-keyed on every change so the bump animation replays.
          <span
            key={count}
            className="badge-bump absolute top-0.5 right-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[0.7rem] font-bold text-white tabular-nums ring-2 ring-white"
          >
            {count}
          </span>
        )}
      </button>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuoteDrawer />
    </>
  );
}
