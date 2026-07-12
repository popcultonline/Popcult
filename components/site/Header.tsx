import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#111] text-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-28 lg:px-8">
        <Link
          href="/"
          className="relative block h-12 w-52 shrink-0 rounded-sm sm:h-14 sm:w-60 lg:h-16 lg:w-72"
          aria-label="Pop Cult home"
        >
          <Image
            src="/brand/headerLogo.webp"
            alt="Pop Cult"
            fill
            priority
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 288px"
            className="object-contain object-left"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-bold text-white/70 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          className="hidden h-11 rounded-full bg-[#ffe200] px-5 font-black text-black hover:bg-[#f2d600] md:inline-flex"
        >
          <TrackedLink
            href="/locations"
            eventName="find_store_click"
            eventProperties={{ placement: "header" }}
          >
            <MapPin aria-hidden="true" className="size-4" />
            Find a Store
          </TrackedLink>
        </Button>

        <details className="group relative md:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="size-5" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-14 w-56 rounded-2xl border border-white/10 bg-[#181818] p-2 text-white shadow-2xl"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <TrackedLink
              href="/locations"
              eventName="find_store_click"
              eventProperties={{ placement: "mobile_header" }}
              className="mt-1 flex items-center gap-2 rounded-xl bg-[#ffe200] px-4 py-3 text-sm font-black text-black"
            >
              <MapPin aria-hidden="true" className="size-4" />
              Find a Store
            </TrackedLink>
          </nav>
        </details>
      </div>
      <ScrollProgress />
    </header>
  );
}
