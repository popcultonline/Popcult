import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getStateGroupBySlug,
  getStatePath,
  getStateStaticParams,
} from "@/data/locations";
import { LocationCard } from "@/components/cards/LocationCard";
import { Section } from "@/components/site/Section";
import { brandOpenGraphImages } from "@/lib/site";

type StateLocationsPageProps = {
  params: Promise<{
    state: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStateStaticParams();
}

export async function generateMetadata({
  params,
}: StateLocationsPageProps): Promise<Metadata> {
  const { state } = await params;
  const group = getStateGroupBySlug(state);

  if (!group) {
    return {
      title: "Locations not found",
    };
  }

  const title = `${group.state} Locations`;
  const description = `Find Pop Cult and Character World stores in ${group.state}.`;

  return {
    title,
    description,
    alternates: {
      canonical: getStatePath(group),
    },
    openGraph: {
      title,
      description,
      url: getStatePath(group),
      images: brandOpenGraphImages,
    },
  };
}

export default async function StateLocationsPage({
  params,
}: StateLocationsPageProps) {
  const { state } = await params;
  const group = getStateGroupBySlug(state);

  if (!group) {
    notFound();
  }

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
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Find a store
        </p>
        <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          {group.state} locations.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          Browse Pop Cult and Character World stores in {group.state}.
        </p>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <h2 id={`stores-${group.code}`} className="sr-only">
            Stores in {group.state}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {group.locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
