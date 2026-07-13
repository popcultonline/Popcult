export type StoreBrand = "Pop Cult" | "Character World";
export type StateCode = "FL" | "GA" | "SC" | "TN";
export type HoursBasis = "verified-store" | "provisional-mall";
export type PhoneType = "direct" | "mall-info";
export type DayCode = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type StoreAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: StateCode;
  postalCode: string;
  addressCountry: "US";
};

export type StorePhone = {
  number: string;
  label: string;
  type: PhoneType;
};

export type OpeningHoursRule = {
  days: DayCode[];
  daysLabel: string;
  opens: string;
  closes: string;
  label: string;
};

export type StoreHours = {
  basis: HoursBasis;
  rules: OpeningHoursRule[];
  provisionalNote?: string;
  generalNote: string;
};

export type StoreLocation = {
  id: string;
  officialName: string;
  brand: StoreBrand;
  mall: string;
  city: string;
  area?: string;
  state: string;
  stateCode: StateCode;
  address: StoreAddress;
  phone: StorePhone;
  hours: StoreHours;
  mapsQuery: string;
  bestEntrance?: string;
  inMallLocation?: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  lastReviewed: string;
  internalVerificationNote?: string;
};

const expectedLocationCount = 11;
const expectedStateCount = 4;
const validStateCodes = new Set<StateCode>(["FL", "GA", "SC", "TN"]);
const validDayCodes = new Set<DayCode>(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
const validHoursBases = new Set<HoursBasis>([
  "verified-store",
  "provisional-mall",
]);
const generalHoursNote =
  "Hours may vary during holidays and special events. Call ahead before making a special trip.";
const provisionalMallHoursNote =
  "Pop Cult generally follows the shopping center’s regular hours. Individual store and holiday hours may vary.";

const stateSlugsByCode: Record<StateCode, string> = {
  FL: "florida",
  GA: "georgia",
  SC: "south-carolina",
  TN: "tennessee",
};

const locationSlugOverrides: Record<string, string> = {
  "tampa-citrus-park": "citrus-park",
};

const hours = {
  monThu10To8FriSat10To9Sun11To7: {
    basis: "verified-store",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "11:00",
        closes: "19:00",
        label: "11 AM–7 PM",
      },
    ],
    generalNote: generalHoursNote,
  },
  citrusParkMall: {
    basis: "provisional-mall",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "11:00",
        closes: "20:00",
        label: "11 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "11:00",
        closes: "18:00",
        label: "11 AM–6 PM",
      },
    ],
    provisionalNote: provisionalMallHoursNote,
    generalNote: generalHoursNote,
  },
  monThu10To8FriSat10To9Sun11To6: {
    basis: "verified-store",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "11:00",
        closes: "18:00",
        label: "11 AM–6 PM",
      },
    ],
    generalNote: generalHoursNote,
  },
  tampaPremiumOutletsMall: {
    basis: "provisional-mall",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "11:00",
        closes: "18:00",
        label: "11 AM–6 PM",
      },
    ],
    provisionalNote: provisionalMallHoursNote,
    generalNote: generalHoursNote,
  },
  northPointMall: {
    basis: "provisional-mall",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
        daysLabel: "Monday–Saturday",
        opens: "11:00",
        closes: "20:00",
        label: "11 AM–8 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "12:00",
        closes: "19:00",
        label: "12 PM–7 PM",
      },
    ],
    provisionalNote: provisionalMallHoursNote,
    generalNote: generalHoursNote,
  },
  greenville: {
    basis: "verified-store",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "12:00",
        closes: "18:00",
        label: "12 PM–6 PM",
      },
    ],
    generalNote: generalHoursNote,
  },
  nashville: {
    basis: "verified-store",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
        daysLabel: "Monday–Saturday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "11:00",
        closes: "19:00",
        label: "11 AM–7 PM",
      },
    ],
    generalNote: generalHoursNote,
  },
  knoxville: {
    basis: "verified-store",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th"],
        daysLabel: "Monday–Thursday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Fr", "Sa"],
        daysLabel: "Friday–Saturday",
        opens: "10:00",
        closes: "21:00",
        label: "10 AM–9 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "12:00",
        closes: "18:00",
        label: "12 PM–6 PM",
      },
    ],
    generalNote: generalHoursNote,
  },
  chattanoogaMall: {
    basis: "provisional-mall",
    rules: [
      {
        days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
        daysLabel: "Monday–Saturday",
        opens: "10:00",
        closes: "20:00",
        label: "10 AM–8 PM",
      },
      {
        days: ["Su"],
        daysLabel: "Sunday",
        opens: "12:00",
        closes: "18:00",
        label: "12 PM–6 PM",
      },
    ],
    provisionalNote: provisionalMallHoursNote,
    generalNote: generalHoursNote,
  },
} satisfies Record<string, StoreHours>;

