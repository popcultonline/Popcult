"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEventName =
  | "newsletter_signup"
  | "find_store_click"
  | "directions_click"
  | "phone_click"
  | "category_view";

export type AnalyticsPropertyValue = string | number | boolean | null;
export type AnalyticsProperties = Record<
  string,
  AnalyticsPropertyValue | undefined
>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, AnalyticsPropertyValue>
    ) => void;
  }
}

const recentlyTrackedEvents = new Map<string, number>();
const DEDUPE_WINDOW_MS = 750;

function cleanProperties(properties: AnalyticsProperties = {}) {
  return Object.fromEntries(
    Object.entries(properties).filter(
      (entry): entry is [string, AnalyticsPropertyValue] =>
        entry[1] !== undefined
    )
  );
}

export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {},
  options: { dedupeKey?: string } = {}
) {
  if (typeof window === "undefined") return;

  const clean = cleanProperties(properties);
  const dedupeKey = `${name}:${options.dedupeKey ?? JSON.stringify(clean)}`;
  const now = Date.now();
  const lastTrackedAt = recentlyTrackedEvents.get(dedupeKey);

  if (lastTrackedAt && now - lastTrackedAt < DEDUPE_WINDOW_MS) {
    return;
  }

  recentlyTrackedEvents.set(dedupeKey, now);
  track(name, clean);
  window.gtag?.("event", name, clean);
}
