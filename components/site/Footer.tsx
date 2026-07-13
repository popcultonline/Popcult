import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.55fr_0.45fr] lg:px-8 lg:py-16">
        <div>
          <Link
            href="/"
            className="relative block h-14 w-48 overflow-hidden rounded-sm bg-white"
            aria-label="Pop Cult home"
          >
            <Image
              src="/brand/headerLogo.webp"
              alt="Pop Cult"
              fill
              sizes="192px"
              className="object-contain"
            />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            A regional pop culture destination for anime, Sanrio, Gundam,
            collectibles, plush, figures, gifts, and more.
          </p>
        </div>

        <nav
          className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 md:grid-cols-1"
          aria-label="Footer navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 font-semibold text-white/60 hover:text-white"
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          ))}
        </nav>

        <div className="flex items-start md:justify-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Also find us as
            </p>
            <Image
              src="/brand/charworld.jpg"
              alt="Character World"
              width={116}
              height={116}
              className="rounded-sm bg-white"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Pop Cult, with select Character World locations</p>
          <p>Store schedules and inventory can differ by location.</p>
        </div>
      </div>
    </footer>
  );
}
