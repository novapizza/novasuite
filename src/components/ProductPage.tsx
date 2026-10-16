import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, CircleCheck, Clock, Github } from "lucide-react";
import { useEffect, useId, useState, type CSSProperties } from "react";
import { AppIcon } from "@/components/brand/AppIcon";
import { PlatformIcon } from "@/components/brand/PlatformIcon";
import type { Platform, Product } from "@/lib/products";
import { fetchLatestReleaseManifest, isReleased, platformLabels, products } from "@/lib/products";
import { cn } from "@/lib/utils";

type ReleaseData = Record<string, { version?: string; href?: string }>;

type ClientEnv = { platform: "mac" | "windows" | null; arch: "x64" | "arm64" };

function downloadKey(platform: Platform, arch?: "x64" | "arm64") {
  return arch ? `${platform}:${arch}` : platform;
}

function detectClientPlatform(): "mac" | "windows" | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  // iOS declares "like Mac OS X" but can't install desktop builds.
  if (/iphone|ipad|ipod/i.test(ua)) return null;
  if (/macintosh|mac os x/i.test(ua)) return "mac";
  if (/windows/i.test(ua)) return "windows";
  return null;
}

async function detectClientArch(platform: "mac" | "windows" | null): Promise<"x64" | "arm64"> {
  if (typeof navigator === "undefined") return "x64";
  if ("userAgentData" in navigator) {
    try {
      const data = await (
        navigator as {
          userAgentData: {
            getHighEntropyValues: (h: string[]) => Promise<{ architecture?: string }>;
          };
        }
      ).userAgentData.getHighEntropyValues(["architecture"]);
      if (data.architecture === "arm") return "arm64";
      if (data.architecture === "x86") return "x64";
    } catch {
      // fall through to UA string
    }
  }
  if (/arm64|aarch64/i.test(navigator.userAgent)) return "arm64";
  // Safari/Firefox on Apple Silicon still report an Intel UA — default new-Mac hardware.
  return platform === "mac" ? "arm64" : "x64";
}

// "Download for Mac (Apple Silicon)" → "Apple Silicon"; labels without a build name → null.
function buildName(label: string) {
  return label.match(/\((.*)\)$/)?.[1] ?? null;
}

function joinPlatforms(platforms: Platform[]) {
  const labels = platforms.map((p) => platformLabels[p]);
  return labels.length > 1 ? `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}` : labels[0];
}

// Loads versions and download links from the release manifests, and works out
// the visitor's OS and CPU so the matching build comes first.
function useReleases(product: Product) {
  const [releaseData, setReleaseData] = useState<ReleaseData>({});
  const [client, setClient] = useState<ClientEnv | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    setReleaseData({});
    setLoaded(false);

    async function loadReleaseData() {
      try {
        const clientPlatform = detectClientPlatform();
        const clientArch = await detectClientArch(clientPlatform);
        if (active) setClient({ platform: clientPlatform, arch: clientArch });

        const updated: ReleaseData = {};
        await Promise.all(
          product.downloads.map(async (download) => {
            if (download.href !== null) return;
            if (download.platform !== "mac" && download.platform !== "windows") return;
            const arch = download.arch ?? clientArch;
            const result = await fetchLatestReleaseManifest(product, download.platform, arch);
            if (!active) return;
            updated[downloadKey(download.platform, download.arch)] = {
              version: result.version ?? undefined,
              href: result.href ?? undefined,
            };
          }),
        );
        if (active) setReleaseData((current) => ({ ...current, ...updated }));
      } catch {
        // network failure — leave releaseData empty, buttons stay disabled
      } finally {
        if (active) setLoaded(true);
      }
    }

    loadReleaseData();
    return () => {
      active = false;
    };
  }, [product]);

  return { releaseData, client, loaded };
}

