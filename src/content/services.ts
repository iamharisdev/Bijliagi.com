/**
 * SERVICES & RATES — the main file you edit.
 *
 * Structure: categories (e.g. "AC installation & service") each contain items
 * (e.g. "Split AC installation"). Every category and every item gets its own page.
 *
 * Update a rate:   change `price`. `from: true` shows "from Rs X".
 * Change a photo:  replace the .jpg in /public/images/ with the same name, or change `image`.
 *                  Items without `image` use their category photo.
 * Feature an item: `featured: true` shows it in "Most booked" on the home page.
 * Badge:           `badge: "Most booked"` (any short text) shows a label on the card.
 * Add an item:     copy an item object; `slug` must be unique inside its category.
 *
 * All prices are PKR labour rates. Values below are PLACEHOLDERS: replace with your real rates.
 */

export type Faq = { question: string; answer: string };

export type ServiceItem = {
  slug: string;
  name: string;
  /** e.g. "per point", "per unit" */
  unit: string;
  price: number;
  from?: boolean;
  note?: string;
  /** 1–2 sentences shown on the card and item page. */
  summary: string;
  /** Optional: leave out to use the category photo. */
  image?: string;
  imageAlt?: string;
  badge?: string;
  featured?: boolean;
};

export type CategoryIcon = "wiring" | "ac" | "generator" | "light" | "panel" | "solar" | "cctv" | "plumbing";

export type Category = {
  slug: string;
  name: string;
  /** Short name for tabs, menus and chips. */
  short: string;
  icon: CategoryIcon;
  /** Electrical work is the main business; plumbing is shown as a separate service. */
  group: "electrical" | "plumbing";
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  includes: string[];
  faqs: Faq[];
  items: ServiceItem[];
};

export const RATES_LAST_UPDATED = "2026-11-26";

