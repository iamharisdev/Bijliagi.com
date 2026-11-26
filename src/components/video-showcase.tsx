"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { VideoEntry } from "@/content/general";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, PlayIcon } from "@/components/icons";

export function VideoShowcase({ videos }: { videos: readonly VideoEntry[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = videos[active];

  // Start the chosen clip once it is selected (the <video> remounts per clip via `key`).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playing) return;
    v.play().catch(() => setPlaying(false));
  }, [active, playing]);

  function play(index: number) {
    setActive(index);
    setPlaying(true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.65fr_1fr]">
      {/* Main player */}
      <div className="relative overflow-hidden rounded-3xl bg-black shadow-lift" data-reveal>
        <div className="relative aspect-video h-full lg:aspect-auto lg:min-h-[26rem]">
          <video
            ref={videoRef}
            key={current.src}
            src={current.src}
            poster={current.poster}
            muted
            playsInline
            loop
            preload="none"
            controls={playing}
            onPause={(e) => {
              if (e.currentTarget.ended) setPlaying(false);
            }}
            aria-label={current.title}
            className={cn("absolute inset-0 size-full", current.orientation === "portrait" ? "object-contain" : "object-cover")}
          />
          {!playing && (
            <button
              type="button"
              onClick={() => play(active)}
              className="group absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-6 text-left text-white md:p-8"
              aria-label={`Play video: ${current.title}`}
            >
              <span className="pulse-ring absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:scale-110 md:size-24">
                <PlayIcon className="ml-1 size-8 md:size-10" />
              </span>
              <span className="text-sm font-semibold text-spark">{current.category}</span>
              <span className="condensed mt-1 text-3xl font-extrabold md:text-4xl">{current.title}</span>
            </button>
          )}
        </div>
      </div>

      {/* Playlist */}
      <div className="flex flex-col gap-3" data-reveal>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {videos.map((v, i) => {
            const selected = i === active;
            return (
              <li key={v.src + v.title}>
                <button
                  type="button"
                  onClick={() => play(i)}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-2xl border p-2.5 text-left transition-all duration-200",
                    selected
                      ? "border-brand-bright/60 bg-white/10"
                      : "border-white/10 hover:border-white/30 hover:bg-white/5",
                  )}
                >
                  <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-black">
                    <Image src={v.poster} alt="" fill sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/30">
                      <span className={cn("flex size-8 items-center justify-center rounded-full", selected && playing ? "bg-spark text-ink" : "bg-white/90 text-ink")}>
                        <PlayIcon className="ml-0.5 size-3.5" />
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-brand-bright">{v.category}</span>
                    <span className="mt-0.5 line-clamp-2 block font-semibold text-white">{v.title}</span>
                    {selected && playing && <span className="mt-1 block text-xs text-spark">Now playing</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <Link
          href={current.href}
          className="group mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-white hover:text-spark"
        >
          See {current.category.toLowerCase()} services and rates
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
