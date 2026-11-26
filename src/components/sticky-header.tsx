"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Sticky header: once the page scrolls, the info bar slides away and a shadow appears. */
export function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[top,box-shadow] duration-300",
        scrolled && "shadow-[0_10px_30px_-18px_rgb(10_26_51/0.45)] md:-top-10",
      )}
    >
      {children}
    </header>
  );
}
