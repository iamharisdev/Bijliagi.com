import { siteConfig } from "@/content/site";
import type { Category, Faq, ItemWithCategory } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

const businessId = absoluteUrl("/#business");

const websiteId = absoluteUrl("/#website");

/** The business itself: shown on every page so Google and AI assistants know exactly who we are. */
export function businessSchema(categories: Category[]) {
  const sameAs = [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness"],
    "@id": businessId,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "Bijliagi Services", "Bijli Agi"],
    description: siteConfig.description,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    image: [absoluteUrl("/images/about.jpg"), absoluteUrl("/opengraph-image")],
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.png"), width: 464, height: 490 },
    ...(siteConfig.showPrices ? { priceRange: "Rs" } : {}),
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank transfer",
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.streetAddress ? { streetAddress: siteConfig.streetAddress } : {}),
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: siteConfig.hours.days.map((d) => `https://schema.org/${d}`),
        opens: siteConfig.hours.opens,
        closes: siteConfig.hours.closes,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.phoneE164,
        url: `https://wa.me/${siteConfig.whatsappNumber}`,
        areaServed: siteConfig.country,
        availableLanguage: ["Urdu", "English", "Punjabi"],
      },
    ],
    areaServed: [
      { "@type": "City", name: siteConfig.city, containedInPlace: { "@type": "Country", name: "Pakistan" } },
      ...siteConfig.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, ${siteConfig.city}` })),
    ],
    knowsAbout: categories.flatMap((c) => [c.name, ...c.items.map((i) => i.name)]),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical services",
      itemListElement: categories.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        url: absoluteUrl(`/services/${c.slug}`),
        itemListElement: c.items.map((i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: i.name,
            description: i.summary,
            url: absoluteUrl(`/services/${c.slug}/${i.slug}`),
          },
        })),
      })),
    },
  };
}

/** The website as a whole (helps search engines show the right site name). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    inLanguage: "en-PK",
    publisher: { "@id": businessId },
  };
}

/** A specific page (About, Contact, FAQ...). */
export function webPageSchema(type: "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage" | "WebPage", path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    inLanguage: "en-PK",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.name,
      itemListElement: items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.name, url: absoluteUrl(i.href) } })),
    },
    ...(siteConfig.showPrices ? { offers: items.map(offer) } : {}),
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
    ...(siteConfig.showPrices ? { offers: offer(item) } : {}),
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