function DownloadArea({
  product,
  platform,
  releaseData,
  client,
  loaded,
}: {
  product: Product;
  platform: Platform;
  releaseData: ReleaseData;
  client: ClientEnv | null;
  loaded: boolean;
}) {
  const released = isReleased(product);
  const downloads = product.downloads
    .filter((d) => d.platform === platform)
    .map((d) => ({
      ...d,
      href: d.href ?? releaseData[downloadKey(d.platform, d.arch)]?.href ?? null,
    }))
    // Builds for the visitor's CPU first.
    .sort((a, b) => {
      const rank = (d: typeof a) => (!client || !d.arch || d.arch === client.arch ? 0 : 1);
      return rank(a) - rank(b);
    });
  const [primary, ...rest] = downloads;
  const repoHref = `https://github.com/novapizza/${product.repo}`;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        {released && primary?.href ? (
          <a
            href={primary.href}
            className="flex-1 rounded-full bg-[var(--app-accent)] px-[18px] py-3.5 text-center text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-[var(--app-accent-night)] dark:text-[#16131F]"
          >
            {primary.label.replace(/ \(.*\)$/, "")}
            {buildName(primary.label) && (
              <span className="sr-only"> ({buildName(primary.label)})</span>
            )}
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="flex-1 rounded-full bg-surface-2 px-[18px] py-3.5 text-center text-[15px] font-semibold text-muted-foreground"
          >
            {released
              ? loaded
                ? "Download unavailable"
                : "Checking latest build…"
              : "Coming soon"}
          </span>
        )}
        <a
          href={repoHref}
          aria-label={`${product.name} on GitHub`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-pill-line text-foreground hover:bg-pill-hover"
        >
          <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </a>
      </div>
      {released && primary?.href && buildName(primary.label) && (
        <p className="m-0 text-xs text-muted-foreground">
          For {buildName(primary.label)}
          {rest
            .filter((d) => d.href)
            .map((d) => (
              <span key={d.label}>
                {" · "}
                <a href={d.href!} className="underline underline-offset-2 hover:text-foreground">
                  {buildName(d.label) ?? d.label}
                </a>
              </span>
            ))}
        </p>
      )}
    </div>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const { releaseData, client, loaded } = useReleases(product);
  const [picked, setPicked] = useState<Platform | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [useIdx, setUseIdx] = useState(0);
  const tabsId = useId();

  // Reset per-app UI state when navigating between apps.
  useEffect(() => {
    setPicked(null);
    setExpanded(false);
    setUseIdx(0);
  }, [product.slug]);

  const detected =
    client?.platform && product.platforms.includes(client.platform) ? client.platform : null;
  const platform = picked ?? detected ?? product.platforms[0];
  const released = isReleased(product);
  const version =
    Object.entries(releaseData).find(([key, v]) => key.startsWith(platform) && v.version)?.[1]
      .version ?? Object.values(releaseData).find((v) => v.version)?.version;

  const sameGroup = products.filter((p) => p.slug !== product.slug && p.group === product.group);
  const others = products.filter((p) => p.slug !== product.slug && p.group !== product.group);
  const more = [...sameGroup, ...others].slice(0, 3);

  const use = product.uses[Math.min(useIdx, product.uses.length - 1)];
  const glow = `${product.hue.c300}55`;
  const hueVars = {
    "--app-accent": product.hue.c700,
    "--app-accent-night": product.hue.c300,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="app-name"
      className="mx-auto flex max-w-[1200px] flex-col gap-7 px-4 pb-24 pt-8 sm:px-6"
      style={hueVars}
    >
      <Link
        to="/"
        hash="apps"
        className="inline-flex items-center gap-2 self-start py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        All apps
      </Link>

      <div className="flex flex-wrap items-start gap-8">
        <aside className="flex max-w-[400px] flex-[1_1_320px] flex-col gap-[22px] rounded-[20px] border border-border bg-card p-7">
          <div className="flex items-center gap-[18px]">
            <AppIcon product={product} size={88} />
            <div className="flex flex-col gap-1">
              <h1
                id="app-name"
                className="m-0 font-display text-[34px] font-semibold tracking-[-0.03em]"
              >
                {product.name}
              </h1>
              <span className="text-sm text-muted-foreground">{product.blurb}</span>
            </div>
          </div>

          <div role="tablist" aria-label="Platform" className="flex gap-1 border-b border-border">
            {product.platforms.map((p) => {
              const on = p === platform;
              return (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  id={`${tabsId}-${p}`}
                  aria-selected={on}
                  aria-controls={`${tabsId}-panel`}
                  onClick={() => setPicked(p)}
                  className={cn(
                    "-mb-px flex cursor-pointer flex-col items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-sm font-medium",
                    on
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  <PlatformIcon platform={p} size={20} />
                  {platformLabels[p]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1.5">
            <p className={cn("m-0 text-[15px] leading-[1.65]", !expanded && "line-clamp-4")}>
              {product.long}
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="cursor-pointer self-start py-1.5 text-sm font-medium text-nv-accent"
            >
              {expanded ? "View less" : "View more"}
            </button>
          </div>

          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-sm">
            <li className="flex items-center gap-2.5">
              <CircleCheck
                className="h-[18px] w-[18px] text-[var(--app-accent)] dark:text-[var(--app-accent-night)]"
                strokeWidth={1.8}
              />
              {released ? "Available for " : "Coming soon for "}
              {joinPlatforms(product.platforms)}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {released
                ? version
                  ? `Version ${version}`
                  : loaded
                    ? "Latest version"
                    : "Checking version…"
                : "No build yet"}
            </li>
            <li className="flex items-center gap-2.5">
              <Github className="h-[18px] w-[18px]" strokeWidth={1.6} />
              Open source on GitHub
            </li>
          </ul>

          <div role="tabpanel" id={`${tabsId}-panel`} aria-labelledby={`${tabsId}-${platform}`}>
            <DownloadArea
              product={product}
              platform={platform}
              releaseData={releaseData}
              client={client}
              loaded={loaded}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
          {/* Screenshot slot: a framed placeholder until real screenshots are added. */}
          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[20px] border border-border"
            style={{
              background: `radial-gradient(900px 420px at 28% 18%, ${glow}, rgba(0,0,0,0) 62%), #0F0D17`,
            }}
          >
            <div className="flex h-[80%] w-[86%] flex-col sm:h-[74%] sm:w-[80%] overflow-hidden rounded-[14px] border border-white/12 bg-white/[0.04]">
              <div className="flex gap-[7px] border-b border-white/8 px-3.5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex min-h-0 flex-1">
                <div className="flex w-[22%] flex-col gap-2.5 border-r border-white/8 px-3 py-4">
                  <span
                    className="h-2 w-[70%] rounded opacity-70"
                    style={{ background: product.hue.c300 }}
                  />
                  <span className="h-2 w-[85%] rounded bg-white/14" />
                  <span className="h-2 w-[60%] rounded bg-white/14" />
                  <span className="h-2 w-[75%] rounded bg-white/14" />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
                  <span className="scale-[0.6] sm:scale-100">
                    <AppIcon product={product} size={96} />
                  </span>
                  <span className="hidden font-mono text-xs text-white/55 sm:inline">
                    Screenshot coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <h2 className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">
              Main uses
            </h2>
            <div className="flex flex-wrap overflow-hidden rounded-[20px] border border-border bg-card">
              <div
                role="tablist"
                aria-label="Main uses"
                aria-orientation="vertical"
                className="flex flex-[1_1_300px] flex-col py-5"
              >
                {product.uses.map((u, i) => {
                  const on = u === use;
                  return (
                    <button
                      key={u.title}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls={`${tabsId}-use`}
                      onClick={() => setUseIdx(i)}
                      className={cn(
                        "flex cursor-pointer flex-col gap-1.5 px-7 py-3.5 text-left",
                        on
                          ? "text-foreground shadow-[inset_3px_0_0_var(--app-accent)] dark:shadow-[inset_3px_0_0_var(--app-accent-night)]"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="text-base font-semibold">{u.title}</span>
                      {on && (
                        <span className="text-sm leading-[1.55] text-muted-foreground">
                          {u.body}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div
                role="tabpanel"
                id={`${tabsId}-use`}
                className="flex min-h-[280px] flex-[1_1_320px] flex-col justify-end gap-2.5 p-8 text-white"
                style={{
                  background: `radial-gradient(500px 300px at 70% 20%, ${glow}, rgba(0,0,0,0) 70%), #120F1C`,
                }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-[0.12em]"
                  style={{ color: product.hue.c300 }}
                >
                  {String(product.uses.indexOf(use) + 1).padStart(2, "0")} /{" "}
                  {String(product.uses.length).padStart(2, "0")}
                </span>
                <span className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em]">
                  {use.title}
                </span>
                <span className="text-[15px] leading-relaxed text-[#CFC9E4]">{use.body}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[18px]">
            <h2 className="m-0 font-display text-[26px] font-semibold tracking-[-0.02em]">
              More from Nova Suite
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to="/$slug"
                  params={{ slug: p.slug }}
                  className="nv-card flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-foreground"
                >
                  <AppIcon product={p} size={44} />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-display text-[17px] font-semibold">{p.name}</span>
                    <span className="text-[13px] text-muted-foreground">{p.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
