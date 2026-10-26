import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppIcon } from "@/components/brand/AppIcon";
import { PlatformIcon } from "@/components/brand/PlatformIcon";
import {
  isReleased,
  platformLabels,
  productGroups,
  products,
  type Platform,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = "all" | Platform;
const filters: Filter[] = ["all", "mac", "windows", "linux", "web"];

function AppCard({ product }: { product: Product }) {
  const released = isReleased(product);
  return (
    <div className="nv-card relative flex min-h-[210px] flex-col gap-3.5 rounded-[18px] border border-border bg-card p-[22px]">
      {/* The whole card opens the detail page; the stretched link sits under the content. */}
      <Link
        to="/$slug"
        params={{ slug: product.slug }}
        aria-label={`Open ${product.name} details`}
        className="absolute inset-0 z-[1] rounded-[18px]"
      />
      <div className="pointer-events-none relative flex items-center gap-3.5">
        <AppIcon product={product} size={52} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-display text-xl font-semibold tracking-[-0.02em]">
            {product.name}
          </span>
          <span className="text-[13px] text-muted-foreground">{product.blurb}</span>
        </div>
        {product.badge && (
          <span className="rounded-full bg-surface-2 px-2 py-[3px] text-[11px] font-semibold text-muted-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <p className="pointer-events-none relative m-0 text-[15px] leading-[1.55]">{product.short}</p>
      <div className="relative mt-auto flex items-center justify-between gap-3">
        <div className="pointer-events-none flex flex-wrap items-center gap-2.5 text-muted-foreground">
          {product.platforms.map((p) => (
            <span
              key={p}
              role="img"
              aria-label={platformLabels[p]}
              title={platformLabels[p]}
              className="inline-flex p-0.5"
            >
              <PlatformIcon platform={p} />
            </span>
          ))}
        </div>
        <Link
          to="/$slug"
          params={{ slug: product.slug }}
          aria-label={released ? `Get ${product.name}` : `${product.name}, coming soon`}
          className="nv-pill relative z-[2] whitespace-nowrap rounded-full border-[1.5px] border-pill-line px-[18px] py-[9px] text-sm font-semibold"
        >
          {released ? "Get" : "Coming soon"}
        </Link>
      </div>
    </div>
  );
}

export function AppGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const released = products.filter(isReleased).length;
  const upcoming = products.length - released;

  const groups = productGroups
    .map((g) => ({
      ...g,
      apps: products.filter(
        (p) => p.group === g.id && (filter === "all" || p.platforms.includes(filter)),
      ),
    }))
    .filter((g) => g.apps.length > 0);

  return (
    <section
      id="apps"
      aria-label="Apps"
      className="mx-auto flex max-w-[1200px] scroll-mt-16 flex-col gap-10 px-4 pb-24 pt-12 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="m-0 font-display text-[40px] font-semibold tracking-[-0.03em]">Apps</h2>
          <p className="m-0 text-base text-muted-foreground">
            {products.length} apps, one family. {released} ready to download
            {upcoming > 0 ? `, ${upcoming} on the way.` : "."}
          </p>
        </div>
        <div role="group" aria-label="Filter by platform" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={cn(
                  "nv-pill cursor-pointer rounded-full border-[1.5px] px-4 py-2.5 text-sm font-medium",
                  on
                    ? "border-nv-accent bg-nv-accent text-nv-accent-ink hover:bg-nv-accent"
                    : "border-pill-line bg-transparent text-foreground",
                )}
              >
                {f === "all" ? "All" : platformLabels[f]}
              </button>
            );
          })}
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.id} className="flex flex-col gap-[18px]">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="m-0 font-display text-2xl font-semibold tracking-[-0.02em]">
              {g.title}
            </h3>
            <span className="text-sm text-muted-foreground">{g.description}</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
            {g.apps.map((p) => (
              <AppCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
