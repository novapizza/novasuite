import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import { AppIcon } from "@/components/brand/AppIcon";
import { NOVA_STAR_PATH } from "@/components/brand/NovaLogo";
import { GITHUB_URL } from "@/components/site/SiteHeader";
import { scrollToId } from "@/hooks/use-scroll-var";
import { getProduct, isReleased, products, type ProductSlug } from "@/lib/products";

type Star = { x: number; y: number; r: number; o: number; c: string; tw: boolean; d: number };

// Seeded so the server and the client draw the same sky.
function makeStars() {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const layer = (
    n: number,
    rmin: number,
    rmax: number,
    omin: number,
    omax: number,
    band: boolean,
  ) => {
    const out: Star[] = [];
    for (let i = 0; i < n; i++) {
      const x = rnd() * 1440;
      // Most stars in a band along the milky way, the rest scattered.
      const y =
        band && rnd() < 0.55 ? 700 - x * 0.31 + (rnd() + rnd() + rnd() - 1.5) * 120 : rnd() * 900;
      const pick = rnd();
      out.push({
        x: +x.toFixed(1),
        y: +y.toFixed(1),
        r: +(rmin + rnd() * (rmax - rmin)).toFixed(2),
        o: +(omin + rnd() * (omax - omin)).toFixed(2),
        c: pick < 0.1 ? "#C4B5FD" : pick < 0.16 ? "#A5F3FC" : "#FFFFFF",
        tw: rnd() < 0.35,
        d: +(rnd() * 4).toFixed(2),
      });
    }
    return out;
  };
  return {
    far: layer(230, 0.4, 1, 0.25, 0.7, true),
    mid: layer(90, 0.8, 1.5, 0.4, 0.85, true),
    near: layer(28, 1.3, 2.3, 0.6, 1, false),
  };
}

const NODES: [ProductSlug, number, number][] = [
  ["novapad", 90, 120],
  ["novagitx", 230, 52],
  ["novaproxy", 370, 150],
  ["nmtr", 510, 80],
  ["lumia", 470, 270],
  ["novafinder", 320, 330],
  ["novaclipboard", 170, 300],
  ["novakey", 80, 440],
  ["cirrus", 300, 480],
];
type NodeId = ProductSlug | "star";
const EDGES: [NodeId, NodeId][] = [
  ["novapad", "novagitx"],
  ["novagitx", "novaproxy"],
  ["novaproxy", "nmtr"],
  ["novaproxy", "lumia"],
  ["lumia", "novafinder"],
  ["novafinder", "novaclipboard"],
  ["novaclipboard", "novapad"],
  ["novaclipboard", "novakey"],
  ["novafinder", "cirrus"],
  ["lumia", "star"],
  ["cirrus", "star"],
];
const POS = Object.fromEntries([
  ...NODES.map(([id, x, y]) => [id, [x, y]]),
  ["star", [520, 440]],
]) as Record<NodeId, [number, number]>;
const ADJ: Record<string, NodeId[]> = {};
for (const [a, b] of EDGES) {
  (ADJ[a] ??= []).push(b);
  (ADJ[b] ??= []).push(a);
}

function bfs(from: NodeId) {
  const depth: Partial<Record<NodeId, number>> = { [from]: 0 };
  const queue: NodeId[] = [from];
  while (queue.length) {
    const u = queue.shift()!;
    for (const v of ADJ[u] ?? []) {
      if (depth[v] === undefined) {
        depth[v] = depth[u]! + 1;
        queue.push(v);
      }
    }
  }
  return depth as Record<NodeId, number>;
}

// Lines draw in from the far end of the graph towards the Nova star on load.
const STAR_DEPTH = bfs("star");
const MAX_DEPTH = Math.max(...Object.values(STAR_DEPTH));
const FLASH_DELAY = ((MAX_DEPTH - 1) * 0.6 + 0.3 + 0.8).toFixed(2);

function StarLayer({
  stars,
  k,
  top,
  height,
}: {
  stars: Star[];
  k: number;
  top: string;
  height: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="nv-par absolute left-0 w-full"
      style={{ top, height, "--k": k } as CSSProperties}
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.c}
          opacity={s.o}
          className={s.tw ? "nv-tw" : undefined}
          style={{ animationDelay: `${s.d}s` }}
        />
      ))}
    </svg>
  );
}

