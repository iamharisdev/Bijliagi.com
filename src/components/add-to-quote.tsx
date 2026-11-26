"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuote } from "@/components/quote-provider";
import { QtyStepper } from "@/components/quote-drawer";
import { CheckIcon } from "@/components/icons";

export function AddToQuoteButton({ itemKey, className }: { itemKey: string; className?: string }) {
  const { has, add } = useQuote();
  const added = has(itemKey);
  return (
    <button
      type="button"
      onClick={() => add(itemKey)}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
        added ? "bg-brand-soft text-brand hover:bg-brand hover:text-white" : "bg-ink text-white hover:bg-brand",
        className,
      )}
    >
      {added ? <CheckIcon className="size-4" /> : <span aria-hidden="true" className="text-base leading-none">+</span>}
      {added ? "In quote list" : "Add to quote"}
    </button>
  );
}

/** Item page: quantity + add. */
export function AddToQuoteWithQty({ itemKey, name, unit }: { itemKey: string; name: string; unit: string }) {
  const { add, has } = useQuote();
  const [qty, setQty] = useState(1);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <QtyStepper label={name} value={qty} onChange={setQty} size="lg" />
        <span className="text-sm text-steel">{unit.replace(/^per /, "")}</span>
      </div>
      <button
        type="button"
        onClick={() => add(itemKey, qty)}
        className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-6 font-semibold text-white shadow-[0_10px_24px_-10px_rgb(22_103_217/0.7)] transition-all hover:bg-brand-deep active:scale-[0.98]"
      >
        {has(itemKey) ? "Add more to quote" : "Add to quote list"}
      </button>
    </div>
  );
}
