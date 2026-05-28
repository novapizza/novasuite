import { Apple, AppWindow, Download, Globe, Terminal } from "lucide-react";
import { ProductMockup } from "@/components/ProductMockup";
import type { Product } from "@/lib/products";

const platformLabels: Record<NonNullable<Product["platforms"][number]>, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  web: "Web",
};

function PlatformIcon({ p }: { p: Product["platforms"][number] }) {
  if (p === "mac") return <Apple className="h-3.5 w-3.5" />;
  if (p === "windows") return <AppWindow className="h-3.5 w-3.5" />;
  if (p === "linux") return <Terminal className="h-3.5 w-3.5" />;
  return <Globe className="h-3.5 w-3.5" />;
}

export function ProductPage({ product }: { product: Product }) {
  const Icon = product.icon;
  const [primary, ...rest] = product.downloads;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-4 md:px-7">
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
      <header className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${product.accent}, #a5f3fc)` }}
            >
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">{product.name}</span>
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            {(() => {
              const [lead, accent] = product.tagline.split("|");
              return (
                <>
                  <span className="text-foreground">{lead}</span>
                  {accent && (
                    <>
                      <br />
                      <span className="text-vapor">{accent}</span>
                    </>
                  )}
                </>
              );
            })()}
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{product.description}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={primary.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background shadow-glow dark:bg-vapor dark:text-[oklch(0.18_0.04_280)] dark:font-semibold transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              {primary.label}
            </a>
            {rest.map((d) => (
              <a
                key={d.label}
                href={d.href}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-card"
              >
                <PlatformIcon p={d.platform} />
                {d.label}
              </a>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Latest version · MIT licensed · No telemetry
          </div>
        </div>

        <ProductMockup product={product} />
      </header>

      {/* Features */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            What makes {product.name} different
          </h2>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:block">
            04 / Highlights
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f, i) => (
            <article
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  0{i + 1}
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: product.accent }}
                />
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
                <div className="font-display text-lg font-semibold tracking-tight">{s.value}</div>
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
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 text-center backdrop-blur md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(50% 60% at 50% 40%, ${product.accent}33, transparent 70%)`,
            }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Ready for the upgrade?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Install {product.name} in under a minute. Open source, MIT licensed, and built for people who care about
              the details.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background shadow-glow dark:bg-vapor dark:text-[oklch(0.18_0.04_280)] dark:font-semibold transition-transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" />
                {primary.label}
              </a>
              {rest.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <PlatformIcon p={d.platform} />
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
