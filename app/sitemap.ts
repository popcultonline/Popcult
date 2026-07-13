import type { MetadataRoute } from "next";
import { getAbsoluteUrl, siteRoutes } from "@/lib/site";
import {
  getLocationPath,
  getStatePath,
  locations,
  stateGroups,
} from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = siteRoutes.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
  const stateRoutes = stateGroups.map((group) => ({
    url: getAbsoluteUrl(getStatePath(group)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const storeRoutes = locations.map((location) => ({
    url: getAbsoluteUrl(getLocationPath(location)),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...stateRoutes, ...storeRoutes];
}
