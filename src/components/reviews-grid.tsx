"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

export type ReviewCardData = {
  id: string;
  name: string;
  area: string;
  service: string;
  rating: number;
  text: string;
  date?: string;
  sample?: boolean;
};

const PAGE = 6;

export function ReviewsGrid({ items }: { items: ReviewCardData[] }) {
  const [shown, setShown] = useState(PAGE);
  const visible = items.slice(0, shown);

  return (
    <>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((r, i) => (
          <li
            key={r.id}
            className="pop-in flex flex-col rounded-3xl border border-line bg-paper p-7 transition-shadow hover:shadow-card"
            style={{ animationDelay: `${(i % PAGE) * 50}ms`, animationFillMode: "both" }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex gap-0.5 text-spark" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <StarIcon key={s} className={cn("size-5", s >= r.rating && "text-line")} />
                ))}
              </span>
              {r.date && <span className="text-xs text-steel">{r.date}</span>}
            </div>
            <blockquote className="mt-4 flex-1 text-lg leading-relaxed whitespace-pre-line">&ldquo;{r.text}&rdquo;</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white uppercase">
                {r.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{r.name}</p>
                <p className="truncate text-sm text-steel">
                  {r.service}
                  {r.area && `, ${r.area}`}
                </p>
                {r.sample && <span className="mt-1 inline-block rounded bg-live/10 px-1.5 py-0.5 text-xs font-semibold text-live">Sample, dev only</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {items.length > shown && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="rounded-xl border-2 border-ink/15 bg-white px-6 py-3 font-semibold hover:border-brand hover:text-brand"
          >
            Show more reviews ({items.length - shown})
          </button>
        </div>
      )}
    </>
  );
}
