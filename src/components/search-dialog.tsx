"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPKR } from "@/lib/utils";
import { Modal } from "@/components/modal";
import { useQuote } from "@/components/quote-provider";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { catalog } = useQuote();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return catalog.slice(0, 6);
    return catalog.filter((e) => {
      const text = `${e.name} ${e.categoryName} ${e.unit}`.toLowerCase();
      return terms.every((t) => text.includes(t));
    });
  }, [query, catalog]);

  function handleClose() {
    setQuery("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} label="Search services" className="mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-xl">
      <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="size-5 shrink-0 text-steel" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: AC, wiring, chandelier…"
            aria-label="Search services"
            className="w-full py-4 text-lg focus:outline-none"
          />
          <button type="button" onClick={handleClose} className="rounded px-2 py-1 text-sm text-steel hover:bg-paper">
            Close
          </button>
        </div>
        <p className="px-4 pt-3 text-sm text-steel" aria-live="polite">
          {query ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Popular services"}
        </p>
        {results.length > 0 ? (
          <ul className="max-h-[55vh] overflow-y-auto p-2">
            {results.map((e) => (
              <li key={e.key}>
                <Link href={e.href} onClick={handleClose} className="flex items-center gap-3 rounded-lg p-2 hover:bg-paper">
                  {e.image ? (
                    <Image src={e.image} alt="" width={64} height={48} className="h-12 w-16 rounded object-cover" />
                  ) : (
                    <span aria-hidden="true" className="h-12 w-16 shrink-0 rounded bg-line" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{e.name}</span>
                    <span className="block truncate text-sm text-steel">{e.categoryName}</span>
                  </span>
                  <span className="text-right text-sm whitespace-nowrap tabular-nums">
                    <span className="block font-bold">
                      {e.from && "from "}
                      {formatPKR(e.price)}
                    </span>
                    <span className="text-steel">{e.unit}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-6 text-steel">
            No service matches &ldquo;{query}&rdquo;. Try a simpler word, or message us on WhatsApp.
          </p>
        )}
        <div className="border-t border-line px-4 py-3">
          <Link href="/services" onClick={handleClose} className="font-semibold underline decoration-brand decoration-2 underline-offset-4">
            View all services
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