export const categories: Category[] = [
  {
    slug: "house-building-wiring",
    name: "House & building wiring",
    short: "Wiring",
    icon: "wiring",
    group: "electrical",
    summary: "New wiring, re-wiring, concealed piping, earthing and DB boxes for homes and buildings.",
    description:
      "From a single room to a multi-storey building, we plan the circuits, lay concealed piping, pull the wire and fit the distribution board. Every job is earthed and tested before handover.",
    image: "/images/categories/house-building-wiring.jpg",
    imageAlt: "Electrician laying concealed wiring in a house under construction",
    includes: [
      "Circuit planning per room and load",
      "Concealed PVC piping and wire pulling",
      "Earth wire to every circuit",
      "Labelled DB box with breakers",
      "Testing and handover report",
    ],
    faqs: [
      {
        question: "What counts as one point?",
        answer: "One switch, socket or light outlet with its wiring back to the board is one point.",
      },
      {
        question: "Do rates include wire and material?",
        answer:
          "Rates are for labour. We can supply material at market price, or use material you buy. This is written into the contract.",
      },
    ],
    items: [
      {
        slug: "new-wiring",
        name: "New wiring",
        unit: "per point",
        price: 1500,
        summary: "Concealed wiring for a new house or extension, planned circuit by circuit.",
        image: "/images/items/new-wiring.jpg",
        imageAlt: "Wires pulled through new concealed conduit",
        badge: "Most booked",
        featured: true,
      },
      {
        slug: "re-wiring",
        name: "Re-wiring (old house)",
        unit: "per point",
        price: 1200,
        summary: "Replace old, overheating wiring with new copper wire on proper circuits.",
        image: "/images/items/re-wiring.jpg",
        imageAlt: "Old wiring being replaced in a house",
        featured: true,
      },
      {
        slug: "concealed-piping",
        name: "Concealed piping",
        unit: "per running ft",
        price: 60,
        summary: "PVC conduit cut into walls and ceilings before plaster.",
        image: "/images/items/concealed-piping.jpg",
        imageAlt: "PVC conduit laid in a brick wall",
      },
      {
        slug: "earthing-pit",
        name: "Earthing pit",
        unit: "per pit",
        price: 12000,
        summary: "Copper earthing pit with test reading, so faults go to ground, not to people.",
      },
      {
        slug: "db-box-installation",
        name: "DB box installation",
        unit: "per DB",
        price: 3500,
        summary: "Distribution board fitted, breakers sized to load, every circuit labelled.",
        image: "/images/items/db-box-installation.jpg",
        imageAlt: "Distribution board with labelled breakers",
      },
      {
        slug: "complete-house-wiring-5-marla",
        name: "Complete house wiring, 5 marla",
        unit: "package",
        price: 180000,
        from: true,
        note: "Labour only. Final quote after site visit.",
        summary: "Full wiring of a 5 marla house: piping, wiring, DB and earthing.",
        image: "/images/items/complete-house-wiring-5-marla.jpg",
        imageAlt: "House under construction ready for wiring",
        badge: "Package",
      },
    ],
  },
  {
    slug: "fault-finding-panels",
    name: "Fault finding & panels",
    short: "Faults & panels",
    icon: "panel",
    group: "electrical",
    summary: "Fault finding, load balancing, panel upgrades and maintenance contracts.",
    description:
      "Tripping breakers, sparking sockets, half the house without power: we trace the fault and fix it. For commercial sites we also take on panel upgrades and maintenance contracts.",
    image: "/images/categories/fault-finding-panels.jpg",
    imageAlt: "Electrician testing a distribution panel with a multimeter",
    includes: [
      "Fault tracing and repair",
      "Load balancing across phases",
      "Main panel and DB upgrades",
      "Monthly maintenance for offices and shops",
    ],
    faqs: [
      {
        question: "Is the visit charge adjusted in the repair bill?",
        answer: "Yes. If you go ahead with the repair, the visit charge is adjusted.",
      },
    ],
    items: [
      {
        slug: "fault-finding-visit",
        name: "Fault finding visit",
        unit: "per visit",
        price: 1500,
        summary: "We trace tripping, short circuits and dead points, then quote the fix.",
        image: "/images/items/fault-finding-visit.jpg",
        imageAlt: "Electrician using a multimeter on a socket",
        badge: "Most booked",
        featured: true,
      },
      {
        slug: "technician-hourly",
        name: "Technician",
        unit: "per hour",
        price: 1200,
        summary: "A trained electrician for small mixed jobs, billed by the hour.",
        image: "/images/items/technician-hourly.jpg",
        imageAlt: "Electrician with a tool bag",
      },
      {
        slug: "load-balancing",
        name: "Load balancing",
        unit: "per DB",
        price: 5000,
        summary: "Spread load evenly across phases to stop tripping and overheating.",
        image: "/images/items/load-balancing.jpg",
        imageAlt: "Three-phase distribution board",
      },
      {
        slug: "panel-upgrade",
        name: "Panel upgrade",
        unit: "per panel",
        price: 15000,
        from: true,
        summary: "Old main panel replaced with a safer, larger one.",
        image: "/images/items/panel-upgrade.jpg",
        imageAlt: "New main electrical panel",
      },
      {
        slug: "maintenance-contract",
        name: "Maintenance contract",
        unit: "per month",
        price: 8000,
        from: true,
        note: "For offices, shops and buildings.",
        summary: "Monthly checks and priority call-outs for commercial sites.",
        image: "/images/items/maintenance-contract.jpg",
        imageAlt: "Electrician inspecting an office panel",
        badge: "Commercial",
      },
    ],
  },
  {
    slug: "switch-plates-lighting",
    name: "Switch plates & lighting",
    short: "Lighting",
    icon: "light",
    group: "electrical",
    summary: "Switchboards, breakers, chandeliers, ceiling lights, spotlights and outdoor lighting.",
    description:
      "Changing old switchboards, hanging a heavy chandelier or adding spotlights to a false ceiling. We fit it neatly, aligned and secured, and clean up after.",
    image: "/images/categories/switch-plates-lighting.jpg",
    imageAlt: "Modern switch plate and ceiling spotlights",
    includes: [
      "Switchboard and socket replacement",
      "Breaker replacement",
      "Chandelier and fan fitting",
      "Spotlights and LED strips",
      "Outdoor and decorative lighting",
    ],
    faqs: [
      {
        question: "Is there a minimum charge?",
        answer: "Yes, small jobs have a minimum visit charge of Rs 1,000.",
      },
    ],
    items: [
      {
        slug: "switchboard-replacement",
        name: "Switchboard replacement",
        unit: "per board",
        price: 400,
        summary: "Old boards swapped for modern plates, aligned and tightened.",
        image: "/images/items/switchboard-replacement.jpg",
        imageAlt: "Modern white switch plate on a wall",
        featured: true,
      },
      {
        slug: "spotlight-installation",
        name: "Ceiling light or spotlight",
        unit: "per light",
        price: 350,
        summary: "Spotlights and ceiling lights in false ceilings, spaced evenly.",
        image: "/images/items/spotlight-installation.jpg",
        imageAlt: "Row of spotlights in a false ceiling",
        badge: "Most booked",
        featured: true,
      },
      {
        slug: "chandelier-fitting",
        name: "Chandelier fitting",
        unit: "per piece",
        price: 2500,
        from: true,
        summary: "Heavy chandeliers secured to a proper hook and wired safely.",
        image: "/images/items/chandelier-fitting.jpg",
        imageAlt: "Chandelier hanging in a living room",
      },
      {
        slug: "ceiling-fan-installation",
        name: "Ceiling fan installation",
        unit: "per fan",
        price: 1000,
        summary: "Fan hung, balanced and connected to a regulator.",
        image: "/images/items/ceiling-fan-installation.jpg",
        imageAlt: "Ceiling fan being installed",
        featured: true,
      },
      {
        slug: "breaker-replacement",
        name: "Breaker replacement",
        unit: "per breaker",
        price: 600,
        summary: "Faulty or undersized breakers replaced with correctly rated ones.",
        image: "/images/items/breaker-replacement.jpg",
        imageAlt: "Circuit breaker being replaced in a DB",
        featured: true,
      },
      {
        slug: "outdoor-lighting",
        name: "Outdoor / decorative light",
        unit: "per point",
        price: 800,
        summary: "Gate, garden and facade lights with weatherproof fittings.",
        image: "/images/items/outdoor-lighting.jpg",
        imageAlt: "Outdoor wall lights on a house facade",
      },
    ],
  },
  {
    slug: "ac-installation-service",
    name: "AC installation & service",
    short: "AC",
    icon: "ac",
    group: "electrical",
    summary: "Split and inverter AC installation, uninstallation, servicing and maintenance.",
    description:
      "We install split and inverter ACs on a dedicated circuit with the right breaker, so your AC and your wiring stay safe through summer. Servicing covers cleaning, gas check and electrical check.",
    image: "/images/categories/ac-installation-service.jpg",
    imageAlt: "Technician installing an outdoor split AC unit",
    includes: [
      "Dedicated circuit and breaker check",
      "Indoor and outdoor unit fitting",
      "Vacuuming and leak test",
      "Drain pipe routing",
      "Up to 10 ft copper pipe fitting",
    ],
    faqs: [
      {
        question: "Does installation include the copper pipe?",
        answer: "Up to 10 ft of pipe is included. Extra length is charged per foot.",
      },
    ],
    items: [
      {
        slug: "split-ac-installation",
        name: "Split AC installation",
        unit: "per unit",
        price: 3500,
        summary: "Indoor and outdoor unit fitted, vacuumed and tested on its own breaker.",
        image: "/images/items/split-ac-installation.jpg",
        imageAlt: "Split AC indoor unit being mounted on a wall",
        badge: "Most booked",
        featured: true,
      },
      {
        slug: "inverter-ac-installation",
        name: "Inverter AC installation",
        unit: "per unit",
        price: 4500,
        summary: "Inverter AC fitted with correct wire gauge and stabiliser-free setup.",
        image: "/images/items/inverter-ac-installation.jpg",
        imageAlt: "Inverter AC outdoor unit on a bracket",
        featured: true,
      },
      {
        slug: "ac-general-service",
        name: "AC general service",
        unit: "per unit",
        price: 2500,
        summary: "Coil wash, filter clean, gas pressure check and electrical check.",
        image: "/images/items/ac-general-service.jpg",
        imageAlt: "Technician washing an AC coil",
        badge: "Before summer",
        featured: true,
      },
      {
        slug: "ac-uninstallation",
        name: "AC uninstallation",
        unit: "per unit",
        price: 1500,
        summary: "Gas pumped down and unit removed safely for shifting.",
        image: "/images/items/ac-uninstallation.jpg",
        imageAlt: "AC unit being removed from a wall",
      },
      {
        slug: "extra-copper-pipe",
        name: "Extra copper pipe",
        unit: "per ft",
        price: 450,
        summary: "Additional insulated copper pipe beyond the included 10 ft.",
        image: "/images/items/extra-copper-pipe.jpg",
        imageAlt: "Insulated copper pipe coil",
      },
      {
        slug: "gas-charging",
        name: "Gas charging",
        unit: "per unit",
        price: 5000,
        from: true,
        summary: "Leak check and refrigerant top-up to the correct pressure.",
        image: "/images/items/gas-charging.jpg",
        imageAlt: "Gauges connected to an AC for gas charging",
      },
    ],
  },
  {
    slug: "generator-ups-wiring",
    name: "Generator & UPS wiring",
    short: "Generator & UPS",
    icon: "generator",
    group: "electrical",
    summary: "Generator wiring, UPS backup circuits, load distribution and changeover or ATS panels.",
    description:
      "We separate your essential load, such as fans, lights and the fridge, onto backup circuits so your UPS or generator runs what matters. Manual changeover or automatic ATS panels are available.",
    image: "/images/categories/generator-ups-wiring.jpg",
    imageAlt: "Changeover panel wired to a home generator",
    includes: [
      "Load survey and backup circuit plan",
      "Separate UPS/generator wiring",
      "Changeover switch or ATS panel",
      "Load balancing across phases",
    ],
    faqs: [
      {
        question: "Can you wire a UPS and generator together?",
        answer: "Yes. We set up a changeover so both feed the same backup circuits safely, without back-feeding.",
      },
    ],
    items: [
      {
        slug: "ups-backup-wiring",
        name: "UPS backup wiring",
        unit: "per circuit",
        price: 2500,
        summary: "Separate backup circuit so your UPS runs only essential load.",
        badge: "Most booked",
        featured: true,
      },
      {
        slug: "changeover-switch",
        name: "Changeover switch installation",
        unit: "per switch",
        price: 4000,
        summary: "Manual changeover between mains, UPS and generator.",
        image: "/images/items/changeover-switch.jpg",
        imageAlt: "Manual changeover switch on a wall",
      },
      {
        slug: "generator-wiring",
        name: "Generator wiring",
        unit: "per job",
        price: 10000,
        from: true,
        summary: "Generator connected to your DB with the right cable and protection.",
        image: "/images/items/generator-wiring.jpg",
        imageAlt: "Generator cable connected to a panel",
        featured: true,
      },
      {
        slug: "ats-panel-setup",
        name: "ATS panel setup",
        unit: "per panel",
        price: 25000,
        from: true,
        summary: "Automatic switch-over to generator when the grid goes off.",
        image: "/images/items/ats-panel-setup.jpg",
        imageAlt: "Automatic transfer switch panel",
        badge: "New",
      },
      {
        slug: "load-survey",
        name: "Load survey",
        unit: "per visit",
        price: 3000,
        summary: "We measure your load and tell you what size UPS or generator you need.",
        image: "/images/items/load-survey.jpg",
        imageAlt: "Clamp meter measuring load on a circuit",
      },
    ],
  },
  {
    slug: "solar-energy",
    name: "Solar energy systems",
    short: "Solar",
    icon: "solar",
    group: "electrical",
    summary: "On-grid, hybrid and off-grid solar: panels, inverters, batteries, cleaning and net-metering wiring.",
    description:
      "We size the system to your load, mount the structure, fit the panels and inverter, and wire it safely into your DB with proper DC and AC protection. Net-metering paperwork wiring and after-sales cleaning are covered too.",
    image: "/images/categories/solar-energy.jpg",
    imageAlt: "Solar panels on a house roof",
    includes: [
      "Load survey and system sizing",
      "Galvanised mounting structure",
      "DC breakers, SPD and earthing",
      "Inverter and battery wiring into your DB",
      "Mobile app monitoring setup",
    ],
    faqs: [
      {
        question: "Do you supply the panels and inverter?",
        answer:
          "Yes. We can supply tier-1 panels and a brand of inverter you choose at market price, or install equipment you have already bought. Material is listed separately in the quote.",
      },
      {
        question: "Can you help with net metering?",
        answer:
          "We do the wiring and the green meter side work inside your premises. The LESCO application and meter itself stay with LESCO, but we prepare the system to pass their inspection.",
      },
    ],
    items: [
      {
        slug: "solar-system-installation",
        name: "Solar system installation",
        unit: "per kW",
        price: 12000,
        from: true,
        summary: "Complete on-grid or hybrid system: structure, panels, inverter and safe DB wiring.",
        image: "/images/items/solar-system-installation.jpg",
        imageAlt: "Technician installing solar panels on a residential roof",
        badge: "New",
        featured: true,
      },
      {
        slug: "solar-inverter-installation",
        name: "Solar inverter installation",
        unit: "per inverter",
        price: 6000,
        summary: "Hybrid or on-grid inverter fitted, configured and connected to panels, batteries and DB.",
        image: "/images/items/solar-inverter-installation.jpg",
        imageAlt: "Electrician wiring an inverter into a distribution board",
      },
      {
        slug: "solar-panel-cleaning",
        name: "Solar panel cleaning",
        unit: "per panel",
        price: 250,
        summary: "Dust and bird droppings washed off so your panels produce at full output again.",
        image: "/images/items/solar-panel-cleaning.jpg",
        imageAlt: "Clean solar panels on a tiled roof",
        featured: true,
      },
      {
        slug: "net-metering-wiring",
        name: "Net-metering wiring",
        unit: "per job",
        price: 15000,
        from: true,
        summary: "Wiring and protection set up to meet LESCO green-meter requirements.",
      },
      {
        slug: "solar-maintenance-visit",
        name: "Solar check-up visit",
        unit: "per visit",
        price: 2500,
        summary: "Output check, loose connections, breaker and earthing test for an existing system.",
      },
    ],
  },
  {
    slug: "cctv-security",
    name: "CCTV & security",
    short: "CCTV",
    icon: "cctv",
    group: "electrical",
    summary: "CCTV cameras, DVR/NVR setup with mobile view, video door phones and intercoms.",
    description:
      "We plan camera positions to cover gates, doors and blind spots, run the cabling neatly in conduit, and set up recording and live view on your phone before we leave.",
    image: "/images/categories/cctv-security.jpg",
    imageAlt: "CCTV camera mounted on a building wall",
    includes: [
      "Site walk and camera position plan",
      "Cabling in conduit or trunking",
      "DVR/NVR setup and hard drive install",
      "Live view on your mobile",
      "Handover with recording playback demo",
    ],
    faqs: [
      {
        question: "Which camera brands do you install?",
        answer: "We install all common brands. We can supply cameras at market price, or fit the ones you bought.",
      },
      {
        question: "Can I see the cameras on my phone?",
        answer: "Yes. Mobile live view is set up on every system we install, at no extra charge.",
      },
    ],
    items: [
      {
        slug: "cctv-camera-installation",
        name: "CCTV camera installation",
        unit: "per camera",
        price: 1800,
        summary: "Bullet or dome camera mounted, cabled and focused on the area you want covered.",
        image: "/images/items/cctv-camera-installation.jpg",
        imageAlt: "Outdoor CCTV bullet camera on a wall",
        badge: "New",
        featured: true,
      },
      {
        slug: "dome-camera-installation",
        name: "Indoor dome camera",
        unit: "per camera",
        price: 1500,
        summary: "Ceiling dome cameras for halls, shops and offices, cabled out of sight.",
        image: "/images/items/dome-camera-installation.jpg",
        imageAlt: "White dome camera on a ceiling",
      },
      {
        slug: "dvr-nvr-setup",
        name: "DVR / NVR setup + mobile view",
        unit: "per system",
        price: 3500,
        summary: "Recorder installed and configured with hard drive, recording schedule and mobile app.",
        image: "/images/items/dvr-nvr-setup.jpg",
        imageAlt: "Security camera on an exterior wall",
        featured: true,
      },
      {
        slug: "video-door-phone",
        name: "Video door phone / intercom",
        unit: "per unit",
        price: 2500,
        summary: "See and talk to visitors at the gate from inside, with door-lock release if fitted.",
      },
      {
        slug: "cctv-service-visit",
        name: "CCTV repair visit",
        unit: "per visit",
        price: 1500,
        summary: "No video, blurry picture or app not working: we find and fix the fault.",
      },
    ],
  },
  // PLUMBING SERVICES: hidden for now.
  // To show plumbing on the website again, remove the "// " from the start of each line below.
//   {
//     slug: "plumbing-services",
//     name: "Plumbing services",
//     short: "Plumbing",
//     icon: "plumbing",
//     group: "plumbing",
//     summary: "A separate plumbing team for leaks, pipe fitting, water motors, geysers, bathroom fittings and tank cleaning.",
//     description:
//       "Our separate plumbing team handles dripping taps, low water pressure, new water lines, motors and geysers, with the same clear rates and clean finish as our electrical work.",
//     image: "/images/categories/plumbing-home-repair.jpg",
//     imageAlt: "Plumber fitting pipes with a wrench",
//     includes: [
//       "Leak tracing and repair",
//       "PPR and GI pipe fitting",
//       "Water motor and pump installation",
//       "Electric and gas geyser fitting",
//       "Bathroom and kitchen fittings",
//     ],
//     faqs: [
//       {
//         question: "Do you do complete bathroom renovation?",
//         answer:
//           "We do the plumbing side of a renovation, and our electricians can do the wiring in the same job. Tiling and masonry are not included.",
//       },
//     ],
//     items: [
//       {
//         slug: "leak-repair",
//         name: "Leak repair visit",
//         unit: "per visit",
//         price: 1500,
//         summary: "Dripping taps, leaking joints and seepage traced and fixed.",
//         image: "/images/items/leak-repair.jpg",
//         imageAlt: "Plumber tightening a pipe joint with a spanner",
//       },
//       {
//         slug: "pipe-fitting",
//         name: "Pipe fitting",
//         unit: "per point",
//         price: 900,
//         summary: "New water points or old GI lines replaced with PPR, pressure tested.",
//         image: "/images/items/pipe-fitting.jpg",
//         imageAlt: "Plumber fitting steel pipes",
//       },
//       {
//         slug: "water-motor-installation",
//         name: "Water motor / pump installation",
//         unit: "per motor",
//         price: 2500,
//         summary: "Motor fitted with proper wiring, switch, foot valve and non-return valve.",
//         badge: "Most booked",
//       },
//       {
//         slug: "geyser-installation",
//         name: "Geyser installation",
//         unit: "per geyser",
//         price: 3000,
//         summary: "Electric or gas geyser mounted, piped and wired with a dedicated breaker.",
//       },
//       {
//         slug: "bathroom-fittings",
//         name: "Bathroom / kitchen fitting",
//         unit: "per fitting",
//         price: 700,
//         summary: "Taps, mixers, showers, commodes and sinks fitted and sealed.",
//       },
//       {
//         slug: "water-tank-cleaning",
//         name: "Water tank cleaning",
//         unit: "per tank",
//         price: 3000,
//         from: true,
//         summary: "Overhead or underground tank drained, scrubbed and disinfected.",
//       },
//     ],
//   },
];

