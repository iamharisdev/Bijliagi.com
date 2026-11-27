"use client";

import { useEffect, useState } from "react";
import type { CatalogEntry } from "@/content/services";
import { SearchDialog, SearchIcon } from "@/components/search-dialog";

export function HeaderActions({ catalog, showPrices }: { catalog: CatalogEntry[]; showPrices: boolean }) {
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

  return (
    <>
      <button
        type="button"
        className="relative flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-brand-soft hover:text-brand"
        onClick={() => setSearchOpen(true)}
        aria-label="Search services"
        title="Search ( / )"
      >
        <SearchIcon className="size-5" />
      </button>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} catalog={catalog} showPrices={showPrices} />
    </>
  );
}
