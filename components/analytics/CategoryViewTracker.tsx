"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const viewedCategories = new Set<string>();

export function CategoryViewTracker({ category }: { category: string }) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;

    if (!marker || viewedCategories.has(category)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || viewedCategories.has(category)) return;

        viewedCategories.add(category);
        trackEvent(
          "category_view",
          { category },
          { dedupeKey: category }
        );
        observer.disconnect();
      },
      { threshold: 0.55 }
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [category]);

  return (
    <span
      ref={markerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
