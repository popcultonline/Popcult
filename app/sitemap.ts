import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
