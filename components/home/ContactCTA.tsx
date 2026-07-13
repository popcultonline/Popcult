import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/Section";

export function ContactCTA() {
  return (
    <Section className="pt-4 sm:pt-8 lg:pt-8">
      <div className="flex flex-col gap-8 border-y border-black/10 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Need a hand?
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Store question, shopping question, or want email updates?
          </h2>
        </div>
        <Link
          href="/contact"
          className="group grid size-20 shrink-0 place-items-center rounded-full bg-[#ffe200] text-black ring-4 ring-primary transition-transform hover:scale-105 sm:size-24"
          aria-label="Contact Pop Cult"
        >
          <ArrowUpRight
            aria-hidden="true"
            className="size-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </Section>
  );
}
