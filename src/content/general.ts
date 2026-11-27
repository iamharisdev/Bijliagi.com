import { siteConfig } from "@/content/site";

/**
 * Home page and site-wide copy. Edit freely.
 * Items marked PLACEHOLDER must be replaced with real information before launch.
 */

export const hero = {
  kicker: "Lahore's in-house electrician team",
  /** The title reads: titleStart, then the rotating words on the next line. */
  titleStart: "Expert electricians",
  rotatingWords: ["for wiring", "for fault repair", "for AC fitting", "for solar", "for UPS & generator", "for CCTV"],
  body: "Trained electricians for everything from the meter onwards: wiring, DBs, faults, lighting, AC, UPS, solar and CCTV. Tell us what you need on WhatsApp and we send a trained technician.",
  /** Background video for the banner. Replace with your own clip (keep it short and silent). */
  video: "/videos/hero-electrician.mp4",
  poster: "/images/videos/hero-electrician.jpg",
} as const;

/** Trust points shown in the banner and on service pages. PLACEHOLDER values. */
export const highlights = [
  { title: "Visit within 24 hours", body: "Across our Lahore service areas" },
  { title: "Written contract", body: "On larger and building jobs" },
  { title: "Work guarantee", body: "We come back if our work fails" },
] as const;

/** Count-up stats bar under the banner. PLACEHOLDERS: replace with your real numbers. */
export const stats = [
  { value: 5000, suffix: "+", label: "Jobs completed" },
  { value: 15, suffix: "", label: "Trained technicians" },
  { value: 35, suffix: "+ yrs", label: "Years of experience" },
  { value: siteConfig.serviceAreas.length, suffix: "", label: "Areas covered" },
] as const;

/** Scrolling ticker words. */
export const tickerItems = [
  "House wiring",
  "AC installation",
  "Solar systems",
  "CCTV cameras",
  "Generator & UPS",
  "Chandeliers & lights",
  "Fault finding",
  "DB boxes & breakers",
  "Earthing",
  "Written contracts",
] as const;

/**
 * "See our work" video section.
 * PLACEHOLDER stock clips: replace `src` and `poster` with your own job videos
 * (MP4 in /public/videos, poster JPG in /public/images/videos). Keep clips under ~30 seconds.
 */
export const videos = [
  {
    title: "Concealed wiring for a new house",
    category: "House wiring",
    href: "/services/house-building-wiring",
    src: "/videos/house-wiring.mp4",
    poster: "/images/videos/house-wiring.jpg",
    orientation: "landscape",
  },
  {
    title: "Fault repair and safe re-connection",
    category: "Faults & panels",
    href: "/services/fault-finding-panels",
    src: "/videos/hero-electrician.mp4",
    poster: "/images/videos/hero-electrician.jpg",
    orientation: "landscape",
  },
  {
    title: "Rooftop solar installation",
    category: "Solar",
    href: "/services/solar-energy",
    src: "/videos/solar-installation.mp4",
    poster: "/images/videos/solar-installation.jpg",
    orientation: "landscape",
  },
  {
    title: "Panel mounting on a house roof",
    category: "Solar",
    href: "/services/solar-energy",
    src: "/videos/solar-rooftop.mp4",
    poster: "/images/videos/solar-rooftop.jpg",
    orientation: "portrait",
  },
  // Plumbing video: hidden while plumbing services are hidden. Remove the "// " to show it again.
  // {
  //   title: "Tap and pipe leak repair",
  //   category: "Plumbing",
  //   href: "/services/plumbing-services",
  //   src: "/videos/plumbing-repair.mp4",
  //   poster: "/images/videos/plumbing-repair.jpg",
  //   orientation: "landscape",
  // },
] as const;

export type VideoEntry = (typeof videos)[number];

/** About section. */
export const story = {
  title: "A proper team, not a one-man call-out",
  body: "Bijliagi.com was started to fix what goes wrong with electrical work in Pakistan: unclear rates, half-finished jobs and shortcuts on safety. We work as a trained in-house team of electricians, agree the scope in writing and test everything before we leave.",
  image: "/images/about.jpg",
  imageAlt: "Bijliagi team on a building site",
} as const;

