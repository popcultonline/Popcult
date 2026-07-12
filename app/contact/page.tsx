import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HelpCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pop Cult / Character World about store questions, general inquiries, or partnerships.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Pop Cult",
    description:
      "Contact Pop Cult / Character World about store questions, general inquiries, or partnerships.",
    url: "/contact",
  },
};

const contactReasons = [
  {
    icon: MapPin,
    title: "Store questions",
    text: "For hours, directions, or inventory questions, start with our locations list.",
    link: "/locations",
    label: "Browse locations",
    color: "bg-primary text-white",
  },
  {
    icon: Building2,
    title: "Business & partnerships",
    text: "Have a partnership, leasing, or business inquiry? Contact details are coming soon.",
    color: "bg-[#ffe200]",
  },
  {
    icon: HelpCircle,
    title: "General help",
    text: "Need help with something else? General contact details are being confirmed.",
    color: "bg-[#171717] text-[#ffe200]",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pb-12 sm:pb-16">
        <div className="max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Contact us
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Let&apos;s get you to the right place.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Whether you have a store question or a bigger idea, here is where
            to start.
          </p>
        </div>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <div className="grid gap-5 lg:grid-cols-3">
            {contactReasons.map(
              ({ icon: Icon, title, text, link, label, color }) => (
                <article
                  key={title}
                  className="flex min-h-80 flex-col rounded-[2rem] bg-white p-7 ring-1 ring-black/5"
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${color}`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-8 text-2xl font-black tracking-tight">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                  {link && label ? (
                    <Link
                      href={link}
                      className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold underline-offset-4 hover:underline"
                    >
                      {label}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  ) : (
                    <p className="mt-auto pt-8 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Details coming soon
                    </p>
                  )}
                </article>
              )
            )}
          </div>
        </Section>
      </div>

      <Section className="text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
          Prefer to visit in person?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Our stores are the best place to browse current inventory and get
          local help.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <TrackedLink
            href="/locations"
            eventName="find_store_click"
            eventProperties={{ placement: "contact_page" }}
          >
            Find a store
          </TrackedLink>
        </Button>
      </Section>
    </>
  );
}
