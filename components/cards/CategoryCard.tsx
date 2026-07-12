import Image from "next/image";
import type { Category } from "@/data/categories";
import { CategoryViewTracker } from "@/components/analytics/CategoryViewTracker";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#171717] shadow-sm ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-1">
      <CategoryViewTracker category={category.name} />
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        style={{ objectPosition: category.imagePosition }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <h3 className="text-4xl font-black leading-none tracking-[-0.055em]">
          {category.name}
        </h3>
        <ul
          className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.08em] text-[#ffe200]"
          aria-label={`${category.name} products`}
        >
          {category.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
