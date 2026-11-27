/**
 * Business details used across the whole site (header, footer, SEO, WhatsApp links).
 * Edit this file to change phone numbers, areas, hours, etc.
 */
export const siteConfig = {
  name: "Bijliagi.com",
  shortName: "Bijliagi",
  tagline: "Professional electrical services",
  description:
    "Electricians in Lahore for house and building wiring, fault finding, DBs and breakers, lighting, AC installation, generator and UPS, solar and CCTV. Written contracts and a work guarantee.",

  /** Production URL. Set NEXT_PUBLIC_SITE_URL in your hosting env. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bijliagi.com",

  /** Shown on the site, international format. */
  phoneDisplay: "+92 304 4041082",
  /** Used for tel: links. */
  phoneE164: "+923044041082",
  /** WhatsApp number in international format, digits only, no + or spaces. */
  whatsappNumber: "923044041082",
  email: "iamharisdev@gmail.com",

  city: "Lahore",
  region: "Punjab",
  country: "PK",
  /** Optional office address. Leave empty to show only the city. */
  streetAddress: "" as string,

  hours: {
    label: "Mon–Sat, 9:00 am – 8:00 pm",
    /** schema.org format for Google */
    schema: ["Mo-Sa 09:00-20:00"],
  },

  /**
   * Show service prices on the website? Prices stay saved in src/content/services.ts either way.
   * false = no prices anywhere; every service has a "Contact us" button that opens WhatsApp.
   */
  showPrices: false as boolean,

  /** Areas you currently cover. Shown on the site and sent to Google. */
  serviceAreas: [
    "DHA",
    "Gulberg",
    "Johar Town",
    "Model Town",
    "Bahria Town",
    "Garden Town",
    "Faisal Town",
    "Iqbal Town",
    "Valencia",
    "Cantt",
    "Township",
    "Lake City",
    "Central Park",
    "Wapda Town",
    "Allama Iqbal Town",
    "Sui gass society",
  ],

  social: {
    facebook: "https://www.facebook.com/Bijliwalagia/",
    instagram: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
