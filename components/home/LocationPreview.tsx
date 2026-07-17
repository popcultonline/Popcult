import { ArrowRight } from "lucide-react";
import { locationCount, locations, stateGroups } from "@/data/locations";
import { LocationCard } from "@/components/cards/LocationCard";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const featuredLocationIds = [
  "orlando-florida-mall",
  "alpharetta-north-point",
  "greenville-haywood",
  "chattanooga-hamilton-place",
];

const featuredLocations = featuredLocationIds
  .map((id) => locations.find((location) => location.id === id))
  .filter((location) => location !== undefined);

export function LocationPreview() {
  return (
    <div className="bg-[#eee8f6]">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Find us nearby
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              {locationCount} locations across the Southeast.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Visit Pop Cult and Character World at major mall destinations in
              Florida, Georgia, South Carolina, and Tennessee.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/10 ring-1 ring-black/10">
              {stateGroups.map((group) => (
                <div key={group.code} className="bg-white p-4">
                  <dt className="text-sm font-bold">{group.state}</dt>
                  <dd className="mt-1 text-2xl font-black text-primary">
                    {group.locations.length}
                  </dd>
                </div>
              ))}
            </dl>

            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full bg-[#171717] font-bold text-white hover:bg-primary"
            >
              <TrackedLink
                href="/locations"
                eventName="find_store_click"
                eventProperties={{ placement: "location_preview" }}
              >
                View all locations
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedLink>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
