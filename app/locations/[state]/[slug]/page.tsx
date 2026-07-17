import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Store,
} from "lucide-react";
import {
  getDirectionsUrl,
  getHoursHeading,
  getLocationByRoute,
  getLocationPath,
  getLocationStaticParams,
  getLocationStructuredData,
  getPhoneContactType,
  getPhoneHref,
} from "@/data/locations";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { brandOpenGraphImages, getAbsoluteUrl } from "@/lib/site";

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

  const storefrontImage = {
    url: getAbsoluteUrl(location.storefrontImage),
    alt: location.storefrontAlt,
  };

  return {
    title: location.seoTitle,
    description: location.seoDescription,
    alternates: {
      canonical: getLocationPath(location),
    },
    openGraph: {
      title: location.seoTitle,
      description: location.seoDescription,
      url: getLocationPath(location),
      images: [storefrontImage, ...brandOpenGraphImages],
    },
    twitter: {
      card: "summary_large_image",
      title: location.seoTitle,
      description: location.seoDescription,
      images: [getAbsoluteUrl(location.storefrontImage)],
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
  const phoneHref = getPhoneHref(location);
  const phoneContactType = getPhoneContactType(location);
  const locationUrl = getAbsoluteUrl(getLocationPath(location));
  const jsonLd = getLocationStructuredData(location, locationUrl);
  const phoneLabel =
    location.phone.type === "direct"
      ? location.phone.number
      : `${location.phone.label}: ${location.phone.number}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
              {location.officialName}
              {location.area ? (
                <span className="block text-3xl tracking-[-0.04em] text-muted-foreground sm:text-5xl">
                  {location.area}
                </span>
              ) : null}
            </h1>
          </div>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            {location.description}
          </p>
        </div>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="space-y-6 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/10">
                <Image
                  src={location.storefrontImage}
                  alt={location.storefrontAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover"
                  style={{
                    objectPosition:
                      location.storefrontPosition ?? "center center",
                  }}
                />
              </div>

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
                    <dd className="mt-1 text-lg font-black">{location.mall}</dd>
                  </div>
                  <div>
                    <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                      City
                    </dt>
                    <dd className="mt-1 text-lg font-black">
                      {location.city}, {location.stateCode}
                    </dd>
                  </div>
                  {location.bestEntrance ? (
                    <div>
                      <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                        Best entrance
                      </dt>
                      <dd className="mt-1 text-lg font-black">
                        {location.bestEntrance}
                      </dd>
                    </div>
                  ) : null}
                  {location.inMallLocation ? (
                    <div>
                      <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                        In the mall
                      </dt>
                      <dd className="mt-1 text-lg font-black">
                        {location.inMallLocation}
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="font-black uppercase tracking-[0.14em] text-white/45">
                      Schedule source
                    </dt>
                    <dd className="mt-1 text-lg font-black">
                      {location.hours.basis === "verified-store"
                        ? "Verified store-specific hours"
                        : "Regular shopping-center hours"}
                    </dd>
                  </div>
                </dl>
              </article>
            </div>

            <div className="space-y-6 lg:order-1">
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
                      <span className="block">{location.address.streetAddress}</span>
                      <span className="block">
                        {location.address.addressLocality},{" "}
                        {location.address.addressRegion}{" "}
                        {location.address.postalCode}
                      </span>
                    </span>
                  </div>
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
                        contact_type: phoneContactType,
                      }}
                      className="font-black underline-offset-4 hover:underline"
                    >
                      {phoneLabel}
                    </TrackedLink>
                  </div>
                </address>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                  >
                    <Link href="/locations">All locations</Link>
                  </Button>
                </div>
              </article>

              <article
                aria-labelledby="store-hours-heading"
                className="rounded-[2rem] bg-white p-7 ring-1 ring-black/10 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#ffe200] text-black">
                    <Clock aria-hidden="true" className="size-5" />
                  </span>
                  <h2
                    id="store-hours-heading"
                    className="text-3xl font-black tracking-[-0.045em]"
                  >
                    {getHoursHeading(location)}
                  </h2>
                </div>
                <dl className="mt-6 divide-y divide-black/10">
                  {location.hours.rules.map((rule) => (
                    <div
                      key={`${rule.daysLabel}-${rule.label}`}
                      className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <dt className="font-black">{rule.daysLabel}</dt>
                      <dd className="text-sm font-bold text-muted-foreground sm:text-base">
                        {rule.label}
                      </dd>
                    </div>
                  ))}
                </dl>
                {location.hours.provisionalNote ? (
                  <p className="mt-5 rounded-2xl bg-[#eee8f6] p-4 text-sm font-bold leading-6 text-black/70">
                    {location.hours.provisionalNote}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {location.hours.generalNote}
                </p>
              </article>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
