import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const privatePaths = ["/review/", "/review-admin/"];

/**
 * /robots.txt
 * Search engines and AI assistants (ChatGPT, Claude, Perplexity, Google AI) may read the whole public site,
 * so they can recommend us. Private review pages are blocked (they are also marked noindex).
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt"], disallow: privatePaths },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
