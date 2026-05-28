import type { Product } from "@/lib/products";

/**
 * Stylised, code-only product window mockups.
 * Each product gets a distinct illustrative surface so the page reads
 * as a real product without claiming to be a real screenshot.
 */
export function ProductMockup({ product }: { product: Product }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[2.5rem] opacity-80 blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${product.accent}55, transparent 70%)`,
        }}
      />
      <div className="ring-iris relative overflow-hidden rounded-2xl border border-white/60 bg-card/90 backdrop-blur">
        <WindowChrome title={product.name} accent={product.accent} />
        <div className="aspect-[16/10] w-full bg-[oklch(0.99_0.005_280)]">
          {product.slug === "novapad" && <NovaPadSurface />}
          {product.slug === "lumia" && <LumiaSurface accent={product.accent} />}
          {product.slug === "novafinder" && <NovaFinderSurface accent={product.accent} />}
          {product.slug === "novagitx" && <NovaGitXSurface accent={product.accent} />}
          {product.slug === "cirrus" && <CirrusSurface accent={product.accent} />}
        </div>
      </div>
    </div>
  );
}

function WindowChrome({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border/60 bg-chrome px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        <span className="font-display text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="w-12" />
    </div>
  );
}

/* --- NovaPad: code editor --- */
function NovaPadSurface() {
  const lines = [
    { n: 1, t: <><span className="text-[#a78bfa]">#include</span> <span className="text-[#67e8f9]">&lt;iostream&gt;</span></> },
    { n: 2, t: <>&nbsp;</> },
    { n: 3, t: <><span className="text-[#a78bfa]">int</span> <span className="text-[#818cf8]">main</span>() {"{"}</> },
    { n: 4, t: <><span className="pl-4 text-muted-foreground">{"// Initialize NovaPad cosmic engine"}</span></> },
    { n: 5, t: <><span className="pl-4">std::<span className="text-[#818cf8]">cout</span> &lt;&lt; <span className="text-[#34d399]">"Hello, Cosmic Clarity!"</span> &lt;&lt; std::endl;</span></> },
    { n: 6, t: <><span className="pl-4 text-[#a78bfa]">return</span> 0;</> },
    { n: 7, t: <>{"}"}</> },
  ];
  return (
    <div className="flex h-full font-mono text-[11px] leading-[1.65]">
      <div className="w-44 border-r border-border/50 bg-muted/40 p-2">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">Explorer</div>
        {["main.cpp", "styles.css", "config.json", "readme.md"].map((f, i) => (
          <div
            key={f}
            className={`rounded px-2 py-1 ${i === 0 ? "bg-[#818cf8]/15 text-[#4f46e5]" : "text-muted-foreground"}`}
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
              className={`border-r border-border/50 px-3 py-2 ${i === 0 ? "bg-card text-foreground" : "text-muted-foreground"}`}
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

/* --- Lumia: AI chat --- */
function LumiaSurface({ accent }: { accent: string }) {
  return (
    <div className="flex h-full">
      <div className="w-44 border-r border-border/50 bg-muted/40 p-2 text-[11px]">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">Threads</div>
        {["Design critique", "SQL → ORM", "Trip to Lisbon", "Standup notes"].map((t, i) => (
          <div key={t} className={`mb-1 truncate rounded px-2 py-1.5 ${i === 0 ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-4 text-[12px]">
        <div className="mb-3 flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">U</span>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted/60 px-3 py-2">
            Rewrite this paragraph so it sounds like a confident product launch.
          </div>
        </div>
        <div className="mb-3 flex items-start gap-2">
          <span
            className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ background: accent }}
          >
            L
          </span>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border/60 bg-card px-3 py-2">
            Here are three versions, ranked by confidence. Each keeps the original facts and trims the hedging — pick the one
            that fits your voice.
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[11px]">Ask Lumia anything…</span>
          <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘↵</span>
        </div>
      </div>
    </div>
  );
}

