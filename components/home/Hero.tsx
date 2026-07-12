import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { locationCount, stateCount } from "@/data/locations";
import { HeroSpotlightCarousel } from "@/components/home/HeroSpotlightCarousel";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/ui/SparklesText";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-8 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 hidden text-sm font-black uppercase tracking-[0.19em] text-primary sm:block">
            Anime, collectibles, and gifts in-store
          </p>
          <h1
            aria-label="Find your next favorite thing."
            className="text-[clamp(3.55rem,8vw,7.35rem)] font-black leading-[0.99] tracking-[-0.068em] text-foreground sm:leading-[1.015]"
          >
            Find your
            <span className="mt-1 block sm:mt-2">
              next favorite
            </span>
            <span className="block">
              <SparklesText>thing</SparklesText>.
            </span>
          </h1>
          <p className="mt-6 hidden max-w-3xl text-lg leading-8 text-muted-foreground sm:block sm:text-xl">
            Anime, Gundam, Sanrio, figures, plush, collectibles, and gifts
            across {locationCount} locations in the Southeast.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-[#ffe200] px-7 font-black text-black shadow-[0_4px_0_#171717] hover:bg-[#f2d600]"
            >
              <TrackedLink
                href="/locations"
                eventName="find_store_click"
                eventProperties={{ placement: "hero" }}
              >
                <MapPin aria-hidden="true" className="size-4" />
                Find a Store
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 rounded-full border-black/25 bg-transparent px-7 font-bold hover:bg-black hover:text-white"
            >
              <Link href="#categories">
                Explore Categories
                <ArrowDown aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 hidden flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/15 pt-5 sm:flex">
            <p className="text-lg font-black">
              {locationCount} locations across {stateCount} states
            </p>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              GA • FL • SC • TN
            </p>
          </div>
        </div>

        <HeroSpotlightCarousel />
      </div>
    </section>
  );
}
