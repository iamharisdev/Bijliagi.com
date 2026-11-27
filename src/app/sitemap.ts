import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { allItems, categories } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

/** /sitemap.xml: every public page, with photos for Google Images. Private review pages are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const page = (path: string, priority: number, images?: string[]) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    ...(images?.length ? { images: images.map((i) => absoluteUrl(i)) } : {}),
  });
  return [
    page("/", 1, ["/images/about.jpg"]),
    page("/services", 0.9),
    ...categories.map((c) => page(`/services/${c.slug}`, 0.85, [c.image])),
    ...allItems.map((i) => page(i.href, 0.7, [i.image])),
    page("/about", 0.6, ["/images/about.jpg"]),
    page("/contact", 0.6),
    page("/faq", 0.5),
    page("/privacy", 0.2),
    page("/terms", 0.2),
  ];
}
