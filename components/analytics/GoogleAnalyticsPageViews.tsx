"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, string | number | boolean | null>
    ) => void;
  }
}

export function GoogleAnalyticsPageViews({
  measurementId,
}: {
  measurementId: string;
}) {
  const pathname = usePathname();
  const isInitialView = useRef(true);

  useEffect(() => {
    if (isInitialView.current) {
      isInitialView.current = false;
      return;
    }

    window.gtag?.("config", measurementId, {
      page_path: pathname,
    });
  }, [measurementId, pathname]);

  return null;
}
