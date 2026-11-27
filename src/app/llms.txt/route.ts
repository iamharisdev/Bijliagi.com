import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { commitments, generalFaqs, scopeNote } from "@/content/general";
import { absoluteUrl } from "@/lib/utils";

/**
 * /llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Claude, Perplexity, Gemini).
 * Built from the same content files as the website, so it never goes out of date.
 */
export function GET() {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Key facts",
    `- Business: ${siteConfig.name} (also known as ${siteConfig.shortName} / Bijliagi Services), professional electrical services`,
    `- Experience: ${siteConfig.yearsExperience}+ years in electrical work; a trained in-house team of electricians`,
    `- Location: ${siteConfig.city}, ${siteConfig.region}, Pakistan`,
    `- Areas served in ${siteConfig.city}: ${siteConfig.serviceAreas.join(", ")}`,
    `- Hours: ${siteConfig.hours.label}`,
    `- Phone / WhatsApp: ${siteConfig.phoneDisplay} (https://wa.me/${siteConfig.whatsappNumber})`,
    `- Email: ${siteConfig.email}`,
    `- Website: ${siteConfig.url}`,
    "- How to book: message on WhatsApp with the service and area; the price is agreed before any work starts",
    `- Not offered: ${scopeNote.body}`,
    "",
    "## Services",
  ];
  for (const c of categories) {
    lines.push("", `### ${c.name}`, c.description, `Page: ${absoluteUrl(`/services/${c.slug}`)}`);
    for (const i of c.items) lines.push(`- [${i.name}](${absoluteUrl(`/services/${c.slug}/${i.slug}`)}): ${i.summary}`);
  }
  lines.push("", "## How we work");
  for (const c of commitments) lines.push(`- ${c.title}: ${c.body}`);
  lines.push("", "## Frequently asked questions");
  for (const f of [...generalFaqs, ...categories.flatMap((c) => c.faqs)]) lines.push("", `Q: ${f.question}`, `A: ${f.answer}`);
  lines.push(
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")})`,
    `- [All services](${absoluteUrl("/services")})`,
    `- [About us](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    `- [FAQ](${absoluteUrl("/faq")})`,
    "",
  );
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
