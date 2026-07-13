import type { Metadata } from "next";
import Link from "next/link";
import { Home, MapPin } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { brandOpenGraphImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This Pop Cult page was not found. Use the store list or homepage to keep browsing.",
  openGraph: {
    title: "Page Not Found | Pop Cult",
    description:
      "This Pop Cult page was not found. Use the store list or homepage to keep browsing.",
    url: "/",
    images: brandOpenGraphImages,
  },
};

export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
        Page not found
      </p>
      <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl">
        This page wandered off the shelf.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
        Try the store list or head back home to keep browsing.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-[#ffe200] font-black text-black hover:bg-[#f2d600]"
        >
          <TrackedLink
            href="/locations"
            eventName="find_store_click"
            eventProperties={{ placement: "not_found" }}
          >
            <MapPin aria-hidden="true" className="size-4" />
            Find a Store
          </TrackedLink>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link href="/">
            <Home aria-hidden="true" className="size-4" />
            Home
          </Link>
        </Button>
      </div>
    </Section>
  );
}
