import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { locationCount, stateCount, stateGroups } from "@/data/locations";
import { LocationCard } from "@/components/cards/LocationCard";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find 11 Pop Cult and Character World stores across Florida, Georgia, South Carolina, and Tennessee.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Pop Cult Locations",
    description:
      "Find 11 Pop Cult and Character World stores across Florida, Georgia, South Carolina, and Tennessee.",
    url: "/locations",
  },
};

export default function LocationsPage() {
  return (
    <>
      <Section className="pb-10 sm:pb-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Find a store
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              {locationCount} locations. {stateCount} states. Plenty to discover.
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted-foreground">
            Find Pop Cult and Character World at mall destinations across the
            Southeast.
          </p>
        </div>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <div className="space-y-16">
            {stateGroups.map((group) => (
              <section key={group.code} aria-labelledby={`state-${group.code}`}>
                <div className="mb-6 flex items-end justify-between border-b border-black/15 pb-4">
                  <h2
                    id={`state-${group.code}`}
                    className="text-3xl font-black tracking-[-0.04em] sm:text-4xl"
                  >
                    {group.state}
                  </h2>
                  <p className="text-sm font-bold text-muted-foreground">
                    {group.locations.length}{" "}
                    {group.locations.length === 1 ? "location" : "locations"}
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {group.locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>
      </div>

      <Section className="text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          Looking for something specific?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Inventory changes often and varies by store. Call your nearest
          location before making a special trip.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <Link href="/contact">
            Contact us
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </Section>
    </>
  );
}
