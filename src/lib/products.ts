import {
  Activity,
  BarChart3,
  Camera,
  Clipboard,
  Cloud,
  Command,
  Cpu,
  Database,
  FileText,
  Files,
  FolderSearch,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Globe,
  Hash,
  LayoutDashboard,
  Layers,
  Lock,
  Network,
  Package,
  PackageMinus,
  PenTool,
  Plug,
  RotateCcw,
  Route,
  ScanSearch,
  Search,
  Shield,
  Terminal,
  Upload,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const productSlugs = [
  "novapad",
  "lumia",
  "novafinder",
  "novagitx",
  "novaclipboard",
  "nmtr",
  "cirrus",
] as const;
export type ProductSlug = (typeof productSlugs)[number];

export type Platform = "mac" | "windows" | "linux" | "web";

export type Product = {
  slug: ProductSlug;
  name: string;
  tagline: { lead: string; accent?: string };
  description: string;
  blurb: string;
  icon: LucideIcon;
  accent: string;
  platforms: Platform[];
  downloads: { label: string; href: string | null; platform: Platform; arch?: "x64" | "arm64" }[];
  release?: {
    baseUrl: string;
    manifests: {
      mac: string;
      windows?: string;
    };
  };
  features: { icon: LucideIcon; title: string; body: string }[];
  stack: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "novapad",
    name: "NovaPad",
    tagline: { lead: "Words at the", accent: "speed of light." },
    description:
      "Professional text editing for the Mac ecosystem with full Windows compatibility. Fast, extensible, beautifully clear.",
    blurb: "The editor.",
    icon: FileText,
    accent: "#818cf8",
    platforms: ["mac", "windows"],
    release: {
      baseUrl: "https://pub-d2278ebfc6e74887b1c58c069c7119e7.r2.dev",
      manifests: {
        mac: "latest-mac.yml",
        windows: "latest.yml",
      },
    },
    downloads: [
      {
        label: "Download for Mac",
        href: null,
        platform: "mac",
      },
      { label: "Download for Windows", href: null, platform: "windows" },
    ],
    features: [
      {
        icon: ScanSearch,
        title: "Smarter file detection",
        body: "Google's Magika ML model identifies files by content, not extension. Even mislabeled .txt files get correct syntax highlighting instantly.",
      },
      {
        icon: Zap,
        title: "Instant launch",
        body: "Zero bloat. Optimized V8 engine with sub-millisecond interaction latency and silent background auto-updates.",
      },
      {
        icon: RotateCcw,
        title: "Snapshot & restore",
        body: "Unsaved buffers are persisted to disk and brought back exactly as you left them — even untitled scratch tabs survive a crash.",
      },
      {
        icon: PackageMinus,
        title: "Slimmer installer",
        body: "A massive cleanup dropped the Windows build from 254 MB to just 93 MB. Your bandwidth and SSD both said thanks.",
      },
    ],
    stack: [
      { label: "Editor engine", value: "Monaco" },
      { label: "UI framework", value: "React 18" },
      { label: "Language", value: "TypeScript" },
      { label: "Core shell", value: "Electron" },
    ],
  },
  {
    slug: "lumia",
    name: "Lumia",
    tagline: { lead: "Capture. Annotate.", accent: "Share anywhere." },
    description:
      "A blazing-fast screen capture tool with a built-in annotation editor, video recorder, and workflow engine for screenshots, recordings, and instant sharing.",
    blurb: "Capture & share.",
    icon: Camera,
    accent: "#fb7185",
    platforms: ["mac", "windows"],
    release: {
      baseUrl: "https://release.lumia.asia",
      manifests: {
        mac: "latest-mac.yml",
        windows: "latest.yml",
      },
    },
    downloads: [
      { label: "Download for Mac", href: null, platform: "mac" },
      { label: "Download for Windows", href: null, platform: "windows" },
    ],
    features: [
      {
        icon: Camera,
        title: "Smart capture",
        body: "Region select, fullscreen, active window, screen recording, and GIF capture — each with its own customizable global hotkey.",
      },
      {
        icon: PenTool,
        title: "Annotation editor",
        body: "Pen, rectangles, ellipses, arrows, text overlays, and blur. Mark up screenshots with full precision.",
      },
      {
        icon: Video,
        title: "Video annotator",
        body: "Scrub through recordings, annotate individual frames, extract frame PNGs, or export the fully annotated video.",
      },
      {
        icon: Upload,
        title: "Multi-destination upload",
        body: "Send to Imgur, custom HTTP endpoints, or save locally — all in parallel with independent failure handling.",
      },
    ],
    stack: [
      { label: "Runtime", value: "Electron 33" },
      { label: "UI framework", value: "React 18" },
      { label: "Annotation", value: "Konva.js" },
      { label: "Build", value: "electron-vite" },
    ],
  },
  {
    slug: "novafinder",
    name: "NovaFinder",
    tagline: { lead: "Find anything.", accent: "Instantly." },
    description:
      "A spotlight-grade launcher that searches files, apps, clipboard history, and your own scripts — across every drive you've ever plugged in.",
    blurb: "Spotlight, rethought.",
    icon: FolderSearch,
    accent: "#67e8f9",
    platforms: ["mac"],
    release: {
      baseUrl: "https://pub-de252b6499d04b519a15bbeb1b89f4ec.r2.dev",
      manifests: {
        mac: "latest-mac.yml",
      },
    },
    downloads: [{ label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" }],
    features: [
      {
        icon: Search,
        title: "Fuzzy everywhere",
        body: "Type three letters and NovaFinder ranks files, commands, browser tabs and clipboard entries together.",
      },
      {
        icon: Database,
        title: "Live index",
        body: "An incremental crawler keeps results within milliseconds of reality without ever pegging your CPU.",
      },
      {
        icon: Terminal,
        title: "Scriptable actions",
        body: "Drop a Bash, Python or TypeScript file into the actions folder and it becomes a first-class verb.",
      },
      {
        icon: Lock,
        title: "Privacy isolated",
        body: "All indexes live on-device. No outbound calls. Ever.",
      },
    ],
    stack: [
      { label: "Indexer", value: "Tantivy" },
      { label: "UI framework", value: "React 18" },
      { label: "Runtime", value: "Electron" },
      { label: "Language", value: "TypeScript" },
    ],
  },
  {
    slug: "novagitx",
    name: "NovaGitX",
    tagline: { lead: "Git, finally", accent: "graceful." },
    description:
      "A modern Git client that visualizes branches the way you think about them — and stays out of your way the rest of the time.",
    blurb: "Git, graceful.",
    icon: GitBranch,
    accent: "#a78bfa",
    platforms: ["mac"],
    release: {
      baseUrl: "https://pub-1841f7e00ed14c2da91ef9b585ba06e8.r2.dev",
      manifests: {
        mac: "latest-mac.yml",
      },
    },
    downloads: [
      { label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" },
      { label: "Download for Mac (Intel)", href: null, platform: "mac", arch: "x64" },
    ],
    features: [
      {
        icon: Network,
        title: "Spatial graph",
        body: "A force-directed commit graph that scales from a side project to a thousand-branch monorepo without going blurry.",
      },
      {
        icon: GitMerge,
        title: "Interactive rebase",
        body: "Drag commits to reorder, squash by clicking, edit messages inline. Aborts safely on conflict.",
      },
      {
        icon: Layers,
        title: "Hunk-level staging",
        body: "Stage individual lines with a click. Word-level diffs make code review obvious.",
      },
      {
        icon: GitPullRequest,
        title: "Hosted aware",
        body: "First-class GitHub, GitLab and Gitea integration: PRs, CI status and reviews live next to the graph.",
      },
    ],
    stack: [
      { label: "Engine", value: "libgit2" },
      { label: "UI framework", value: "React 18" },
      { label: "Runtime", value: "Electron" },
      { label: "Language", value: "TypeScript" },
    ],
  },
  {
    slug: "novaclipboard",
    name: "NovaClipboard",
    tagline: { lead: "Every copy,", accent: "one keystroke away." },
    description:
      "A native macOS menu-bar clipboard manager. Press a hotkey, pick from your recent copies, paste into the active app — no Dock icon, no servers, all data stays on your Mac.",
    blurb: "Clipboard, summonable.",
    icon: Clipboard,
    accent: "#34d399",
    platforms: ["mac"],
    downloads: [
      {
        label: "Get it on GitHub",
        href: "https://github.com/novapizza/NovaClipboard",
        platform: "mac",
      },
    ],
    features: [
      {
        icon: Command,
        title: "Global hotkey",
        body: "Summon the history panel anchored to your caret, mouse, or a fixed location with ⌘⇧V. It vanishes the moment you paste.",
      },
      {
        icon: Files,
        title: "Captures everything",
        body: "Text, rich text, links, images, and file references — plus screenshots written to disk are picked up automatically via FSEvents.",
      },
      {
        icon: Hash,
        title: "Quick-paste 1–9",
        body: "⌘1 through ⌘9 paste a pinned or recent item directly into the active app, no panel needed.",
      },
      {
        icon: Shield,
        title: "Private by design",
        body: "Blocklist for 1Password, LastPass, Bitwarden and any concealed-type pasteboard. Nothing leaves your Mac.",
      },
    ],
    stack: [
      { label: "Language", value: "Swift" },
      { label: "UI framework", value: "SwiftUI" },
      { label: "Storage", value: "SwiftData" },
      { label: "Build", value: "XcodeGen" },
    ],
  },
  {
    slug: "nmtr",
    name: "nmtr",
    tagline: { lead: "Network diagnostics,", accent: "reimagined live." },
    description:
      "A modern Windows app that fuses continuous traceroute with real-time ping into a single live dashboard — per-hop stats, offline geolocation, and full session recording.",
    blurb: "Live network.",
    icon: Activity,
    accent: "#fbbf24",
    platforms: ["windows"],
    downloads: [
      {
        label: "Releases on GitHub",
        href: "https://github.com/novapizza/nmtr/releases",
        platform: "windows",
      },
    ],
    features: [
      {
        icon: Cpu,
        title: "Parallel ICMP engine",
        body: "Direct calls into Iphlpapi.dll via FFI probe every TTL simultaneously, with kernel-measured RTT — no shelling out to traceroute.",
      },
      {
        icon: BarChart3,
        title: "Per-hop statistics",
        body: "Live loss %, packet counts, last/avg/best/worst latency, jitter, and a 60-point rolling sparkline for every hop in the route.",
      },
      {
        icon: Globe,
        title: "Offline geo map",
        body: "Bundled TopoJSON world map renders each geolocated hop entirely offline. Zero external network requests during a trace.",
      },
      {
        icon: Route,
        title: "Route change detection",
        body: "When a hop's IP shifts mid-session, nmtr marks it on the map and logs the event in a dedicated panel so you can correlate later.",
      },
    ],
    stack: [
      { label: "Shell", value: "Electron 41" },
      { label: "UI framework", value: "React 18" },
      { label: "State", value: "Zustand" },
      { label: "Probing", value: "koffi FFI" },
    ],
  },
  {
    slug: "cirrus",
    name: "Nova Cirrus",
    tagline: { lead: "Your files, in the", accent: "open sky." },
    description:
      "Self-hostable object storage with a delightful web UI, S3-compatible API, and end-to-end encrypted shares.",
    blurb: "Storage, your way.",
    icon: Cloud,
    accent: "#38bdf8",
    platforms: ["web", "linux"],
    downloads: [
      { label: "Open the dashboard", href: null, platform: "web" },
      { label: "Download the server", href: null, platform: "linux" },
    ],
    features: [
      {
        icon: Plug,
        title: "S3-compatible",
        body: "Point any S3 SDK at Cirrus and it just works — multipart uploads, presigned URLs, lifecycle rules and all.",
      },
      {
        icon: Lock,
        title: "E2E shares",
        body: "Generate a link that decrypts in the recipient's browser. The server only ever sees ciphertext.",
      },
      {
        icon: Package,
        title: "One-binary deploy",
        body: "Ship a single static binary to any Linux host. SQLite for metadata, filesystem for blobs. No Postgres required.",
      },
      {
        icon: LayoutDashboard,
        title: "Web dashboard",
        body: "Upload, preview, share and audit from a browser tab that feels like a desktop app.",
      },
    ],
    stack: [
      { label: "Server", value: "Go" },
      { label: "Web UI", value: "React 18" },
      { label: "Metadata", value: "SQLite" },
      { label: "Encryption", value: "age + AES-GCM" },
    ],
  },
];

export function isProductSlug(value: string): value is ProductSlug {
  return (productSlugs as readonly string[]).includes(value);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export async function fetchLatestReleaseManifest(
  product: Product,
  platform: "mac" | "windows",
  arch: "x64" | "arm64",
) {
  const release = product.release;
  if (!release) {
    return { version: null, href: null };
  }

  const manifestName = release.manifests[platform];
  if (!manifestName) {
    return { version: null, href: null };
  }

  const manifestUrl = joinUrl(release.baseUrl, manifestName);
  const response = await fetch(manifestUrl);
  if (!response.ok) {
    return { version: null, href: null };
  }

  const content = await response.text();
  const version = parseVersionFromYaml(content);
  const assetPath = parsePathFromYaml(content);
  if (!assetPath) {
    return { version, href: null };
  }

  const patchedPath = patchPathForArch(assetPath, arch);
  const href = assetPath.startsWith("http")
    ? patchedPath
    : joinUrl(release.baseUrl, patchedPath);
  return { version, href };
}

function parseVersionFromYaml(content: string): string | null {
  const versionMatch = content.match(/^\s*version\s*:\s*['"]?([^'"#\r\n]+?)['"]?\s*(?:#.*)?$/im);
  return versionMatch ? versionMatch[1].trim() : null;
}

function parsePathFromYaml(content: string): string | null {
  const pathMatch = content.match(/^\s*path\s*:\s*(.+)$/im);
  return pathMatch ? pathMatch[1].trim() : null;
}

function patchPathForArch(path: string, arch: "x64" | "arm64") {
  if (arch === "arm64" && /x64|x86_64|amd64/i.test(path)) {
    return path.replace(/x86_64|amd64|x64/gi, "arm64");
  }
  if (arch === "x64" && /arm64/i.test(path)) {
    return path.replace(/arm64/gi, "x64");
  }
  return path;
}

function joinUrl(baseUrl: string, assetPath: string) {
  return `${baseUrl.replace(/\/+$/u, "")}/${assetPath.replace(/^\/+/, "")}`;
}

export function getProductRoute(slug: ProductSlug): string {
  return slug === "novapad" ? "/" : `/${slug}`;
}
