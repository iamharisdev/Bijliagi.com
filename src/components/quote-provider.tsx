"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { CatalogEntry } from "@/content/services";
import { quoteStore, type QuoteLine } from "@/lib/quote-store";

type ResolvedLine = QuoteLine & { entry: CatalogEntry };

type QuoteContextValue = {
  catalog: CatalogEntry[];
  lines: ResolvedLine[];
  count: number;
  estimate: number;
  has: (key: string) => boolean;
  add: (key: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ catalog, children }: { catalog: CatalogEntry[]; children: ReactNode }) {
  const raw = useSyncExternalStore(quoteStore.subscribe, quoteStore.getSnapshot, quoteStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const byKey = useMemo(() => new Map(catalog.map((e) => [e.key, e])), [catalog]);

  // Drop keys that no longer exist in the catalog (e.g. a service was renamed).
  const lines = useMemo(
    () =>
      raw.flatMap((l) => {
        const entry = byKey.get(l.key);
        return entry ? [{ ...l, entry }] : [];
      }),
    [raw, byKey],
  );

  const add = useCallback((key: string, qty?: number) => {
    quoteStore.add(key, qty);
    setIsOpen(true);
  }, []);

  const value = useMemo<QuoteContextValue>(
    () => ({
      catalog,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      estimate: lines.reduce((sum, l) => sum + l.qty * l.entry.price, 0),
      has: (key) => lines.some((l) => l.key === key),
      add,
      setQty: quoteStore.setQty,
      remove: quoteStore.remove,
      clear: quoteStore.clear,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [catalog, lines, add, isOpen],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
