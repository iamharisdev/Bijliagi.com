import Image from "next/image";
import Link from "next/link";
import type { ItemWithCategory } from "@/content/services";
import { formatPKR } from "@/lib/utils";
import { AddToQuoteButton } from "@/components/add-to-quote";
import { ArrowRightIcon, CategoryGlyph } from "@/components/icons";

export type ItemCardData = Pick<
  ItemWithCategory,
  | "key"
  | "href"
  | "name"
  | "image"
  | "imageAlt"
  | "badge"
  | "categoryName"
  | "categoryIcon"
  | "price"
  | "unit"
  | "from"
  | "categorySlug"
  | "summary"
>;

export function ItemCard({ item, showCategory = true }: { item: ItemCardData; showCategory?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift">
      <Link href={item.href} className="relative block overflow-hidden bg-ink" tabIndex={-1} aria-hidden="true">
        <Image
          src={item.image}
          alt=""
          width={600}
          height={450}
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
          className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {item.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-spark px-2.5 py-1 text-xs font-bold text-ink shadow">{item.badge}</span>
        )}
        <span className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-xl bg-white/95 text-brand shadow backdrop-blur">
          <CategoryGlyph icon={item.categoryIcon} className="size-5" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {showCategory && <p className="text-xs font-bold tracking-[0.1em] text-brand uppercase">{item.categoryName}</p>}
        <h3 className="mt-1 text-[1.55rem]">
          <Link href={item.href} className="hover:text-brand">
            {item.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-steel">{item.summary}</p>
        <p className="mt-3 tabular-nums">
          {item.from && <span className="text-sm text-steel">from </span>}
          <span className="text-xl font-extrabold text-brand-deep">{formatPKR(item.price)}</span>
          <span className="text-sm text-steel"> {item.unit}</span>
        </p>
        <div className="mt-auto flex gap-2 pt-4">
          <AddToQuoteButton itemKey={item.key} className="flex-1" />
          <Link
            href={item.href}
            aria-label={`${item.name} details`}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
