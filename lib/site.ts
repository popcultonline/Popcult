export const siteName = "Pop Cult";
export const siteDescription =
  "A regional pop culture retailer for anime, Sanrio, Gundam, figures, plush, collectibles, gifts, and more.";
export const productionSiteUrl = "https://popcult.online";
export const siteLastReviewed = "2026-07-13";
export const brandOpenGraphImages = [
  {
    url: "/brand/popcult-logo-final.jpg",
    alt: "Pop Cult logo",
  },
];

export const siteRoutes = [
  { path: "/", priority: 1 },
  { path: "/locations", priority: 0.9 },
  { path: "/about", priority: 0.75 },
  { path: "/contact", priority: 0.7 },
] as const;

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl;

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return productionSiteUrl;
  }
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}
