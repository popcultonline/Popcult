"use client";

import Link from "next/link";
import * as React from "react";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsProperties,
} from "@/lib/analytics";

type TrackedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  eventName: AnalyticsEventName;
  eventProperties?: AnalyticsProperties;
  prefetch?: boolean;
};

function isAppRoute(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export const TrackedLink = React.forwardRef<
  HTMLAnchorElement,
  TrackedLinkProps
>(
  (
    {
      href,
      eventName,
      eventProperties,
      onClick,
      prefetch,
      rel,
      target,
      ...props
    },
    ref
  ) => {
    const safeRel = target === "_blank" && !rel ? "noreferrer" : rel;

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
      trackEvent(eventName, eventProperties, {
        dedupeKey: `${href}:${eventName}`,
      });
      onClick?.(event);
    }

    if (isAppRoute(href)) {
      return (
        <Link
          ref={ref}
          href={href}
          prefetch={prefetch}
          rel={safeRel}
          target={target}
          onClick={handleClick}
          {...props}
        />
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        rel={safeRel}
        target={target}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

TrackedLink.displayName = "TrackedLink";
