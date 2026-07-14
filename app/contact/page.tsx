import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { brandOpenGraphImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find Pop Cult and Character World store contacts for directions, phone numbers, hours, shopping questions, business inquiries, and email updates.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Pop Cult",
    description:
      "Find Pop Cult and Character World store contacts for directions, phone numbers, hours, shopping questions, business inquiries, and email updates.",
    url: "/contact",
    images: brandOpenGraphImages,
  },
};

const contactReasons = [
  {
    icon: MapPin,
    title: "Store questions",
    text: "For hours, directions, phone numbers, and local store questions, start with the locations list.",
    link: "/locations",
    label: "Browse locations",
    color: "bg-primary text-white",
  },
  {
    icon: HelpCircle,
    title: "Shopping questions",
    text: "Inventory changes by store, so your nearest location is the best current point of contact before a special trip.",
    link: "/locations",
    label: "Find nearest store",
    color: "bg-[#171717] text-[#ffe200]",
  },
  {
    icon: Mail,
    title: "General and business inquiries",
    text: "For partnerships, vendors, leasing, and other business questions. Store-specific questions should go to your nearest store. Response times may vary.",
    link: "mailto:popcultatlanta@gmail.com",
    label: "popcultatlanta@gmail.com",
    ariaLabel:
      "Email Pop Cult for general and business inquiries at popcultatlanta@gmail.com",
    color: "bg-[#ffe200]",
  },
  {
    icon: Mail,
    title: "Email updates",
    text: "Join the Pop Cult email list for new finds, store updates, and events sent occasionally.",
    link: "#newsletter",
    label: "Join the email list",
    color: "bg-white text-primary ring-1 ring-black/10",
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
            Pick the path that matches what you need. Store teams are the best
            source for local hours, directions, and what is currently available
            in person.
          </p>
        </div>
      </Section>

      <div className="bg-[#eee8f6]">
        <Section>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contactReasons.map(
              ({ icon: Icon, title, text, link, label, ariaLabel, color }) => (
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
                    link.startsWith("mailto:") ? (
                      <a
                        href={link}
                        aria-label={ariaLabel}
                        className="mt-auto inline-flex items-center gap-2 break-all pt-8 text-sm font-bold underline-offset-4 hover:underline"
                      >
                        {label}
                        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                      </a>
                    ) : (
                      <Link
                        href={link}
                        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold underline-offset-4 hover:underline"
                      >
                        {label}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    )
                  ) : null}
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

      <NewsletterSignup source="contact_page" />
    </>
  );
}