function Constellation() {
  const navigate = useNavigate();
  const [hover, setHover] = useState<ProductSlug | null>(null);
  const depth = hover ? bfs(hover) : null;
  const hovered = hover ? getProduct(hover) : undefined;

  return (
    <div
      className="absolute right-[5%] top-[15%] z-[3] hidden h-[560px] w-[600px] lg:block"
      style={{
        transform:
          "translate3d(0, calc(var(--nv-sy, 0) * -0.22px), 0) rotate(calc(var(--nv-sy, 0) * 0.008deg))",
      }}
    >
      <svg
        aria-hidden="true"
        width="600"
        height="560"
        viewBox="0 0 600 560"
        className="absolute inset-0 overflow-visible"
      >
        {EDGES.map(([a, b]) => {
          const [f, t] = STAR_DEPTH[a] >= STAR_DEPTH[b] ? [a, b] : [b, a];
          const lit = hover !== null && (a === hover || b === hover);
          return (
            <line
              key={`${a}-${b}`}
              x1={POS[f][0]}
              y1={POS[f][1]}
              x2={POS[t][0]}
              y2={POS[t][1]}
              pathLength={1}
              className="nv-draw"
              strokeLinecap="round"
              style={{
                stroke: "var(--const-line)",
                strokeWidth: lit ? 2.4 : 1.5,
                transition: "stroke 700ms ease, stroke-width 300ms ease",
                animationDelay: `${((MAX_DEPTH - STAR_DEPTH[f]) * 0.6 + 0.3).toFixed(2)}s`,
              }}
            />
          );
        })}
        {hovered &&
          depth &&
          EDGES.map(([a, b]) => {
            const [f, t] = depth[a] <= depth[b] ? [a, b] : [b, a];
            return (
              <line
                key={`flow-${hover}-${a}-${b}`}
                x1={POS[f][0]}
                y1={POS[f][1]}
                x2={POS[t][0]}
                y2={POS[t][1]}
                pathLength={1}
                className="nv-flow stroke-[var(--flow)] dark:stroke-[var(--flow-night)]"
                strokeLinecap="round"
                style={
                  {
                    "--flow": hovered.hue.g1,
                    "--flow-night": hovered.hue.c300,
                    strokeWidth: 3.5,
                    filter: `drop-shadow(0 0 6px ${hovered.hue.c300})`,
                    animationDelay: `${(depth[f] * 0.45).toFixed(2)}s`,
                  } as CSSProperties
                }
              />
            );
          })}
      </svg>

      <div
        aria-hidden="true"
        className="absolute left-[520px] top-[440px] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="nv-pulse absolute inset-0 rounded-full transition-opacity duration-700"
          style={{
            opacity: "var(--hero-light-o)",
            background:
              "radial-gradient(circle, rgba(255,201,77,0.65) 0%, rgba(245,158,11,0.18) 40%, rgba(245,158,11,0) 70%)",
          }}
        />
        <div
          className="nv-pulse absolute -inset-[10%] rounded-full transition-opacity duration-700"
          style={{
            opacity: "var(--hero-dark-o)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(196,181,253,0.28) 36%, rgba(139,92,246,0) 70%)",
          }}
        />
        <div
          className="nv-splat absolute -inset-[45%] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--nova-flash) 0%, rgba(255,255,255,0) 60%)",
            animationDelay: `${FLASH_DELAY}s`,
          }}
        />
        <div className="nv-pop absolute inset-0" style={{ animationDelay: `${FLASH_DELAY}s` }}>
          <svg width="150" height="150" viewBox="-1.6 -1.6 3.2 3.2" className="absolute inset-0">
            <path
              d={NOVA_STAR_PATH}
              style={{ fill: "var(--nova-star)", transition: "fill 700ms ease" }}
            />
          </svg>
        </div>
      </div>

      {NODES.map(([slug, x, y]) => {
        const product = getProduct(slug)!;
        const on = hover === slug;
        return (
          <div
            key={slug}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: x, top: y }}
          >
            <div
              className="rounded-[13px] transition-[transform,box-shadow] duration-[280ms] ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                transform: `scale(${on ? 1.22 : 1})`,
                boxShadow: on
                  ? `0 0 0 2px ${product.hue.c300}, 0 0 30px ${product.hue.c300}`
                  : "var(--node-shadow)",
              }}
            >
              <AppIcon product={product} size={48} />
            </div>
            <span
              className="whitespace-nowrap font-mono text-[11px] tracking-[0.06em] transition-colors duration-[280ms]"
              style={{ color: on ? "var(--hero-fg)" : "var(--hero-muted-2)" }}
            >
              {product.name}
            </span>
            <button
              type="button"
              aria-label={`Open ${product.name}`}
              onClick={() => navigate({ to: "/$slug", params: { slug } })}
              onMouseEnter={() => setHover(slug)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(slug)}
              onBlur={() => setHover(null)}
              className="absolute -inset-2 cursor-pointer rounded-2xl bg-transparent"
            />
          </div>
        );
      })}
    </div>
  );
}

