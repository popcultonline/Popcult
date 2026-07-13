export type StoreBrand = "Pop Cult" | "Character World";
export type StateCode = "FL" | "GA" | "SC" | "TN";

export type StoreLocation = {
  id: string;
  city: string;
  area?: string;
  state: string;
  stateCode: StateCode;
  brand: StoreBrand;
  mall: string;
  address: string;
  phone: string;
  directionsQuery?: string;
};

const stateSlugsByCode: Record<StateCode, string> = {
  FL: "florida",
  GA: "georgia",
  SC: "south-carolina",
  TN: "tennessee",
};

const locationSlugOverrides: Record<string, string> = {
  "tampa-citrus-park": "citrus-park",
};

export const locations: StoreLocation[] = [
  {
    id: "orlando-florida-mall",
    city: "Orlando",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "The Florida Mall",
    address: "8001 S Orange Blossom Trl, Orlando, FL 32809",
    phone: "(407) 595-8636",
    directionsQuery: "8001 S Orange Blossom Trl, Orlando, FL 32809",
  },
  {
    id: "tampa-citrus-park",
    city: "Tampa",
    area: "Citrus Park",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Citrus Park Town Center",
    address: "8021 Citrus Park Town Center Mall, Tampa, FL 33625",
    phone: "(813) 792-7070",
    directionsQuery: "8021 Citrus Park Town Center Mall, Tampa, FL 33625",
  },
  {
    id: "clearwater-countryside",
    city: "Clearwater",
    area: "Countryside",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Countryside Mall",
    address: "27001 US-19 Ste 1029, Clearwater, FL 33761",
    phone: "(727) 266-4096",
    directionsQuery: "27001 US-19 Ste 1029, Clearwater, FL 33761",
  },
  {
    id: "brandon",
    city: "Brandon",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Brandon Exchange / Brandon Town Center",
    address: "459 Brandon Town Center Dr, Brandon, FL 33511",
    phone: "(813) 643-5528",
    directionsQuery: "459 Brandon Town Center Dr, Brandon, FL 33511",
  },
  {
    id: "lutz-tampa-premium-outlets",
    city: "Lutz",
    area: "Tampa",
    state: "Florida",
    stateCode: "FL",
    brand: "Pop Cult",
    mall: "Tampa Premium Outlets",
    address: "2398 Grand Cypress Dr STE 418, Lutz, FL 33559",
    phone: "(813) 948-6610",
    directionsQuery: "2398 Grand Cypress Dr STE 418, Lutz, FL 33559",
  },
  {
    id: "alpharetta-north-point",
    city: "Alpharetta",
    state: "Georgia",
    stateCode: "GA",
    brand: "Pop Cult",
    mall: "North Point Mall",
    address: "1000 North Point Cir #2140, Alpharetta, GA 30022",
    phone: "(770) 828-6822",
    directionsQuery: "1000 North Point Cir #2140, Alpharetta, GA 30022",
  },
  {
    id: "buford-mall-of-georgia",
    city: "Buford",
    state: "Georgia",
    stateCode: "GA",
    brand: "Character World",
    mall: "Mall of Georgia",
    address: "3333 Buford Dr, Buford, GA 30519",
    phone: "(678) 546-8420",
    directionsQuery: "3333 Buford Dr, Buford, GA 30519",
  },
  {
    id: "greenville-haywood",
    city: "Greenville",
    state: "South Carolina",
    stateCode: "SC",
    brand: "Pop Cult",
    mall: "Haywood Mall",
    address: "700 Haywood Rd #1052A, Greenville, SC 29607",
    phone: "(864) 281-7964",
    directionsQuery: "700 Haywood Rd #1052A, Greenville, SC 29607",
  },
  {
    id: "nashville",
    city: "Nashville",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "Details coming soon",
    address: "Details coming soon",
    phone: "(629) 207-0609",
  },
  {
    id: "knoxville",
    city: "Knoxville",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "Details coming soon",
    address: "Details coming soon",
    phone: "(865) 253-7228",
  },
  {
    id: "chattanooga-hamilton-place",
    city: "Chattanooga",
    state: "Tennessee",
    stateCode: "TN",
    brand: "Pop Cult",
    mall: "Hamilton Place",
    address: "2100 Hamilton Pl Blvd, Chattanooga, TN 37421",
    phone: "(423) 855-5282",
    directionsQuery: "2100 Hamilton Pl Blvd, Chattanooga, TN 37421",
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

export function isKnownLocationValue(value?: string) {
  return Boolean(value && value.trim() && value !== "Details coming soon");
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

export function getDirectionsUrl(location: StoreLocation) {
  if (!location.directionsQuery) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.directionsQuery
  )}`;
}
