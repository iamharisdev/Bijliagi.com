import { siteConfig } from "@/content/site";
import type { Category, Faq, ItemWithCategory } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

const businessId = absoluteUrl("/#business");

export function businessSchema(categories: Category[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": businessId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    image: absoluteUrl("/images/about.jpg"),
    logo: absoluteUrl("/brand/logo.png"),
    priceRange: "Rs",
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.streetAddress ? { streetAddress: siteConfig.streetAddress } : {}),
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    openingHours: siteConfig.hours.schema,
    areaServed: [
      { "@type": "City", name: siteConfig.city },
      ...siteConfig.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, ${siteConfig.city}` })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical services",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: absoluteUrl(`/services/${c.slug}`),
      })),
    },
  };
}

function offer(item: Pick<ItemWithCategory, "name" | "price" | "unit" | "from" | "href">) {
  return {
    "@type": "Offer",
    name: item.name,
    url: absoluteUrl(item.href),
    priceCurrency: "PKR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "PKR",
      ...(item.from ? { minPrice: item.price } : { price: item.price }),
      unitText: item.unit,
    },
  };
}

export function categorySchema(category: Category, items: ItemWithCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    description: category.summary,
    serviceType: category.name,
    url: absoluteUrl(`/services/${category.slug}`),
    image: absoluteUrl(category.image),
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: siteConfig.city },
    offers: items.map(offer),
  };
}

export function itemSchema(item: ItemWithCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    description: item.summary,
    serviceType: item.categoryName,
    url: absoluteUrl(item.href),
    ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: siteConfig.city },
    offers: offer(item),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