/* ---------- Helpers (no need to edit below) ---------- */

export type ItemWithCategory = ServiceItem & {
  image: string;
  key: string;
  href: string;
  categorySlug: string;
  categoryName: string;
  categoryIcon: CategoryIcon;
};

export const allItems: ItemWithCategory[] = categories.flatMap((c) =>
  c.items.map((item) => ({
    ...item,
    image: item.image ?? c.image,
    imageAlt: item.image ? item.imageAlt : c.imageAlt,
    key: `${c.slug}/${item.slug}`,
    href: `/services/${c.slug}/${item.slug}`,
    categorySlug: c.slug,
    categoryName: c.name,
    categoryIcon: c.icon,
  })),
);

export const featuredItems = allItems.filter((i) => i.featured);

export const electricalCategories = categories.filter((c) => c.group === "electrical");
export const plumbingCategories = categories.filter((c) => c.group === "plumbing");

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getItem(categorySlug: string, itemSlug: string): ItemWithCategory | undefined {
  return allItems.find((i) => i.categorySlug === categorySlug && i.slug === itemSlug);
}

/** First item of a category is its headline rate. */
export function headlineItem(category: Category): ServiceItem {
  return category.items[0];
}

/** Slim data sent to the browser for search and the quote list. */
export type CatalogEntry = Pick<
  ItemWithCategory,
  "key" | "name" | "unit" | "price" | "from" | "image" | "imageAlt" | "href" | "categoryName" | "categorySlug"
>;

export const catalog: CatalogEntry[] = allItems.map(
  ({ key, name, unit, price, from, image, imageAlt, href, categoryName, categorySlug }) => ({
    key,
    name,
    unit,
    price,
    from,
    image,
    imageAlt,
    href,
    categoryName,
    categorySlug,
  }),
);
