import type { Metadata } from "next";
import { ArrowRight, Heart, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { brandOpenGraphImages } from "@/lib/site";
import { locationCount, stateCount } from "@/data/locations";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Pop Cult / Character World, a regional pop culture retailer built around discovery, fandom, and physical stores.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Pop Cult",
    description:
      "Meet Pop Cult / Character World, a regional pop culture retailer built around discovery, fandom, and physical stores.",
    url: "/about",
    images: brandOpenGraphImages,
  },
};

const principles = [
  {
    icon: Sparkles,
    title: "Discovery first",
    text: "Our stores are designed for browsing: familiar favorites beside things you did not expect to find.",
    color: "bg-[#ffe200]",
  },
  {
    icon: Heart,
    title: "Fandom is personal",
    text: "There is no single way to be a fan. We welcome collectors, builders, gift-givers, and the simply curious.",
    color: "bg-primary text-white",
  },
  {
    icon: Store,
    title: "Local matters",
    text: "Physical retail creates moments of connection and lets every community shape what its store becomes.",
    color: "bg-[#eee8f6]",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-12 sm:pb-16">
        <div className="max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            About Pop Cult
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            A store for the things that make you light up.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Pop Cult / Character World is a regional retail destination for
            anime, Sanrio, Gundam, figures, plush, collectibles, gifts, and
            plenty of happy surprises.
          </p>
        </div>
      </Section>

      <div className="bg-[#171717] text-white">
        <Section>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text, color }) => (
              <article
                key={title}
                className="rounded-[2rem] bg-white/7 p-7 ring-1 ring-white/10"
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${color}`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-8 text-2xl font-black tracking-tight">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="grid aspect-square content-between overflow-hidden rounded-[2.5rem] border-[7px] border-[#171717] bg-primary p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-white/65">
              Regional specialty retail
            </p>
            <div>
              <p className="text-7xl font-black leading-none tracking-[-0.07em] sm:text-8xl">
                {locationCount}
              </p>
              <p className="mt-2 text-xl font-black">
                locations across {stateCount} states
              </p>
            </div>
            <p className="border-t border-white/25 pt-4 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Florida · Georgia · South Carolina · Tennessee
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Around the Southeast
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Regional roots. A whole world of character.
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              With stores across Georgia, South Carolina, Tennessee, and
              Florida, we make pop culture discovery a local experience. Our
              mix can vary from store to store, which is part of the fun.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <TrackedLink
                href="/locations"
                eventName="find_store_click"
                eventProperties={{ placement: "about_page" }}
              >
                Find your nearest store
                <ArrowRight aria-hidden="true" className="size-4" />
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