/** About page highlight: 35 years of experience, now online, live videos coming. */
export const journey = {
  eyebrow: "Our journey",
  title: "35 years on site. Now online.",
  body: "We have been doing electrical work for more than 35 years, long before anyone booked an electrician on the internet. Customers found us by word of mouth and kept coming back. The way people find and book services has changed a lot since then, so we are moving with the times: Bijliagi.com brings the same experienced team online, and easy to reach on WhatsApp.",
  steps: [
    {
      label: "Then",
      title: "Trusted by word of mouth",
      body: "35 years of homes, shops and buildings wired and repaired. Trust earned one job at a time.",
    },
    {
      label: "Now",
      title: "Online and one message away",
      body: "Message us on WhatsApp from your phone, get a quick reply, and the same experienced team at your door.",
    },
    {
      label: "Next",
      title: "Our work, live on video",
      body: "Step by step we are adding real videos from our job sites, so you can see the quality of our work before you call.",
      soon: true,
    },
  ],
  note: "Our experience is 35 years old, our website is new. Thank you for bearing with us while it grows.",
} as const;

export const processSteps = [
  {
    title: "Choose your service",
    body: "Browse our services and tap Contact us on the one you need.",
  },
  {
    title: "Book a visit on WhatsApp",
    body: "Send the list on WhatsApp, or call us. Photos of the site help us quote faster.",
  },
  {
    title: "Agree the scope",
    body: "We confirm the final quote, after a site visit if needed. Larger jobs get a written contract.",
  },
  {
    title: "Our team does the work",
    body: "A trained team arrives on the agreed date, works to safety standards and tests everything before handover.",
  },
] as const;

export const commitments = [
  {
    title: "Price first, work second",
    body: "You know the price before we start. Anything extra is agreed with you first, never added to the bill later.",
  },
  {
    title: "Written contract",
    body: "Scope, rate, material, timeline and payment terms in writing before work starts on larger jobs.",
  },
  {
    title: "Safety on every job",
    body: "Proper earthing, correct wire gauge, rated breakers, and the power cut before we touch a circuit.",
  },
  {
    title: "Clean finish",
    body: "Straight conduit, aligned plates, labelled DB, sealed joints, and the site swept before we leave.",
  },
  {
    title: "Trained in-house team",
    body: "Our own technicians, not random call-outs. The same electricians who quote are accountable for the work.",
  },
  {
    title: "Work guarantee",
    body: "If something we fitted fails because of our workmanship, we come back and fix it.",
  },
] as const;

/**
 * Reviews you add by hand (most reviews now come in through the private review link, see README).
 * Add REAL reviews only, e.g.:
 *   { name: "Ahmed", area: "DHA", service: "House re-wiring", quote: "Neat work, finished on time." },
 */
export const testimonials: Array<{
  name: string;
  area: string;
  service: string;
  quote: string;
  sample?: boolean;
}> = [];

export const closing = {
  title: "Pay in stages, not upfront",
  body: "Cash or bank transfer. Larger jobs are paid in milestones written into the contract.",
} as const;

export const scopeNote = {
  title: "What we don't do",
  body: "Grid work belongs to WAPDA/LESCO: new meters, connections, poles and street lines. We do everything inside your home or building, from the meter onwards.",
} as const;

export const generalFaqs = [
  {
    question: "Which cities do you cover?",
    answer: "We currently cover Lahore. More cities are coming. Larger contract jobs elsewhere can be discussed.",
  },
  {
    question: "How do I get a price?",
    answer:
      "Message us on WhatsApp with the work you need and your area; photos help. We reply with a price, after a site visit if needed, and it is agreed with you before any work starts.",
  },
  {
    question: "Do you supply wire and material?",
    answer:
      "Yes. We can supply wire, breakers, fittings, solar equipment and cameras at market price, or use material you buy. It is listed separately in the quote.",
  },
  {
    question: "How do I book?",
    answer:
      "Tap Contact us on the service you need. WhatsApp opens with the service name filled in; add your area and a few words about the job. We reply with the price and a visit time.",
  },
  // Plumbing FAQ: hidden while plumbing services are hidden. Remove the "// " to show it again.
  // {
  //   question: "Do you also do plumbing?",
  //   answer:
  //     "Yes, through a separate plumbing team: leaks, pipe fitting, water motors, geysers, bathroom fittings and tank cleaning. Electrical work is our main focus.",
  // },
  {
    question: "Do you take commercial and building contracts?",
    answer: "Yes. We handle offices, shops, plazas and new buildings under a written contract with a set timeline.",
  },
] as const;
