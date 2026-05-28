import { FileText, Flame, FolderSearch, GitBranch, Cloud, type LucideIcon } from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  blurb: string;
  icon: LucideIcon;
  accent: string; // CSS color
  platforms: ("mac" | "windows" | "linux" | "web")[];
  downloads: { label: string; href: string; platform: "mac" | "windows" | "linux" | "web" }[];
  features: { title: string; body: string }[];
  stack: { label: string; value: string }[];
  route: "/" | "/lumia" | "/novafinder" | "/novagitx" | "/cirrus";
};

export const products: Product[] = [
  {
    slug: "novapad",
    name: "NovaPad",
    tagline: "Words at the|speed of light.",
    description:
      "Professional text editing for the Mac ecosystem with full Windows compatibility. Fast, extensible, beautifully clear.",
    blurb: "The editor.",
    icon: FileText,
    accent: "#818cf8",
    platforms: ["mac", "windows"],
    downloads: [
      {
        label: "Download for Mac",
        href: "https://pub-d2278ebfc6e74887b1c58c069c7119e7.r2.dev/NovaPad-arm64.dmg",
        platform: "mac",
      },
      { label: "Download for Windows", href: "#", platform: "windows" },
    ],
    features: [
      {
        title: "Smarter file detection",
        body: "Google's Magika ML model identifies files by content, not extension. Even mislabeled .txt files get correct syntax highlighting instantly.",
      },
      {
        title: "Instant launch",
        body: "Zero bloat. Optimized V8 engine with sub-millisecond interaction latency and silent background auto-updates.",
      },
      {
        title: "Snapshot & restore",
        body: "Unsaved buffers are persisted to disk and brought back exactly as you left them — even untitled scratch tabs survive a crash.",
      },
      {
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
    route: "/",
  },
  {
    slug: "lumia",
    name: "Lumia",
    tagline: "Light up your|workflow.",
    description:
      "A native chat surface for every model that matters — local or hosted. Streamed, searchable, yours.",
    blurb: "AI, native.",
    icon: Flame,
    accent: "#fb7185",
    platforms: ["mac", "windows"],
    downloads: [
      { label: "Download for Mac", href: "#", platform: "mac" },
      { label: "Download for Windows", href: "#", platform: "windows" },
    ],
    features: [
      {
        title: "Bring your own model",
        body: "Wire up OpenAI, Anthropic, Mistral, Ollama and llama.cpp side-by-side. Switch mid-conversation without losing context.",
      },
      {
        title: "Local-first history",
        body: "Every thread is stored on-device, fully searchable, and exportable to Markdown. No cloud lock-in.",
      },
      {
        title: "Composable prompts",
        body: "Save prompt fragments as reusable blocks and stitch them together with a single keystroke.",
      },
      {
        title: "Quiet by design",
        body: "Tucks into your menu bar. Global hotkey calls it forward in under 30 ms.",
      },
    ],
    stack: [
      { label: "Runtime", value: "Tauri 2" },
      { label: "UI framework", value: "React 18" },
      { label: "Inference", value: "llama.cpp" },
      { label: "Storage", value: "SQLite" },
    ],
    route: "/lumia",
  },
  {
    slug: "novafinder",
    name: "NovaFinder",
    tagline: "Find anything.|Instantly.",
    description:
      "A spotlight-grade launcher that searches files, apps, clipboard history, and your own scripts — across every drive you've ever plugged in.",
    blurb: "Spotlight, rethought.",
    icon: FolderSearch,
    accent: "#67e8f9",
    platforms: ["mac", "windows", "linux"],
    downloads: [
      { label: "Download for Mac", href: "#", platform: "mac" },
      { label: "Download for Windows", href: "#", platform: "windows" },
      { label: "Download for Linux", href: "#", platform: "linux" },
    ],
    features: [
      {
        title: "Fuzzy everywhere",
        body: "Type three letters and NovaFinder ranks files, commands, browser tabs and clipboard entries together.",
      },
      {
        title: "Live index",
        body: "An incremental crawler keeps results within milliseconds of reality without ever pegging your CPU.",
      },
      {
        title: "Scriptable actions",
        body: "Drop a Bash, Python or TypeScript file into the actions folder and it becomes a first-class verb.",
      },
      {
        title: "Privacy isolated",
        body: "All indexes live on-device. No telemetry. No outbound calls. Ever.",
      },
    ],
    stack: [
      { label: "Indexer", value: "Tantivy" },
      { label: "UI framework", value: "React 18" },
      { label: "Runtime", value: "Tauri 2" },
      { label: "Language", value: "Rust + TypeScript" },
    ],
    route: "/novafinder",
  },
  {
    slug: "novagitx",
    name: "NovaGitX",
    tagline: "Git, finally|graceful.",
    description:
      "A modern Git client that visualizes branches the way you think about them — and stays out of your way the rest of the time.",
    blurb: "Git, graceful.",
    icon: GitBranch,
    accent: "#a78bfa",
    platforms: ["mac", "windows", "linux"],
    downloads: [
      { label: "Download for Mac", href: "#", platform: "mac" },
      { label: "Download for Windows", href: "#", platform: "windows" },
      { label: "Download for Linux", href: "#", platform: "linux" },
    ],
    features: [
      {
        title: "Spatial graph",
        body: "A force-directed commit graph that scales from a side project to a thousand-branch monorepo without going blurry.",
      },
      {
        title: "Interactive rebase",
        body: "Drag commits to reorder, squash by clicking, edit messages inline. Aborts safely on conflict.",
      },
      {
        title: "Hunk-level staging",
        body: "Stage individual lines with a click. Word-level diffs make code review obvious.",
      },
      {
        title: "Hosted aware",
        body: "First-class GitHub, GitLab and Gitea integration: PRs, CI status and reviews live next to the graph.",
      },
    ],
    stack: [
      { label: "Engine", value: "libgit2" },
      { label: "UI framework", value: "React 18" },
      { label: "Runtime", value: "Tauri 2" },
      { label: "Language", value: "Rust + TypeScript" },
    ],
    route: "/novagitx",
  },
  {
    slug: "cirrus",
    name: "Nova Cirrus",
    tagline: "Your files, in the|open sky.",
    description:
      "Self-hostable object storage with a delightful web UI, S3-compatible API, and end-to-end encrypted shares.",
    blurb: "Storage, your way.",
    icon: Cloud,
    accent: "#38bdf8",
    platforms: ["web", "linux"],
    downloads: [
      { label: "Open the dashboard", href: "#", platform: "web" },
      { label: "Download the server", href: "#", platform: "linux" },
    ],
    features: [
      {
        title: "S3-compatible",
        body: "Point any S3 SDK at Cirrus and it just works — multipart uploads, presigned URLs, lifecycle rules and all.",
      },
      {
        title: "E2E shares",
        body: "Generate a link that decrypts in the recipient's browser. The server only ever sees ciphertext.",
      },
      {
        title: "One-binary deploy",
        body: "Ship a single static binary to any Linux host. SQLite for metadata, filesystem for blobs. No Postgres required.",
      },
      {
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
    route: "/cirrus",
  },
];

export const getProduct = (slug: Product["slug"]) =>
  products.find((p) => p.slug === slug)!;
