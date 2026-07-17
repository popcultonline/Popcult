import Link from "next/link";
import { ArrowRight, Heart, Search, Store } from "lucide-react";
import { Section } from "@/components/site/Section";
import { locationCount } from "@/data/locations";

const values = [
  {
    icon: Search,
    title: "Made for discovery",
    text: "A broad, changing mix means there is always another shelf to explore.",
  },
  {
    icon: Store,
    title: "Rooted in retail",
    text: "Physical stores make it easy to browse, compare, and find a favorite.",
  },
  {
    icon: Heart,
    title: "For every kind of fan",
    text: "From casual gift hunters to dedicated collectors and builders.",
  },
];

export function AboutPreview() {
  return (
    <Section>
      <div className="overflow-hidden rounded-[2.5rem] bg-[#171717] px-6 py-10 text-white sm:px-10 sm:py-14 lg:p-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">
              A regional original
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              More character. More to discover.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              Pop Cult is a regional specialty retailer with {locationCount}{" "}
              locations in major mall destinations across four Southeastern
              states.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white underline-offset-4 hover:underline"
            >
              Get to know us
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-3xl bg-white/8 p-5 ring-1 ring-white/10"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-[#ffe200] text-black">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