export const locations: StoreLocation[] = [
  {
    id: "orlando-florida-mall",
    officialName: "Pop Cult at The Florida Mall",
    city: "Orlando",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "The Florida Mall",
    address: {
      streetAddress: "8001 S Orange Blossom Trl",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32809",
      addressCountry: "US",
    },
    phone: {
      number: "(407) 595-8636",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.monThu10To8FriSat10To9Sun11To7,
    mapsQuery:
      "Pop Cult The Florida Mall, 8001 S Orange Blossom Trl, Orlando, FL 32809",
    bestEntrance: "The Plaza Entrance",
    inMallLocation: "JCPenney wing, near JCPenney",
    description:
      "Pop Cult at The Florida Mall gives Orlando shoppers a dedicated in-person stop for pop culture browsing. The store listing highlights anime, Funko Pops, video games, DC and Marvel, Hello Kitty, K-pop, collectibles, and gifts. Use The Plaza Entrance and head toward the JCPenney wing near JCPenney for the store.",
    seoTitle: "Pop Cult Orlando at The Florida Mall",
    seoDescription:
      "Visit Pop Cult at The Florida Mall in Orlando for anime, collectibles, character goods, gifts, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Saturday 9 PM closing is treated as the current verified schedule, but can be reconfirmed with the client as a low-priority content check.",
  },
  {
    id: "tampa-citrus-park",
    officialName: "Pop Cult Citrus Park",
    city: "Tampa",
    area: "Citrus Park",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Citrus Park Town Center",
    address: {
      streetAddress: "8021 Citrus Park Town Center Mall",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33625",
      addressCountry: "US",
    },
    phone: {
      number: "(813) 792-7070",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.citrusParkMall,
    mapsQuery:
      "Pop Cult Citrus Park Town Center, 8021 Citrus Park Town Center Mall, Tampa, FL 33625",
    description:
      "Pop Cult Citrus Park serves the Tampa and Citrus Park area from Citrus Park Town Center. It is a physical retail stop for browsing anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts. The location is best used for in-store discovery, local questions, and current shopping-center visits.",
    seoTitle: "Pop Cult Citrus Park at Citrus Park Town Center",
    seoDescription:
      "Visit Pop Cult Citrus Park at Citrus Park Town Center in Tampa for pop culture gifts, collectibles, directions, phone, and regular mall hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Regular mall hours are used provisionally until store-specific hours are confirmed. Current phone is (813) 792-7070; client should confirm against previously surfaced (706) 921-9726.",
  },
  {
    id: "clearwater-countryside",
    officialName: "Pop Cult at Countryside Mall",
    city: "Clearwater",
    area: "Countryside",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Countryside Mall",
    address: {
      streetAddress: "27001 US-19 Ste 1029",
      addressLocality: "Clearwater",
      addressRegion: "FL",
      postalCode: "33761",
      addressCountry: "US",
    },
    phone: {
      number: "(727) 266-4096",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.monThu10To8FriSat10To9Sun11To7,
    mapsQuery:
      "Pop Cult Countryside Mall, 27001 US-19 Ste 1029, Clearwater, FL 33761",
    inMallLocation:
      "First level, near JCPenney; also listed between Claire’s and Great American Cookie",
    description:
      "Pop Cult at Countryside Mall is a Clearwater destination for browsing character and pop culture goods in person. The official listing identifies anime figures, Sanrio, Gundam, Funko Pops, plush, apparel, accessories, snacks, drinks, collectibles, and gifts. Find it on the first level near JCPenney, between Claire’s and Great American Cookie.",
    seoTitle: "Pop Cult Clearwater at Countryside Mall",
    seoDescription:
      "Visit Pop Cult at Countryside Mall in Clearwater for character goods, collectibles, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
  },
  {
    id: "brandon",
    officialName: "Pop Cult at Brandon Exchange",
    city: "Brandon",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Brandon Exchange",
    address: {
      streetAddress: "459 Brandon Town Center Dr",
      addressLocality: "Brandon",
      addressRegion: "FL",
      postalCode: "33511",
      addressCountry: "US",
    },
    phone: {
      number: "(813) 699-2842",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.monThu10To8FriSat10To9Sun11To6,
    mapsQuery:
      "Pop Cult Brandon Exchange, 459 Brandon Town Center Dr, Brandon, FL 33511",
    description:
      "Pop Cult at Brandon Exchange gives Brandon shoppers a local place to browse pop culture merchandise, character goods, collectibles, plush, figures, Gundam, Sanrio, anime-related finds, and gifts. The store page is intended for practical visit planning: address, phone, directions, and verified weekly hours before heading to the shopping center.",
    seoTitle: "Pop Cult Brandon at Brandon Exchange",
    seoDescription:
      "Visit Pop Cult at Brandon Exchange for pop culture gifts, collectibles, directions, phone, and verified store hours in Brandon, Florida.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Current phone follows Brandon Exchange listing. Repository previously listed (813) 643-5528.",
  },
  {
    id: "lutz-tampa-premium-outlets",
    officialName: "Pop Cult at Tampa Premium Outlets",
    city: "Lutz",
    area: "Tampa",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Tampa Premium Outlets",
    address: {
      streetAddress: "2398 Grand Cypress Dr STE 418",
      addressLocality: "Lutz",
      addressRegion: "FL",
      postalCode: "33559",
      addressCountry: "US",
    },
    phone: {
      number: "(813) 948-6610",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.tampaPremiumOutletsMall,
    mapsQuery:
      "Pop Cult Tampa Premium Outlets, 2398 Grand Cypress Dr STE 418, Lutz, FL 33559",
    description:
      "Pop Cult at Tampa Premium Outlets brings the Pop Cult browsing experience to Lutz and the greater Tampa area. Visit in person for a specialty retail mix centered on pop culture, anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts. Regular outlet hours are used as the current planning schedule.",
    seoTitle: "Pop Cult Lutz at Tampa Premium Outlets",
    seoDescription:
      "Visit Pop Cult at Tampa Premium Outlets in Lutz for pop culture gifts, collectibles, directions, phone, and regular mall hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Regular mall hours are used provisionally until store-specific hours are confirmed.",
  },
  {
    id: "alpharetta-north-point",
    officialName: "Pop Cult at North Point Mall",
    city: "Alpharetta",
    state: "Georgia",
    stateCode: "GA",
    brand: "Pop Cult",
    mall: "North Point Mall",
    address: {
      streetAddress: "1000 North Point Cir #2140",
      addressLocality: "Alpharetta",
      addressRegion: "GA",
      postalCode: "30022",
      addressCountry: "US",
    },
    phone: {
      number: "(770) 828-6822",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.northPointMall,
    mapsQuery:
      "Pop Cult North Point Mall, 1000 North Point Cir #2140, Alpharetta, GA 30022",
    description:
      "Pop Cult at North Point Mall gives Alpharetta shoppers a regional pop culture store for in-person discovery. Browse categories such as anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts, with exact inventory varying by visit. Regular mall hours are used as the current planning schedule for this location.",
    seoTitle: "Pop Cult Alpharetta at North Point Mall",
    seoDescription:
      "Visit Pop Cult at North Point Mall in Alpharetta for pop culture gifts, collectibles, directions, phone, and regular mall hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Regular mall hours are used provisionally until store-specific hours are confirmed.",
  },
  {
    id: "buford-mall-of-georgia",
    officialName: "Character World at Mall of Georgia",
    city: "Buford",
    state: "Georgia",
    stateCode: "GA",
    brand: "Character World",
    mall: "Mall of Georgia",
    address: {
      streetAddress: "3333 Buford Dr",
      addressLocality: "Buford",
      addressRegion: "GA",
      postalCode: "30519",
      addressCountry: "US",
    },
    phone: {
      number: "(678) 546-8420",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.monThu10To8FriSat10To9Sun11To7,
    mapsQuery:
      "Character World Mall of Georgia, 3333 Buford Dr, Buford, GA 30519",
    bestEntrance: "Entrance near Savvi Formalwear",
    inMallLocation: "Second level / upper level near Von Maur",
    description:
      "Character World at Mall of Georgia keeps its local brand identity while serving Buford shoppers with a character-focused retail experience. Visit for in-person discovery across pop culture categories such as character goods, collectibles, plush, figures, anime merchandise, Sanrio, Gundam, and gifts. Use the entrance near Savvi Formalwear and head to the upper level near Von Maur.",
    seoTitle: "Character World Buford at Mall of Georgia",
    seoDescription:
      "Visit Character World at Mall of Georgia in Buford for character goods, collectibles, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Preserve Character World as the public brand unless the client confirms wording such as “A Pop Cult store.”",
  },
  {
    id: "greenville-haywood",
    officialName: "Pop Cult at Haywood Mall",
    city: "Greenville",
    state: "South Carolina",
    stateCode: "SC",
    brand: "Pop Cult",
    mall: "Haywood Mall",
    address: {
      streetAddress: "700 Haywood Rd #1052A",
      addressLocality: "Greenville",
      addressRegion: "SC",
      postalCode: "29607",
      addressCountry: "US",
    },
    phone: {
      number: "(864) 281-7964",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.greenville,
    mapsQuery:
      "Pop Cult Haywood Mall, 700 Haywood Rd #1052A, Greenville, SC 29607",
    bestEntrance: "Belk",
    inMallLocation: "Lower level, Belk Court",
    description:
      "Pop Cult at Haywood Mall is Greenville’s in-person stop for pop culture browsing in Belk Court. Visit for a specialty retail experience built around categories such as anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts. The best entrance is Belk, with the store on the lower level.",
    seoTitle: "Pop Cult Greenville at Haywood Mall",
    seoDescription:
      "Visit Pop Cult at Haywood Mall in Greenville for pop culture gifts, collectibles, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
  },
  {
    id: "nashville",
    officialName: "Pop Cult at Opry Mills",
    city: "Nashville",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "Opry Mills",
    address: {
      streetAddress: "433 Opry Mills Dr",
      addressLocality: "Nashville",
      addressRegion: "TN",
      postalCode: "37214",
      addressCountry: "US",
    },
    phone: {
      number: "(629) 207-0609",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.nashville,
    mapsQuery: "Pop Cult Opry Mills, 433 Opry Mills Dr, Nashville, TN 37214",
    bestEntrance: "Entry 3",
    inMallLocation: "Near Rainforest Cafe, across from Five Below",
    description:
      "Pop Cult at Opry Mills gives Nashville shoppers a mall-based specialty store for pop culture discovery. Browse in person for categories such as anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts. Use Entry 3 and look near Rainforest Cafe, across from Five Below, for the store.",
    seoTitle: "Pop Cult Nashville at Opry Mills",
    seoDescription:
      "Visit Pop Cult at Opry Mills in Nashville for pop culture gifts, collectibles, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
  },
  {
    id: "knoxville",
    officialName: "Pop Cult at West Town Mall",
    city: "Knoxville",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "West Town Mall",
    address: {
      streetAddress: "7600 Kingston Pike",
      addressLocality: "Knoxville",
      addressRegion: "TN",
      postalCode: "37919",
      addressCountry: "US",
    },
    phone: {
      number: "(865) 253-7363",
      label: "Store phone",
      type: "direct",
    },
    hours: hours.knoxville,
    mapsQuery:
      "Pop Cult West Town Mall, 7600 Kingston Pike, Knoxville, TN 37919",
    bestEntrance: "Parking garage",
    inMallLocation: "Lower level, next to Rack Room Shoes",
    description:
      "Pop Cult at West Town Mall brings the Pop Cult retail experience to Knoxville with a lower-level store next to Rack Room Shoes. Visit in person for categories such as anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts. The parking garage is the best entrance for this location.",
    seoTitle: "Pop Cult Knoxville at West Town Mall",
    seoDescription:
      "Visit Pop Cult at West Town Mall in Knoxville for pop culture gifts, collectibles, directions, phone, and verified store hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Repository previously listed (865) 253-7228; current working phone follows the official West Town Mall listing.",
  },
  {
    id: "chattanooga-hamilton-place",
    officialName: "Pop Cult at Hamilton Place",
    city: "Chattanooga",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "Hamilton Place",
    address: {
      streetAddress: "2100 Hamilton Place Blvd",
      addressLocality: "Chattanooga",
      addressRegion: "TN",
      postalCode: "37421",
      addressCountry: "US",
    },
    phone: {
      number: "(423) 855-5282",
      label: "Hamilton Place information",
      type: "mall-info",
    },
    hours: hours.chattanoogaMall,
    mapsQuery:
      "Pop Cult Hamilton Place, 2100 Hamilton Place Blvd, Chattanooga, TN 37421",
    description:
      "Pop Cult at Hamilton Place gives Chattanooga shoppers an in-person place to browse pop culture and character-focused retail categories. Visit for discovery across anime merchandise, Sanrio, Gundam, figures, plush, collectibles, character goods, and gifts, with exact selection varying by visit. Regular mall hours are used as the current planning schedule.",
    seoTitle: "Pop Cult Chattanooga at Hamilton Place",
    seoDescription:
      "Visit Pop Cult at Hamilton Place in Chattanooga for pop culture gifts, collectibles, directions, mall information phone, and regular mall hours.",
    lastReviewed: "2026-07-13",
    internalVerificationNote:
      "Phone is the published Hamilton Place mall information number, not a confirmed direct Pop Cult number.",
  },
];

export const stateGroups = [
  { state: "Florida", code: "FL" as const },
  { state: "Georgia", code: "GA" as const },
  { state: "South Carolina", code: "SC" as const },
  { state: "Tennessee", code: "TN" as const },
].map((group) => ({
  ...group,
  locations: locations.filter((location) => location.stateCode === group.code),
}));

export const locationCount = locations.length;
export const stateCount = stateGroups.length;

export function slugifyLocationSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAddressText(location: StoreLocation) {
  const { streetAddress, addressLocality, addressRegion, postalCode } =
    location.address;

  return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

export function getStateSlug(location: StoreLocation) {
  return stateSlugsByCode[location.stateCode];
}

export function getLocationSlug(location: StoreLocation) {
  return locationSlugOverrides[location.id] ?? slugifyLocationSegment(location.city);
}

export function getLocationPath(location: StoreLocation) {
  return `/locations/${getStateSlug(location)}/${getLocationSlug(location)}`;
}

export function getStatePath(group: { code: StateCode }) {
  return `/locations/${stateSlugsByCode[group.code]}`;
}

export function getStateGroupBySlug(slug: string) {
  return stateGroups.find((group) => stateSlugsByCode[group.code] === slug);
}

export function getLocationByRoute(stateSlug: string, locationSlug: string) {
  return locations.find(
    (location) =>
      getStateSlug(location) === stateSlug &&
      getLocationSlug(location) === locationSlug
  );
}

export function getLocationStaticParams() {
  return locations.map((location) => ({
    state: getStateSlug(location),
    slug: getLocationSlug(location),
  }));
}

export function getStateStaticParams() {
  return stateGroups.map((group) => ({
    state: stateSlugsByCode[group.code],
  }));
}

export function getHoursHeading(location: StoreLocation) {
  return location.hours.basis === "verified-store"
    ? "Store Hours"
    : "Regular Mall Hours";
}

export function getDirectionsUrl(location: StoreLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.mapsQuery
  )}`;
}

export function getPhoneHref(location: StoreLocation) {
  return `tel:${location.phone.number.replace(/[^\d+]/g, "")}`;
}

export function getPhoneContactType(location: StoreLocation) {
  return location.phone.type === "direct" ? "store_phone" : "mall_information";
}

export function getOpeningHoursSpecification(location: StoreLocation) {
  const dayNames: Record<DayCode, string> = {
    Mo: "Monday",
    Tu: "Tuesday",
    We: "Wednesday",
    Th: "Thursday",
    Fr: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };

  return location.hours.rules.flatMap((rule) =>
    rule.days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames[day]}`,
      opens: rule.opens,
      closes: rule.closes,
    }))
  );
}

export function getLocationStructuredData(location: StoreLocation, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${url}#store`,
    name: location.officialName,
    url,
    description: location.description,
    brand: {
      "@type": "Brand",
      name: location.brand,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.addressLocality,
      addressRegion: location.address.addressRegion,
      postalCode: location.address.postalCode,
      addressCountry: location.address.addressCountry,
    },
    ...(location.phone.type === "direct" ? { telephone: location.phone.number } : {}),
    openingHoursSpecification: getOpeningHoursSpecification(location),
  };
}

function assertUnique(values: string[], label: string, errors: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  for (const duplicate of duplicates) {
    errors.push(`Duplicate ${label}: ${duplicate}`);
  }
}

function validateRequiredString(
  value: string | undefined,
  label: string,
  errors: string[]
) {
  if (!value || !value.trim()) {
    errors.push(`Missing required value: ${label}`);
  }
}

function validateLocationData() {
  const errors: string[] = [];
  const placeholderPattern =
    /coming soon|details coming soon|being confirmed|placeholder|tbd|todo|fixme/i;

  if (locations.length !== expectedLocationCount) {
    errors.push(
      `Expected ${expectedLocationCount} locations; found ${locations.length}`
    );
  }

  if (stateGroups.length !== expectedStateCount) {
    errors.push(`Expected ${expectedStateCount} states; found ${stateGroups.length}`);
  }

  assertUnique(
    stateGroups.map((group) => stateSlugsByCode[group.code]),
    "state slug",
    errors
  );
  assertUnique(
    locations.map((location) => location.id),
    "location id",
    errors
  );
  assertUnique(
    locations.map((location) => getLocationPath(location)),
    "canonical path",
    errors
  );
  assertUnique(
    locations.map(
      (location) => `${getStateSlug(location)}/${getLocationSlug(location)}`
    ),
    "state/slug combination",
    errors
  );
  assertUnique(
    locations.map((location) => location.seoTitle),
    "SEO title",
    errors
  );

  for (const location of locations) {
    const requiredValues = {
      id: location.id,
      officialName: location.officialName,
      brand: location.brand,
      mall: location.mall,
      city: location.city,
      state: location.state,
      stateCode: location.stateCode,
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.addressLocality,
      addressRegion: location.address.addressRegion,
      postalCode: location.address.postalCode,
      mapsQuery: location.mapsQuery,
      phoneNumber: location.phone.number,
      phoneLabel: location.phone.label,
      description: location.description,
      seoTitle: location.seoTitle,
      seoDescription: location.seoDescription,
      lastReviewed: location.lastReviewed,
    };

    for (const [label, value] of Object.entries(requiredValues)) {
      validateRequiredString(value, `${location.id}.${label}`, errors);
      if (value && placeholderPattern.test(value)) {
        errors.push(`Placeholder phrase found in ${location.id}.${label}`);
      }
    }

    if (!validStateCodes.has(location.stateCode)) {
      errors.push(`Invalid state code for ${location.id}: ${location.stateCode}`);
    }

    if (!validHoursBases.has(location.hours.basis)) {
      errors.push(`Invalid hours basis for ${location.id}: ${location.hours.basis}`);
    }

    if (location.address.addressRegion !== location.stateCode) {
      errors.push(`Address region mismatch for ${location.id}`);
    }

    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(location.phone.number)) {
      errors.push(`Malformed phone display value for ${location.id}`);
    }

    const phoneHref = getPhoneHref(location);
    if (!/^tel:\d{10}$/.test(phoneHref)) {
      errors.push(`Malformed phone link for ${location.id}: ${phoneHref}`);
    }

    if (!location.hours.rules.length) {
      errors.push(`Missing hours rules for ${location.id}`);
    }

    if (location.hours.basis === "provisional-mall") {
      validateRequiredString(
        location.hours.provisionalNote,
        `${location.id}.hours.provisionalNote`,
        errors
      );
    }

    for (const [index, rule] of location.hours.rules.entries()) {
      validateRequiredString(
        rule.daysLabel,
        `${location.id}.hours.rules.${index}.daysLabel`,
        errors
      );
      validateRequiredString(
        rule.label,
        `${location.id}.hours.rules.${index}.label`,
        errors
      );

      if (!rule.days.length) {
        errors.push(`Missing day codes for ${location.id} hours rule ${index}`);
      }

      for (const day of rule.days) {
        if (!validDayCodes.has(day)) {
          errors.push(`Invalid day code for ${location.id}: ${day}`);
        }
      }

      if (!/^\d{2}:\d{2}$/.test(rule.opens)) {
        errors.push(`Invalid opens time for ${location.id}: ${rule.opens}`);
      }

      if (!/^\d{2}:\d{2}$/.test(rule.closes)) {
        errors.push(`Invalid closes time for ${location.id}: ${rule.closes}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Location data integrity check failed:\n${errors.join("\n")}`);
  }
}

validateLocationData();
