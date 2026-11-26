"use client";

import { useState } from "react";
import { BoltIcon } from "@/components/icons";

export function Ticker({ items }: { items: readonly string[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="condensed flex items-center text-2xl font-extrabold whitespace-nowrap uppercase md:text-[2rem]">
          <span className="px-7">{t}</span>
          <BoltIcon className="size-6 text-spark" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What we do" className="bg-brand-gradient relative overflow-hidden py-5 text-white">
      <div className={`ticker-track flex w-max ${paused ? "[animation-play-state:paused]" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="ticker-toggle absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-ink"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}