/* --- NovaFinder: launcher --- */
function NovaFinderSurface({ accent }: { accent: string }) {
  const results = [
    { icon: "📄", name: "Q3-roadmap.md", path: "~/Documents/work", k: "Open" },
    { icon: "🎨", name: "brand-tokens.fig", path: "~/Design/system", k: "Reveal" },
    { icon: "⚡", name: "deploy:staging", path: "actions/deploy", k: "Run" },
    { icon: "🔗", name: "github.com/novapizza", path: "Recent tabs", k: "Open" },
    { icon: "📋", name: "Last copied: rgba(129,140,248,1)", path: "Clipboard", k: "Paste" },
  ];
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f4f1ff] to-[#e6f7ff] p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          <input
            readOnly
            value="road"
            className="w-full bg-transparent font-mono text-sm outline-none"
          />
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</span>
        </div>
        <div className="max-h-72 overflow-hidden">
          {results.map((r, i) => (
            <div
              key={r.name}
              className={`flex items-center gap-3 px-4 py-2.5 text-[12px] ${i === 0 ? "bg-[#818cf8]/10" : ""}`}
            >
              <span className="text-base">{r.icon}</span>
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{r.name}</span>
                <span className="text-[10px] text-muted-foreground">{r.path}</span>
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
    { x: 30, y: 28, msg: "feat: snapshot restore on cold boot", branch: "main" },
    { x: 80, y: 28, msg: "fix: tab drag on Windows hi-dpi", branch: "main" },
    { x: 130, y: 56, msg: "wip: monaco upgrade", branch: "editor/upgrade" },
    { x: 180, y: 28, msg: "merge: editor/upgrade", branch: "main" },
    { x: 230, y: 84, msg: "exp: plugin sandbox v2", branch: "exp/sandbox" },
    { x: 280, y: 28, msg: "chore: bump deps", branch: "main" },
  ];
  return (
    <div className="flex h-full">
      <div className="w-44 border-r border-border/50 bg-muted/40 p-2 text-[11px]">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">Branches</div>
        {["main", "editor/upgrade", "exp/sandbox", "release/2.4"].map((b, i) => (
          <div key={b} className={`mb-1 flex items-center gap-2 rounded px-2 py-1.5 ${i === 0 ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: branches[i % branches.length].c }} />
            <span className="truncate font-mono">{b}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <svg viewBox="0 0 320 120" className="h-32 w-full">
          {branches.map((b, i) => (
            <line key={i} x1="20" x2="300" y1={b.y} y2={b.y} stroke={b.c} strokeOpacity="0.35" strokeWidth="2" />
          ))}
          <path d="M 130 56 C 150 56 160 28 180 28" fill="none" stroke="#67e8f9" strokeWidth="2" />
          <path d="M 180 28 C 210 28 215 84 230 84" fill="none" stroke="#a78bfa" strokeWidth="2" />
          {commits.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="5" fill="white" stroke={accent} strokeWidth="2" />
          ))}
        </svg>
        <div className="mt-3 space-y-1.5 font-mono text-[11px]">
          {commits.slice(-3).reverse().map((c) => (
            <div key={c.msg} className="flex items-center gap-3 rounded-md border border-border/50 bg-card px-2.5 py-1.5">
              <span className="text-muted-foreground">{Math.random().toString(16).slice(2, 9)}</span>
              <span className="truncate">{c.msg}</span>
              <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{c.branch}</span>
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
      <div className="w-44 border-r border-border/50 bg-muted/40 p-2 text-[11px]">
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-muted-foreground">Cirrus</div>
        {["Overview", "Buckets", "Shares", "Access keys", "Audit log"].map((t, i) => (
          <div key={t} className={`mb-1 rounded px-2 py-1.5 ${i === 1 ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-semibold">Buckets</div>
            <div className="text-[11px] text-muted-foreground">3 buckets · 109.3 GB used of 250 GB</div>
          </div>
          <button
            className="rounded-md px-2.5 py-1 text-[11px] font-medium text-white"
            style={{ background: accent }}
          >
            + New bucket
          </button>
        </div>
        <div className="space-y-2">
          {buckets.map((b) => (
            <div key={b.name} className="rounded-xl border border-border/50 bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[12px]">{b.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {b.files} files · {b.size}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
