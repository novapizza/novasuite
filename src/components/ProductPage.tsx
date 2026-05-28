import { Apple, AppWindow, Download, Globe, Terminal } from "lucide-react";
import type { ComponentProps } from "react";
import { ProductMockup } from "@/components/ProductMockup";
import type { Platform, Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const platformLabels: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  web: "Web",
};

function PlatformIcon({ p }: { p: Platform }) {
  if (p === "mac") return <Apple className="h-3.5 w-3.5" />;
  if (p === "windows") return <AppWindow className="h-3.5 w-3.5" />;
  if (p === "linux") return <Terminal className="h-3.5 w-3.5" />;
  return <Globe className="h-3.5 w-3.5" />;
}

type DownloadButtonProps = {
  download: Product["downloads"][number];
  variant: "primary" | "secondary";
  showDownloadIcon?: boolean;
  className?: string;
};

function DownloadButton({ download, variant, showDownloadIcon, className }: DownloadButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 sm:py-3";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background shadow-glow dark:bg-[linear-gradient(135deg,#6366f1,#7c3aed_55%,#818cf8)] dark:text-white dark:font-semibold"
      : "border border-border bg-card/80 text-foreground backdrop-blur hover:bg-card";
  const motion = variant === "primary" ? "transition-transform hover:-translate-y-0.5" : "";

  const icon = showDownloadIcon ? (
    <Download className="h-4 w-4" />
  ) : (
    <PlatformIcon p={download.platform} />
  );

  if (download.href === null) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Coming soon"
        className={cn(base, styles, "cursor-not-allowed opacity-50", className)}
      >
        {icon}
        {download.label}
        <span className="ml-1 rounded-md bg-background/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
          Soon
        </span>
      </button>
    );
  }

  const isExternal = /^https?:/i.test(download.href);
  const extraProps: ComponentProps<"a"> = isExternal ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <a href={download.href} className={cn(base, styles, motion, className)} {...extraProps}>
      {icon}
      {download.label}
    </a>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const Icon = product.icon;
  const [primary, ...rest] = product.downloads;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 sm:px-5 md:px-7">
      {/* Eyebrow */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: product.accent }} />
          Nova Suite · {product.name}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {product.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              <PlatformIcon p={p} />
              {platformLabels[p]}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <header className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${product.accent}, #a5f3fc)` }}
            >
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              {product.name}
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            <span className="text-foreground">{product.tagline.lead}</span>
            {product.tagline.accent && (
              <>
                <br />
                <span className="text-vapor">{product.tagline.accent}</span>
              </>
            )}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
            {product.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            <DownloadButton download={primary} variant="primary" showDownloadIcon />
            {rest.map((d) => (
              <DownloadButton key={d.label} download={d} variant="secondary" />
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Latest version · MIT licensed
          </div>
        </div>

        <ProductMockup product={product} />
      </header>

      {/* Features */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            What makes {product.name} different
          </h2>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
            04 / Highlights
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f, i) => (
            <article
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60"
                  style={{ color: product.accent }}
                >
                  <f.icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: product.accent }} />
                </span>
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{f.body}</p>
              <div
                className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-60"
                style={{ background: product.accent }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-8">
        <div className="rounded-3xl border border-border bg-chrome p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Built with</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Engineering
            </span>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {product.stack.map((s) => (
              <div key={s.label} className="bg-card p-3">
                <div className="font-display text-base font-semibold tracking-tight sm:text-lg">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-5 text-center backdrop-blur sm:p-6 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(50% 60% at 50% 40%, ${product.accent}33, transparent 70%)`,
            }}
          />
          <div className="relative">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Ready for the upgrade?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Install {product.name} in under a minute. Open source, MIT licensed, and built for
              people who care about the details.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
              <DownloadButton download={primary} variant="primary" showDownloadIcon />
              {rest.map((d) => (
                <DownloadButton key={d.label} download={d} variant="secondary" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
