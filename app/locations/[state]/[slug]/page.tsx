import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin, Phone, Store } from "lucide-react";
import {
  getDirectionsUrl,
  getLocationByRoute,
  getLocationPath,
  getLocationStaticParams,
  isKnownLocationValue,
} from "@/data/locations";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";

type LocationPageProps = {
  params: Promise<{
    state: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getLocationStaticParams();
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { state, slug } = await params;
  const location = getLocationByRoute(state, slug);

  if (!location) {
    return {
      title: "Location not found",
    };
  }

  const title = `${location.brand} ${location.city}`;
  const mallText = isKnownLocationValue(location.mall)
    ? ` at ${location.mall}`
    : "";
  const description = `${location.brand}${mallText} in ${location.state}. Find address, phone, directions, and store details.`;

  return {
    title,
    description,
    alternates: {
      canonical: getLocationPath(location),
    },
    openGraph: {
      title,
      description,
      url: getLocationPath(location),
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { state, slug } = await params;
  const location = getLocationByRoute(state, slug);

  if (!location) {
    notFound();
  }

  const directionsUrl = getDirectionsUrl(location);
  const phoneHref = isKnownLocationValue(location.phone)
    ? `tel:${location.phone.replace(/[^\d+]/g, "")}`
    : null;
  const hasMall = isKnownLocationValue(location.mall);
  const hasAddress = isKnownLocationValue(location.address);
  const locationName = `${location.brand} ${location.city}`;

  return (
    <>
      <Section className="pb-10 sm:pb-14">
        <Link
          href="/locations"
          className="inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to all locations
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {location.state} store
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              {locationName}
              {location.area ? (
                <span className="block text-3xl tracking-[-0.04em] text-muted-foreground sm:text-5xl">
                  {location.area}
                </span>
              ) : null}
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted-foreground">
            {hasMall
              ? `Visit ${location.brand} at ${location.mall}.`
              : "Store details coming soon."}
          </p>
        </div>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <article className="rounded-[2rem] bg-[#171717] p-7 text-white shadow-[7px_7px_0_#ffe200] sm:p-8">
              <Store aria-hidden="true" className="size-8 text-[#ffe200]" />
              <h2 className="mt-8 text-3xl font-black tracking-[-0.045em]">
                Store details
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                    Brand
                  </dt>
                  <dd className="mt-1 text-lg font-black">{location.brand}</dd>
                </div>
                <div>
                  <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                    Location
                  </dt>
                  <dd className="mt-1 text-lg font-black">
                    {hasMall ? location.mall : "Store details coming soon"}
                  </dd>
                </div>
                <div>
                  <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                    State
                  </dt>
                  <dd className="mt-1 text-lg font-black">{location.state}</dd>
                </div>
                <div>
                  <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                    Hours
                  </dt>
                  <dd className="mt-1 text-lg font-black">
                    Hours vary by location.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="rounded-[2rem] bg-white p-7 ring-1 ring-black/10 sm:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Visit this store
              </h2>
              <address className="mt-6 space-y-5 not-italic">
                <div className="flex items-start gap-3 text-base leading-7 text-muted-foreground">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary"
                  />
                  <span>
                    {hasAddress ? location.address : "Store details coming soon"}
                  </span>
                </div>
                {phoneHref ? (
                  <div className="flex items-center gap-3 text-base">
                    <Phone
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary"
                    />
                    <TrackedLink
                      href={phoneHref}
                      eventName="phone_click"
                      eventProperties={{
                        location_id: location.id,
                        location_city: location.city,
                        state: location.stateCode,
                        placement: "location_detail",
                      }}
                      className="font-black underline-offset-4 hover:underline"
                    >
                      {location.phone}
                    </TrackedLink>
                  </div>
                ) : null}
              </address>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {directionsUrl ? (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#ffe200] font-black text-black hover:bg-[#f2d600]"
                  >
                    <TrackedLink
                      href={directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      eventName="directions_click"
                      eventProperties={{
                        location_id: location.id,
                        location_city: location.city,
                        state: location.stateCode,
                        placement: "location_detail",
                      }}
                    >
                      Get Directions
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </TrackedLink>
                  </Button>
                ) : (
                  <span className="inline-flex h-10 items-center justify-center rounded-full border border-black/15 px-4 text-sm font-bold text-muted-foreground">
                    Directions coming soon
                  </span>
                )}

                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/locations">All locations</Link>
                </Button>
              </div>
            </article>
          </div>
        </Section>
      </div>
    </>
  );
}
