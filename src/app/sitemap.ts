import type { MetadataRoute } from "next";
import { allItems, categories, RATES_LAST_UPDATED } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(RATES_LAST_UPDATED);
  const page = (path: string, priority: number) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page("/", 1),
    page("/services", 0.9),
    ...categories.map((c) => page(`/services/${c.slug}`, 0.85)),
    ...allItems.map((i) => page(i.href, 0.7)),
    page("/about", 0.5),
    page("/faq", 0.5),
    page("/contact", 0.6),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
