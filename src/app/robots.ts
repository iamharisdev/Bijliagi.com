import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    // Private review pages are also marked noindex; this keeps crawlers away from them.
    rules: { userAgent: "*", allow: "/", disallow: ["/review/", "/review-admin/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