export function Hero() {
  const stars = useMemo(makeStars, []);
  const released = products.filter(isReleased).length;

  return (
    <section
      aria-label="Nova Suite introduction"
      className="relative -mt-[65px] flex min-h-[780px] items-center overflow-hidden text-[var(--hero-fg)] transition-colors duration-700"
    >
      {/* Light sky: warm paper with a dot grid. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: "var(--hero-light-o)",
          background:
            "radial-gradient(760px 540px at 76% 58%, rgba(255,214,140,0.32), rgba(255,214,140,0) 70%), #FAF8F3",
        }}
      >
        <div
          className="nv-par absolute inset-x-0 -bottom-[10%] -top-[10%]"
          style={
            {
              "--k": 0.12,
              backgroundImage: "radial-gradient(rgba(28,24,48,0.10) 1px, rgba(0,0,0,0) 1.2px)",
              backgroundSize: "26px 26px",
            } as CSSProperties
          }
        />
      </div>

      {/* Night sky: milky way, three star layers and shooting stars. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: "var(--hero-dark-o)",
          background:
            "radial-gradient(1200px 720px at 72% 30%, #2B1F50 0%, #120F1C 46%, #07060B 100%)",
        }}
      >
        <div
          className="nv-par absolute -inset-x-[20%] -inset-y-[12%]"
          style={{ "--k": 0.2 } as CSSProperties}
        >
          <div className="nv-drift absolute inset-0">
            <div
              className="absolute inset-x-0 top-[27%] h-[48%] -rotate-[17deg] blur-[26px]"
              style={{
                background:
                  "radial-gradient(ellipse 36% 50% at 30% 50%, rgba(196,181,253,0.40), rgba(196,181,253,0) 70%), radial-gradient(ellipse 30% 42% at 56% 52%, rgba(165,243,252,0.20), rgba(165,243,252,0) 70%), radial-gradient(ellipse 26% 40% at 80% 46%, rgba(244,114,182,0.16), rgba(244,114,182,0) 70%)",
              }}
            />
            <div
              className="absolute left-[12%] right-[6%] top-[47%] h-[9%] -rotate-[17deg] blur-[14px]"
              style={{
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(7,6,11,0.7), rgba(7,6,11,0) 70%)",
              }}
            />
          </div>
        </div>
        <StarLayer stars={stars.far} k={0.12} top="-6%" height="112%" />
        <StarLayer stars={stars.mid} k={0.28} top="-10%" height="120%" />
        <StarLayer stars={stars.near} k={0.5} top="-14%" height="128%" />
        <span className="nv-shoot" style={{ top: "16%", left: "78%" }} />
        <span className="nv-shoot" style={{ top: "30%", left: "52%", animationDelay: "5.5s" }} />
      </div>

      <Constellation />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[120px]"
        style={{ background: "linear-gradient(180deg, var(--hero-fade), var(--background))" }}
      />

      <div
        className="pointer-events-none relative z-[2] mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[26px] px-4 pb-[180px] pt-[160px] sm:px-6"
        style={{ opacity: "max(0, calc(1 - var(--nv-sy, 0) / 640))" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hero-eyebrow-line)] bg-[var(--hero-eyebrow-bg)] px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--hero-eyebrow)]">
          <svg aria-hidden="true" width="11" height="11" viewBox="-1 -1 2 2">
            <path fill="#F5B84A" d={NOVA_STAR_PATH} />
          </svg>
          Open source · Cross-platform
        </span>
        <h1 className="m-0 max-w-[11ch] font-display text-[clamp(48px,7.2vw,100px)] font-semibold leading-[0.96] tracking-[-0.04em]">
          Small tools. Rising stars.
        </h1>
        <p className="m-0 max-w-[560px] text-[19px] leading-relaxed text-[var(--hero-muted)]">
          Nova Suite is a family of open-source desktop apps for developers and everyday work. Each
          one does a single job well, and all of them feel like home.
        </p>
        <div className="pointer-events-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollToId("apps")}
            className="cursor-pointer rounded-xl bg-[var(--hero-btn-bg)] px-6 py-[15px] text-[15px] font-semibold text-[var(--hero-btn-ink)]"
          >
            Explore the apps
          </button>
          <a
            href={GITHUB_URL}
            className="rounded-xl border border-[var(--hero-ghost-line)] px-[22px] py-3.5 text-[15px] font-medium text-[var(--hero-fg)]"
          >
            Star on GitHub
          </a>
        </div>
        <div className="flex flex-wrap gap-7 pt-3 text-sm text-[var(--hero-muted-2)]">
          <span>
            <strong className="font-display text-[22px] text-[var(--hero-fg)]">
              {products.length}
            </strong>{" "}
            apps
          </span>
          <span>
            <strong className="font-display text-[22px] text-[var(--hero-fg)]">{released}</strong>{" "}
            ready to download
          </span>
          <span>
            <strong className="font-display text-[22px] text-[var(--hero-fg)]">100%</strong> open
            source
          </span>
        </div>
      </div>
    </section>
  );
}
