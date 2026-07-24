import {
  ArrowUpRight,
  Circle as CircleIcon,
  Clipboard,
  Droplet,
  FileText,
  Image as ImageIcon,
  Link2,
  Palette,
  Pen,
  Search,
  Square,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductMockup({ product }: { product: Product }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[2.5rem] opacity-80 blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${product.accent}55, transparent 70%)`,
        }}
      />
      <div className="ring-iris relative overflow-hidden rounded-2xl border border-white/60 bg-card/90 backdrop-blur dark:border-white/10">
        <WindowChrome title={product.name} accent={product.accent} />
        <div className="aspect-[16/10] w-full bg-[oklch(0.99_0.005_280)] dark:bg-[oklch(0.165_0.045_285)]">
          {product.slug === "novapad" && <NovaPadSurface />}
          {product.slug === "lumia" && <LumiaSurface accent={product.accent} />}
          {product.slug === "novafinder" && <NovaFinderSurface accent={product.accent} />}
          {product.slug === "novagitx" && <NovaGitXSurface accent={product.accent} />}
          {product.slug === "novaclipboard" && <NovaClipboardSurface accent={product.accent} />}
          {product.slug === "novakey" && <NovaKeySurface accent={product.accent} />}
          {product.slug === "nmtr" && <NmtrSurface accent={product.accent} />}
          {product.slug === "cirrus" && <CirrusSurface accent={product.accent} />}
        </div>
      </div>
    </div>
  );
}

function WindowChrome({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border/60 bg-chrome px-3 py-2 sm:px-4 sm:py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        <span className="font-display text-[11px] text-muted-foreground sm:text-xs">{title}</span>
      </div>
      <div className="w-8 sm:w-12" />
    </div>
  );
}

/* --- NovaPad: code editor --- */
function NovaPadSurface() {
  const lines = [
    {
      n: 1,
      t: (
        <>
          <span className="text-[#a78bfa]">#include</span>{" "}
          <span className="text-[#67e8f9]">&lt;iostream&gt;</span>
        </>
      ),
    },
    { n: 2, t: <>&nbsp;</> },
    {
      n: 3,
      t: (
        <>
          <span className="text-[#a78bfa]">int</span> <span className="text-[#818cf8]">main</span>(){" "}
          {"{"}
        </>
      ),
    },
    {
      n: 4,
      t: (
        <>
          <span className="pl-4 text-muted-foreground">
            {"// Initialize NovaPad cosmic engine"}
          </span>
        </>
      ),
    },
    {
      n: 5,
      t: (
        <>
          <span className="pl-4">
            std::<span className="text-[#818cf8]">cout</span> &lt;&lt;{" "}
            <span className="text-[#34d399]">"Hello, Cosmic Clarity!"</span> &lt;&lt; std::endl;
          </span>
        </>
      ),
    },
    {
      n: 6,
      t: (
        <>
          <span className="pl-4 text-[#a78bfa]">return</span> 0;
        </>
      ),
    },
    { n: 7, t: <>{"}"}</> },
  ];
  return (
    <div className="flex h-full font-mono text-[10px] leading-[1.65] sm:text-[11px]">
      <div className="hidden w-32 border-r border-border/50 bg-muted/40 p-2 sm:block md:w-44">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          Explorer
        </div>
        {["main.cpp", "styles.css", "config.json", "readme.md"].map((f, i) => (
          <div
            key={f}
            className={`rounded px-2 py-1 ${i === 0 ? "bg-[#818cf8]/15 text-[#4f46e5] dark:text-[#c4b5fd]" : "text-muted-foreground"}`}
          >
            {f}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex border-b border-border/50 bg-muted/30 text-[10px]">
          {["main.cpp", "styles.css", "config.json"].map((t, i) => (
            <div
              key={t}
              className={`border-r border-border/50 px-2 py-2 sm:px-3 ${i === 0 ? "bg-card text-foreground" : "text-muted-foreground"}`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="p-3">
          {lines.map((l) => (
            <div key={l.n} className="flex gap-4">
              <span className="w-4 text-right text-muted-foreground/60">{l.n}</span>
              <span>{l.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Lumia: capture & annotation editor --- */
function LumiaSurface({ accent }: { accent: string }) {
  const tools: { Icon: LucideIcon; active?: boolean }[] = [
    { Icon: Pen },
    { Icon: Square, active: true },
    { Icon: CircleIcon },
    { Icon: ArrowUpRight },
    { Icon: Type },
    { Icon: Droplet },
  ];
  const history = [
    { name: "Screenshot 2026-05-28", time: "just now", active: true },
    { name: "Recording — onboarding", time: "12m" },
    { name: "Screenshot 2026-05-27", time: "1d" },
    { name: "Region — settings bug", time: "2d" },
  ];
  return (
    <div className="flex h-full">
      <div className="hidden w-32 border-r border-border/50 bg-muted/40 p-2 text-[11px] sm:block md:w-44">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          History
        </div>
        {history.map((h) => (
          <div
            key={h.name}
            className={`mb-1 truncate rounded px-2 py-1.5 ${h.active ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            <div className="truncate font-medium">{h.name}</div>
            <div className="text-[10px] text-muted-foreground">{h.time}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        {/* Annotation toolbar */}
        <div className="flex items-center gap-1 border-b border-border/50 bg-muted/30 px-2 py-1.5 sm:px-3 sm:py-2">
          {tools.map((t, i) => (
            <button
              key={i}
              type="button"
              className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                t.active
                  ? "border-transparent text-white shadow-sm"
                  : "border-border/60 bg-card text-muted-foreground"
              }`}
              style={t.active ? { background: accent } : undefined}
              aria-label="annotation tool"
            >
              <t.Icon className="h-3 w-3" strokeWidth={2.25} />
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-border/60" />
          <span className="rounded-md bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            Region
          </span>
          <span className="ml-auto hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ⇧⌘4
          </span>
        </div>
        {/* Canvas with mock screenshot + annotations */}
        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] p-3 dark:from-[oklch(0.22_0.07_15)] dark:to-[oklch(0.2_0.07_350)] sm:p-4">
          {/* Faux screenshot frame */}
          <div className="relative h-full w-full overflow-hidden rounded-md border border-border/60 bg-card shadow-inner">
            <div className="flex items-center gap-1 border-b border-border/50 bg-muted/40 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[9px] text-muted-foreground">
                settings — preferences
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              <div className="col-span-1 space-y-1.5">
                <div className="h-2 w-3/4 rounded bg-muted" />
                <div className="h-2 w-1/2 rounded bg-muted/70" />
                <div className="h-2 w-2/3 rounded bg-muted/70" />
                <div className="h-2 w-1/2 rounded bg-muted/70" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <div className="h-2 w-1/3 rounded bg-muted" />
                <div className="h-8 rounded bg-muted/60" />
                <div className="h-2 w-1/4 rounded bg-muted" />
                <div className="h-12 rounded bg-muted/60" />
              </div>
            </div>
            {/* Annotation overlay */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              <rect
                x="55%"
                y="36%"
                width="38%"
                height="22%"
                fill="none"
                stroke={accent}
                strokeWidth="2"
                rx="3"
              />
              <line
                x1="20%"
                y1="80%"
                x2="55%"
                y2="48%"
                stroke={accent}
                strokeWidth="2"
                markerEnd="url(#lumia-arrow)"
              />
              <defs>
                <marker
                  id="lumia-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
                </marker>
              </defs>
            </svg>
            <span
              className="absolute left-[14%] top-[68%] rounded-md px-1.5 py-0.5 font-mono text-[10px] text-white shadow"
              style={{ background: accent }}
            >
              Note this
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- NovaFinder: launcher --- */
type FinderResult = { Icon: LucideIcon; name: string; path: string; k: string };

function NovaFinderSurface({ accent }: { accent: string }) {
  const results: FinderResult[] = [
    { Icon: FileText, name: "Q3-roadmap.md", path: "~/Documents/work", k: "Open" },
    { Icon: Palette, name: "brand-tokens.fig", path: "~/Design/system", k: "Reveal" },
    { Icon: Zap, name: "deploy:staging", path: "actions/deploy", k: "Run" },
    { Icon: Link2, name: "github.com/novapizza", path: "Recent tabs", k: "Open" },
    { Icon: Clipboard, name: "rgba(129,140,248,1)", path: "Clipboard", k: "Paste" },
  ];
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f4f1ff] to-[#e6f7ff] p-3 dark:from-[oklch(0.2_0.07_290)] dark:to-[oklch(0.2_0.07_220)] sm:p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border/50 px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          <input
            readOnly
            value="road"
            className="w-full bg-transparent font-mono text-sm outline-none"
          />
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </span>
        </div>
        <div className="max-h-72 overflow-hidden">
          {results.map((r, i) => (
            <div
              key={r.name}
              className={`flex items-center gap-3 px-3 py-2 text-[12px] sm:px-4 sm:py-2.5 ${i === 0 ? "bg-[#818cf8]/10" : ""}`}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background"
                style={{ color: accent }}
              >
                <r.Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-medium">{r.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">{r.path}</span>
              </div>
              <span className="ml-auto rounded-md border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {r.k}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- NovaGitX: commit graph --- */
function NovaGitXSurface({ accent }: { accent: string }) {
  const branches = [
    { c: "#818cf8", y: 28 },
    { c: "#67e8f9", y: 56 },
    { c: "#a78bfa", y: 84 },
  ];
  const commits = [
    { x: 30, y: 28, msg: "feat: snapshot restore on cold boot", branch: "main", hash: "a1b2c3d" },
    { x: 80, y: 28, msg: "fix: tab drag on Windows hi-dpi", branch: "main", hash: "4e5f6a7" },
    { x: 130, y: 56, msg: "wip: monaco upgrade", branch: "editor/upgrade", hash: "8b9c0d1" },
    { x: 180, y: 28, msg: "merge: editor/upgrade", branch: "main", hash: "e2f3a4b" },
    { x: 230, y: 84, msg: "exp: plugin sandbox v2", branch: "exp/sandbox", hash: "5c6d7e8" },
    { x: 280, y: 28, msg: "chore: bump deps", branch: "main", hash: "9f0a1b2" },
  ];
  return (
    <div className="flex h-full">
      <div className="hidden w-32 border-r border-border/50 bg-muted/40 p-2 text-[11px] sm:block md:w-44">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          Branches
        </div>
        {["main", "editor/upgrade", "exp/sandbox", "release/2.4"].map((b, i) => (
          <div
            key={b}
            className={`mb-1 flex items-center gap-2 rounded px-2 py-1.5 ${i === 0 ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: branches[i % branches.length].c }}
            />
            <span className="truncate font-mono">{b}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 sm:p-4">
        <svg viewBox="0 0 320 120" className="h-28 w-full sm:h-32">
          {branches.map((b, i) => (
            <line
              key={i}
              x1="20"
              x2="300"
              y1={b.y}
              y2={b.y}
              stroke={b.c}
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          ))}
          <path d="M 130 56 C 150 56 160 28 180 28" fill="none" stroke="#67e8f9" strokeWidth="2" />
          <path d="M 180 28 C 210 28 215 84 230 84" fill="none" stroke="#a78bfa" strokeWidth="2" />
          {commits.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="5" fill="white" stroke={accent} strokeWidth="2" />
          ))}
        </svg>
        <div className="mt-3 space-y-1.5 font-mono text-[10px] sm:text-[11px]">
          {commits
            .slice(-3)
            .reverse()
            .map((c) => (
              <div
                key={c.msg}
                className="flex items-center gap-3 rounded-md border border-border/50 bg-card px-2.5 py-1.5"
              >
                <span className="text-muted-foreground">{c.hash}</span>
                <span className="truncate">{c.msg}</span>
                <span className="ml-auto hidden rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                  {c.branch}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* --- NovaClipboard: menu-bar clipboard history --- */
type ClipItem = { Icon: LucideIcon; label: string; meta: string; preview?: "image" };

function NovaClipboardSurface({ accent }: { accent: string }) {
  const items: ClipItem[] = [
    { Icon: Type, label: "Ship it on Friday — we're ready.", meta: "Slack · 2s ago" },
    { Icon: Link2, label: "github.com/novapizza/NovaClipboard", meta: "Safari · 14s ago" },
    {
      Icon: ImageIcon,
      label: "Screenshot 2026-05-28 at 10.42",
      meta: "Screenshots · 1m",
      preview: "image",
    },
    { Icon: FileText, label: "~/Downloads/Q3-roadmap.pdf", meta: "Finder · 3m" },
    { Icon: Type, label: "rgba(52, 211, 153, 1)", meta: "Figma · 12m" },
  ];
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#ecfdf5] to-[#f0fdfa] p-3 dark:from-[oklch(0.2_0.07_165)] dark:to-[oklch(0.2_0.07_195)] sm:p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
        {/* Caret-anchor indicator */}
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2 sm:px-4">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            readOnly
            value=""
            placeholder="Search clipboard…"
            className="w-full bg-transparent font-mono text-[12px] outline-none placeholder:text-muted-foreground"
          />
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘⇧V
          </span>
        </div>
        <div className="max-h-72 overflow-hidden">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`flex items-center gap-3 px-3 py-2 text-[12px] sm:px-4 sm:py-2.5 ${
                i === 0 ? "bg-[#34d399]/10" : ""
              }`}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background"
                style={{ color: accent }}
              >
                <it.Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              {it.preview === "image" ? (
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div
                    className="h-7 w-10 shrink-0 rounded border border-border/60"
                    style={{
                      background: `linear-gradient(135deg, ${accent}55, #a5f3fc)`,
                    }}
                  />
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate font-medium">{it.label}</span>
                    <span className="truncate text-[10px] text-muted-foreground">{it.meta}</span>
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate font-medium">{it.label}</span>
                  <span className="truncate text-[10px] text-muted-foreground">{it.meta}</span>
                </div>
              )}
              {i < 9 && (
                <span
                  className={`ml-auto rounded-md px-1.5 py-0.5 font-mono text-[10px] ${
                    i === 0
                      ? "text-white"
                      : "border border-border/60 bg-background text-muted-foreground"
                  }`}
                  style={i === 0 ? { background: accent } : undefined}
                >
                  ⌘{i + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- NovaKey: Telex input demo --- */
function NovaKeySurface({ accent }: { accent: string }) {
  const rules: { keys: string; out: string }[] = [
    { keys: "aa", out: "â" },
    { keys: "ow", out: "ơ" },
    { keys: "aw", out: "ă" },
    { keys: "dd", out: "đ" },
    { keys: "as", out: "á" },
    { keys: "af", out: "à" },
  ];
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#fff1f2] to-[#fff7ed] p-3 dark:from-[oklch(0.2_0.07_15)] dark:to-[oklch(0.2_0.06_40)] sm:p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
        {/* Mode bar */}
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2.5 sm:px-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }}
          >
            V Tiếng Việt
          </span>
          <span className="rounded-md border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            Telex
          </span>
          <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌥Z
          </span>
        </div>

        {/* Text field: result with caret */}
        <div className="px-3 py-4 sm:px-4">
          <div className="rounded-xl border border-border/60 bg-background px-3 py-2.5">
            <span className="font-display text-lg tracking-tight sm:text-xl">Tiếng Việt</span>
            <span
              className="ml-0.5 inline-block h-4 w-px align-middle sm:h-5"
              style={{ background: accent }}
            />
          </div>
          {/* Transform line: telex keystrokes -> vietnamese */}
          <div className="mt-2.5 flex items-center gap-2 font-mono text-[11px] sm:text-[12px]">
            <span className="text-muted-foreground line-through decoration-border">Tieesng Vieejt</span>
            <span style={{ color: accent }}>→</span>
            <span className="font-medium">Tiếng Việt</span>
          </div>
        </div>

        {/* Rule keycaps */}
        <div className="border-t border-border/50 px-3 py-3 sm:px-4">
          <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            Telex keys
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {rules.map((r) => (
              <div
                key={r.keys}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-2 py-1.5 font-mono text-[11px]"
              >
                <span className="text-muted-foreground">{r.keys}</span>
                <span style={{ color: accent }}>→</span>
                <span className="font-semibold">{r.out}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- nmtr: live traceroute dashboard --- */
function NmtrSurface({ accent }: { accent: string }) {
  const hops = [
    {
      n: 1,
      ip: "192.168.1.1",
      host: "router.lan",
      avg: 0.8,
      loss: 0,
      spark: [4, 5, 4, 6, 5, 4, 5, 4, 5, 6, 5, 4],
    },
    {
      n: 2,
      ip: "10.0.0.1",
      host: "isp-gw-04",
      avg: 2.1,
      loss: 0,
      spark: [6, 7, 6, 8, 7, 7, 6, 8, 7, 6, 7, 8],
    },
    {
      n: 3,
      ip: "172.16.4.22",
      host: "ams-bb-01",
      avg: 11.4,
      loss: 1,
      spark: [9, 11, 10, 12, 11, 9, 12, 11, 10, 12, 11, 13],
    },
    {
      n: 4,
      ip: "1.1.1.1",
      host: "cloudflare.com",
      avg: 18.7,
      loss: 3,
      spark: [12, 14, 16, 13, 18, 15, 17, 16, 19, 14, 18, 16],
    },
  ];

  const sparkPath = (values: number[], w = 60, h = 14) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = Math.max(1, max - min);
    const step = w / (values.length - 1);
    return values
      .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - ((v - min) / range) * h}`)
      .join(" ");
  };

  return (
    <div className="flex h-full">
      <div className="hidden w-32 border-r border-border/50 bg-muted/40 p-2 text-[11px] sm:block md:w-44">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          Sessions
        </div>
        {[
          { name: "1.1.1.1 — live", active: true },
          { name: "github.com" },
          { name: "vpn.corp" },
          { name: "8.8.8.8" },
        ].map((s) => (
          <div
            key={s.name}
            className={`mb-1 flex items-center gap-2 rounded px-2 py-1.5 ${s.active ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${s.active ? "animate-pulse" : ""}`}
              style={{ background: s.active ? accent : "currentColor" }}
            />
            <span className="truncate font-mono">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        {/* Status bar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-3 py-1.5 text-[10px] sm:py-2">
          <span
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-white"
            style={{ background: accent }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/90" />
            LIVE
          </span>
          <span className="font-mono text-muted-foreground">cloudflare.com · 1.1.1.1</span>
          <span className="ml-auto hidden font-mono text-muted-foreground sm:inline">
            14 hops · 1.2k probes
          </span>
        </div>
        {/* Table */}
        <div className="flex-1 overflow-hidden p-2 sm:p-3">
          <div className="grid grid-cols-[16px_1fr_44px_28px_60px] items-center gap-2 px-2 pb-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">
            <span>#</span>
            <span>Host</span>
            <span className="text-right">Avg</span>
            <span className="text-right">Loss</span>
            <span className="text-right">Trend</span>
          </div>
          {hops.map((h) => (
            <div
              key={h.n}
              className="grid grid-cols-[16px_1fr_44px_28px_60px] items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[10px] sm:text-[11px]"
              style={{
                background:
                  h.loss > 0 ? `color-mix(in oklab, ${accent} 12%, transparent)` : "transparent",
              }}
            >
              <span className="text-muted-foreground">{h.n}</span>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate">{h.host}</span>
                <span className="truncate text-[9px] text-muted-foreground">{h.ip}</span>
              </div>
              <span className="text-right">{h.avg}ms</span>
              <span className="text-right" style={{ color: h.loss > 0 ? accent : undefined }}>
                {h.loss}%
              </span>
              <svg viewBox="0 0 60 14" className="h-3.5 w-full">
                <path d={sparkPath(h.spark)} fill="none" stroke={accent} strokeWidth="1.5" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Cirrus: storage dashboard --- */
function CirrusSurface({ accent }: { accent: string }) {
  const buckets = [
    { name: "marketing-assets", files: "1,284", size: "12.4 GB", pct: 62 },
    { name: "client-deliverables", files: "342", size: "4.8 GB", pct: 24 },
    { name: "backups-nightly", files: "61", size: "92.1 GB", pct: 88 },
  ];
  return (
    <div className="flex h-full">
      <div className="hidden w-32 border-r border-border/50 bg-muted/40 p-2 text-[11px] sm:block md:w-44">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          Cirrus
        </div>
        {["Overview", "Buckets", "Shares", "Access keys", "Audit log"].map((t, i) => (
          <div
            key={t}
            className={`mb-1 rounded px-2 py-1.5 ${i === 1 ? "bg-card shadow-sm" : "text-muted-foreground"}`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold">Buckets</div>
            <div className="truncate text-[11px] text-muted-foreground">
              3 buckets · 109.3 GB used of 250 GB
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium text-white"
            style={{ background: accent }}
          >
            + New bucket
          </button>
        </div>
        <div className="space-y-2">
          {buckets.map((b) => (
            <div key={b.name} className="rounded-xl border border-border/50 bg-card p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="truncate font-mono text-[11px] sm:text-[12px]">{b.name}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground sm:text-[11px]">
                  {b.files} files · {b.size}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${b.pct}%`, background: accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
