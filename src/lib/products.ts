export const productSlugs = [
  "novapad",
  "lumia",
  "novafinder",
  "novagitx",
  "novaclipboard",
  "novakey",
  "nmtr",
  "novaproxy",
  "cirrus",
] as const;
export type ProductSlug = (typeof productSlugs)[number];

export type Platform = "mac" | "windows" | "linux" | "web";
// Platforms with an installer to download, read from a release manifest.
export type DesktopPlatform = "mac" | "windows" | "linux";

export type ManifestFormat = "yaml" | "appcast" | "json";

export type ProductGroup = "dev" | "everyday";

// Glyph drawn behind the "N" in the app icon (see components/brand/AppIcon).
export type AppGlyph =
  | "braces"
  | "viewfinder"
  | "magnifier"
  | "branch"
  | "clipboard"
  | "diacritic"
  | "pulse"
  | "wire"
  | "cloud";

// Per-app hue from the Nova palette: icon tile, 300 (dark-theme accent),
// 500 (icon glow), 700 (light-theme accent) and the three stops of the "N" gradient.
export type AppHue = {
  tile: string;
  c300: string;
  c500: string;
  c700: string;
  g0: string;
  g1: string;
  g2: string;
};

// One app window capture on the detail page. Files live under
// public/screenshots/<slug>/<platform>/, captured at 2x (made by scripts/screenshots.mjs).
export type Screenshot = { src: string; alt: string; caption: string };

export type Product = {
  slug: ProductSlug;
  repo: string;
  name: string;
  group: ProductGroup;
  glyph: AppGlyph;
  hue: AppHue;
  badge?: string;
  // Used for <title> and meta tags.
  tagline: { lead: string; accent?: string };
  description: string;
  // Short line under the app name.
  blurb: string;
  // One sentence on the app card.
  short: string;
  // Paragraph on the detail page.
  long: string;
  uses: { title: string; body: string }[];
  platforms: Platform[];
  // Real captures per platform; a platform without any keeps the placeholder frame.
  screenshots?: Partial<Record<Platform, Screenshot[]>>;
  downloads: {
    label: string;
    href: string | null;
    platform: Platform;
    arch?: "x64" | "arm64";
    // Package type to pick from the manifest (".deb"), when a platform ships several.
    packageType?: string;
  }[];
  release?: {
    baseUrl: string;
    manifests: {
      mac?: string;
      windows?: string;
      linux?: string;
    };
    // Omit to infer from the manifest extension (.xml → appcast, .json → json,
    // anything else → yaml). Only set it when the extension lies.
    format?: ManifestFormat;
  };
};

const novapadScenes = [
  {
    file: "editor",
    caption: "Monaco editor",
    alt: "NovaPad editing a TypeScript file with syntax highlighting and the NovaPad theme",
  },
  {
    file: "json-records",
    caption: "Large JSON",
    alt: "NovaPad's record viewer browsing a 58 MB NDJSON file of 230,000 records",
  },
  {
    file: "csv",
    caption: "CSV preview",
    alt: "NovaPad showing a CSV file as a sortable, filterable table in Table Lens",
  },
  {
    file: "markdown",
    caption: "Markdown preview",
    alt: "NovaPad rendering a Markdown file with headings, a table and a quote",
  },
];

function novapadScreenshots(platform: "mac" | "windows"): Screenshot[] {
  const os = platform === "mac" ? "macOS" : "Windows";
  return novapadScenes.map((s) => ({
    src: `/screenshots/novapad/${platform}/${s.file}.webp`,
    caption: s.caption,
    alt: `${s.alt}, on ${os}`,
  }));
}

export const productGroups: { id: ProductGroup; title: string; description: string }[] = [
  { id: "dev", title: "Developer tools", description: "Edit, version, debug and trace." },
  { id: "everyday", title: "Everyday utilities", description: "Small helpers for daily work." },
];

export const platformLabels: Record<Platform, string> = {
  mac: "Mac",
  windows: "Windows",
  linux: "Linux",
  web: "Web",
};

export const products: Product[] = [
  {
    slug: "novapad",
    repo: "novapad",
    name: "NovaPad",
    group: "dev",
    glyph: "braces",
    hue: {
      tile: "#1E1525",
      c300: "#F0ABFC",
      c500: "#D946EF",
      c700: "#A21CAF",
      g0: "#FAE8FF",
      g1: "#E879F9",
      g2: "#C026D3",
    },
    tagline: { lead: "Words at the", accent: "speed of light." },
    description:
      "Professional text editing for the Mac ecosystem with full Windows and Linux compatibility. Fast, extensible, beautifully clear.",
    blurb: "The editor.",
    short: "A fast, modern text and code editor with live previews.",
    long: "NovaPad is a lightweight, fast and modern text editor for Mac, Windows and Linux. It runs on Monaco, the same editor core as VS Code, so you get highlighting for about 70 languages, IntelliSense, bracket colors and folding. It detects the language from the file and its content, and pretty-prints JSON, SQL and XML with one shortcut.",
    uses: [
      {
        title: "Edit with the Monaco engine",
        body: "The editor core behind VS Code: highlighting for about 70 languages, IntelliSense, bracket colors and folding.",
      },
      {
        title: "Let it detect the language",
        body: "It picks a language from the file extension, then refines it from the content on load, save and paste.",
      },
      {
        title: "Beautify JSON, SQL and XML",
        body: "One shortcut pretty-prints the selection or the whole document.",
      },
      {
        title: "Preview as you type",
        body: "Side panes preview JSON, SQL and Markdown next to the source.",
      },
    ],
    platforms: ["mac", "windows", "linux"],
    screenshots: {
      mac: novapadScreenshots("mac"),
      windows: novapadScreenshots("windows"),
      // No Linux captures yet; the Linux build looks the same as the Mac one.
      linux: novapadScreenshots("mac"),
    },
    release: {
      baseUrl: "https://pub-d2278ebfc6e74887b1c58c069c7119e7.r2.dev",
      manifests: {
        mac: "latest-mac.yml",
        windows: "latest.yml",
        linux: "latest-linux.yml",
      },
    },
    downloads: [
      { label: "Download for Mac", href: null, platform: "mac" },
      { label: "Download for Windows", href: null, platform: "windows" },
      {
        label: "Download for Linux (AppImage)",
        href: null,
        platform: "linux",
        arch: "x64",
        packageType: ".AppImage",
      },
      {
        label: "Download for Linux (.deb)",
        href: null,
        platform: "linux",
        arch: "x64",
        packageType: ".deb",
      },
      {
        label: "Download for Linux (.rpm)",
        href: null,
        platform: "linux",
        arch: "x64",
        packageType: ".rpm",
      },
    ],
  },
  {
    slug: "lumia",
    repo: "lumia",
    name: "Lumia",
    group: "everyday",
    glyph: "viewfinder",
    hue: {
      tile: "#071E24",
      c300: "#67E8F9",
      c500: "#06B6D4",
      c700: "#0E7490",
      g0: "#CFFAFE",
      g1: "#22D3EE",
      g2: "#0891B2",
    },
    tagline: { lead: "Capture. Annotate.", accent: "Share anywhere." },
    description:
      "A blazing-fast screen capture tool with a built-in annotation editor, video recorder, and workflow engine for screenshots, recordings, and instant sharing.",
    blurb: "Capture & share.",
    short: "Capture, record, annotate and share your screen.",
    long: "Lumia captures, records, annotates and shares your screen on Windows and Mac. Inspired by ShareX and rebuilt from scratch, it adds scrolling capture, video recording with live drawing, and a workflow engine that uploads to several places in parallel.",
    uses: [
      {
        title: "Capture any part of the screen",
        body: "Region, window, monitor or full screen. The screen freezes at the hotkey, so tooltips and menus stay in the shot.",
      },
      {
        title: "Capture whole pages",
        body: "Scrolling capture through a browser extension, or classic screen scroll for any app.",
      },
      {
        title: "Record video",
        body: "Record a region, window or screen with a floating toolbar and live drawing.",
      },
      {
        title: "Share in one step",
        body: "Upload to Cloudflare R2 or Google Drive and copy the link automatically.",
      },
    ],
    platforms: ["mac", "windows"],
    release: {
      baseUrl: "https://release.lumia.asia",
      manifests: {
        mac: "latest-mac.yml",
        windows: "latest.yml",
      },
    },
    downloads: [
      { label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" },
      { label: "Download for Mac (Intel)", href: null, platform: "mac", arch: "x64" },
      // Windows ships a single multi-arch installer (see latest.yml `path:`).
      { label: "Download for Windows", href: null, platform: "windows" },
    ],
  },
  {
    slug: "novafinder",
    repo: "NovaFinder",
    name: "NovaFinder",
    group: "everyday",
    glyph: "magnifier",
    badge: "Beta",
    hue: {
      tile: "#24101C",
      c300: "#F9A8D4",
      c500: "#EC4899",
      c700: "#BE185D",
      g0: "#FCE7F3",
      g1: "#F472B6",
      g2: "#DB2777",
    },
    tagline: { lead: "Find anything.", accent: "Instantly." },
    description:
      "A spotlight-grade launcher that searches files, apps, clipboard history, and your own scripts — across every drive you've ever plugged in.",
    blurb: "Spotlight, rethought.",
    short: "A file manager for the parts Finder gets wrong.",
    long: "NovaFinder is an open-source file manager for Mac, built because Finder leaves a lot on the table. It is a companion to Finder rather than a replacement, and focuses on what Finder does worst, starting with saved searches that actually stick around. It is currently in beta.",
    uses: [
      {
        title: "Keep your saved searches",
        body: "Smart Folders by kind, size, name or content, right in the sidebar.",
      },
      {
        title: "Work alongside Finder",
        body: "A companion to Finder, not a replacement, so your usual workflow stays put.",
      },
      { title: "Built in the open", body: "The full source is on GitHub." },
    ],
    platforms: ["mac"],
    release: {
      baseUrl: "https://pub-de252b6499d04b519a15bbeb1b89f4ec.r2.dev",
      manifests: {
        mac: "latest-mac.yml",
      },
    },
    downloads: [
      { label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" },
    ],
  },
  {
    slug: "novagitx",
    repo: "novagitx",
    name: "NovaGitX",
    group: "dev",
    glyph: "branch",
    hue: {
      tile: "#111A2C",
      c300: "#93C5FD",
      c500: "#3B82F6",
      c700: "#1D4ED8",
      g0: "#DBEAFE",
      g1: "#60A5FA",
      g2: "#2563EB",
    },
    tagline: { lead: "Git, finally", accent: "graceful." },
    description:
      "A modern Git client that visualizes branches the way you think about them — and stays out of your way the rest of the time.",
    blurb: "Git, graceful.",
    short: "A native-feeling Git client with a clear commit graph.",
    long: "NovaGitX is a Git GUI inspired by GitExtensions and redesigned for Mac. See your branches as a lane graph, stage single hunks and review diffs without leaving the app.",
    uses: [
      { title: "See the commit graph", body: "Branches drawn as lanes, in topological order." },
      { title: "Stage files and hunks", body: "Stage or unstage whole files or single hunks." },
      { title: "Review diffs", body: "A unified diff with line numbers and hunk-level staging." },
    ],
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
  },
  {
    slug: "novaclipboard",
    repo: "NovaClipboard",
    name: "NovaClipboard",
    group: "everyday",
    glyph: "clipboard",
    hue: {
      tile: "#221A08",
      c300: "#FCD34D",
      c500: "#F59E0B",
      c700: "#B45309",
      g0: "#FEF3C7",
      g1: "#FBBF24",
      g2: "#D97706",
    },
    tagline: { lead: "Every copy,", accent: "one keystroke away." },
    description:
      "A native Mac menu-bar clipboard manager. Press a hotkey, pick from your recent copies, paste into the active app — no Dock icon, no servers, all data stays on your Mac.",
    blurb: "Clipboard, summonable.",
    short: "Your recent copies, one hotkey away.",
    long: "NovaClipboard is a native Mac menu-bar clipboard manager. Press a hotkey, pick from your recent copies and paste into the active app. There is no Dock icon and no server, and all data stays on your Mac.",
    uses: [
      {
        title: "Summon it with a hotkey",
        body: "Press a hotkey and pick from your recent copies.",
      },
      { title: "Paste where you are", body: "Your pick goes straight into the active app." },
      { title: "Stay out of the way", body: "It lives in the menu bar, with no Dock icon." },
      { title: "Keep data on your Mac", body: "No servers. Everything stays local." },
    ],
    platforms: ["mac"],
    release: {
      baseUrl: "https://pub-4ab8b2cc0203430fbd129ff8f2b54b00.r2.dev",
      manifests: {
        mac: "appcast.xml",
      },
      format: "appcast",
    },
    downloads: [
      { label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" },
    ],
  },
  {
    slug: "novakey",
    repo: "novakey",
    name: "NovaKey",
    group: "everyday",
    glyph: "diacritic",
    hue: {
      tile: "#241509",
      c300: "#FDBA74",
      c500: "#F97316",
      c700: "#C2410C",
      g0: "#FFEDD5",
      g1: "#FB923C",
      g2: "#EA580C",
    },
    tagline: { lead: "Vietnamese input,", accent: "everywhere you type." },
    description:
      "A Vietnamese input method that uses the backspace technique instead of a composition window — so Telex works in browser URL bars, terminals, editors, and every other app. Fast, lightweight, and private.",
    blurb: "Type Vietnamese.",
    short: "Type Vietnamese anywhere, in a 228 KB app.",
    long: "NovaKey is a Vietnamese input method that uses the backspace technique. It is fast and tiny, about 228 KB, and works in browsers, terminals and every app.",
    uses: [
      {
        title: "Type Telex",
        body: "Full support for tones (s f r x j z) and modifiers (aa ee oo aw ow uw dd).",
      },
      { title: "Works in every app", body: "Browsers, terminals and native apps alike." },
      { title: "Stays tiny", body: "About 228 KB, fast and light." },
    ],
    platforms: ["mac", "windows"],
    release: {
      baseUrl: "https://pub-7caaa511a0944e589f8c9a3382975fbd.r2.dev",
      manifests: {
        mac: "latest/appcast.xml",
        windows: "latest/latest.json",
      },
    },
    downloads: [
      { label: "Download for Mac", href: null, platform: "mac" },
      { label: "Download for Windows", href: null, platform: "windows" },
    ],
  },
  {
    slug: "nmtr",
    repo: "nmtr",
    name: "nmtr",
    group: "dev",
    glyph: "pulse",
    hue: {
      tile: "#161F0A",
      c300: "#BEF264",
      c500: "#84CC16",
      c700: "#4D7C0F",
      g0: "#ECFCCB",
      g1: "#A3E635",
      g2: "#65A30D",
    },
    tagline: { lead: "Network diagnostics,", accent: "reimagined live." },
    description:
      "A modern app that fuses continuous traceroute with real-time ping into a single live dashboard — per-hop stats, offline geolocation, and full session recording. Available on Windows.",
    blurb: "Live network.",
    short: "Live traceroute and ping, hop by hop.",
    long: "nmtr is a network-diagnostics suite for Windows. At its core is a modern rewrite of WinMTR: continuous traceroute and real-time ping in a live dashboard, with per-hop statistics and geolocation.",
    uses: [
      {
        title: "Trace the route live",
        body: "Continuous traceroute and real-time ping, a modern take on WinMTR.",
      },
      {
        title: "Read every hop",
        body: "Loss, sent, received, last, average, best, worst and jitter for each hop.",
      },
      { title: "Watch the heartbeat", body: "A live chart of final-hop latency over the session." },
    ],
    platforms: ["windows"],
    release: {
      baseUrl: "https://pub-153a98778378495eb01f90435c7b392a.r2.dev",
      manifests: {
        windows: "latest.yml",
      },
    },
    downloads: [{ label: "Download for Windows", href: null, platform: "windows" }],
  },
  {
    slug: "novaproxy",
    repo: "novaproxy",
    name: "NovaProxy",
    group: "dev",
    glyph: "wire",
    hue: {
      tile: "#122019",
      c300: "#9BE3B4",
      c500: "#3EB56D",
      c700: "#237A46",
      g0: "#DCFCE7",
      g1: "#6EDB9A",
      g2: "#2E9A59",
    },
    tagline: { lead: "Every request,", accent: "in the open." },
    description:
      "An HTTPS debugging proxy that decodes what your apps and AI agents are really sending — live flows, MCP-aware inspection, rewrite rules, breakpoints, and scriptable interception.",
    blurb: "See the wire.",
    short: "Inspect HTTP and HTTPS traffic as it happens.",
    long: "NovaProxy is an open-source, cross-platform HTTP and HTTPS debugging proxy, an alternative to Proxyman. It runs a native Rust core inside a Tauri shell with a React interface.",
    uses: [
      {
        title: "Intercept HTTPS",
        body: "A native Rust core decrypts and shows HTTPS requests and responses.",
      },
      {
        title: "Switch the system proxy",
        body: "Point your machine at NovaProxy with one toggle.",
      },
      { title: "An open Proxyman alternative", body: "Free and open source, built on Tauri." },
    ],
    platforms: ["mac", "windows"],
    release: {
      baseUrl: "https://pub-4aa88a825303408b9dd0b955b27b5fc1.r2.dev",
      // One manifest covers both platforms — assets live under `platforms:` keys.
      manifests: {
        mac: "latest.yml",
        windows: "latest.yml",
      },
    },
    downloads: [
      { label: "Download for Mac (Apple Silicon)", href: null, platform: "mac", arch: "arm64" },
      { label: "Download for Windows", href: null, platform: "windows", arch: "x64" },
    ],
  },
  {
    slug: "cirrus",
    repo: "novacirrus",
    name: "Nova Cirrus",
    group: "everyday",
    glyph: "cloud",
    badge: "Soon",
    hue: {
      tile: "#14132B",
      c300: "#A5B4FC",
      c500: "#6366F1",
      c700: "#4338CA",
      g0: "#E0E7FF",
      g1: "#818CF8",
      g2: "#4F46E5",
    },
    tagline: { lead: "Your files, in the", accent: "open sky." },
    description:
      "Self-hostable object storage with a delightful web UI, S3-compatible API, and end-to-end encrypted shares.",
    blurb: "Storage, your way.",
    short: "Self-hostable object storage with a web dashboard.",
    long: "Nova Cirrus is self-hostable object storage with a web dashboard, an S3-compatible API and end-to-end encrypted shares. It ships as a single server binary for Linux. The first build is not out yet.",
    uses: [
      {
        title: "S3-compatible",
        body: "Point any S3 SDK at Cirrus: multipart uploads, presigned URLs and lifecycle rules included.",
      },
      {
        title: "End-to-end encrypted shares",
        body: "Share links decrypt in the recipient's browser, so the server only sees ciphertext.",
      },
      {
        title: "One-binary deploy",
        body: "A single static binary for any Linux host. SQLite for metadata, the filesystem for files.",
      },
      { title: "Web dashboard", body: "Upload, preview, share and audit from a browser tab." },
    ],
    platforms: ["web", "linux"],
    downloads: [
      { label: "Open the dashboard", href: null, platform: "web" },
      { label: "Download the server", href: null, platform: "linux" },
    ],
  },
];

// An app counts as released when it has a manifest to download from.
export function isReleased(product: Product): boolean {
  return Boolean(product.release);
}

export function isProductSlug(value: string): value is ProductSlug {
  return (productSlugs as readonly string[]).includes(value);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Manifests are shared across arch-specific download buttons — fetch each URL once.
const manifestTextCache = new Map<string, Promise<string | null>>();

function fetchManifestText(url: string): Promise<string | null> {
  let cached = manifestTextCache.get(url);
  if (!cached) {
    // R2 serves manifests without Cache-Control, so browsers would otherwise
    // keep an old version for hours after a release.
    cached = fetch(url, { cache: "no-cache" })
      .then((response) => (response.ok ? response.text() : null))
      .catch(() => null)
      .then((text) => {
        if (text === null) manifestTextCache.delete(url);
        return text;
      });
    manifestTextCache.set(url, cached);
  }
  return cached;
}

export async function fetchLatestReleaseManifest(
  product: Product,
  platform: DesktopPlatform,
  arch: "x64" | "arm64",
  packageType?: string,
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
  const content = await fetchManifestText(manifestUrl);
  if (content === null) {
    return { version: null, href: null };
  }

  const format = release.format ?? inferManifestFormat(manifestName);

  if (format === "appcast" || format === "json") {
    const { version, url } =
      format === "appcast" ? parseAppcast(content) : parseJsonManifest(content, platform, arch);
    if (!url) {
      return { version, href: null };
    }
    // Manifest-relative paths resolve against the manifest, not the release root.
    const href = url.startsWith("http") ? url : joinUrl(manifestUrl.replace(/\/[^/]*$/u, ""), url);
    return { version, href };
  }

  const version = parseVersionFromYaml(content);
  const assetPath =
    pickAssetFromFiles(parseFilesFromYaml(content), platform, arch, packageType) ??
    pickAssetFromFiles(
      parsePlatformBlocksFromYaml(content, platform),
      platform,
      arch,
      packageType,
    ) ??
    legacyPathAsset(content, arch);
  if (!assetPath) {
    return { version, href: null };
  }

  const href = assetPath.startsWith("http") ? assetPath : joinUrl(release.baseUrl, assetPath);
  return { version, href };
}

function parseFilesFromYaml(content: string): string[] {
  const urls: string[] = [];
  const fileUrlPattern = /^\s*-\s*url\s*:\s*['"]?([^'"\r\n]+?)['"]?\s*$/gim;
  let match;
  while ((match = fileUrlPattern.exec(content))) {
    const url = match[1].trim();
    if (!urls.includes(url)) urls.push(url);
  }
  return urls;
}

function archOfAsset(url: string): "arm64" | "x64" | null {
  if (/arm64|aarch64/i.test(url)) return "arm64";
  if (/x64|x86_64|amd64|intel/i.test(url)) return "x64";
  return null;
}

// Pick the best asset for a platform/arch: exact arch match first, then unmarked
// builds (electron-builder omits the arch suffix for x64/universal artifacts),
// preferring installer formats over update archives. A requested package type (".deb")
// only matches assets of that type.
function pickAssetFromFiles(
  urls: string[],
  platform: DesktopPlatform,
  arch: "x64" | "arm64",
  packageType?: string,
): string | null {
  if (packageType) {
    const ext = packageType.toLowerCase();
    urls = urls.filter((url) => url.toLowerCase().endsWith(ext));
  }
  if (urls.length === 0) return null;

  const extensions = installerExtensions[platform];
  const extensionRank = (url: string) => {
    const index = extensions.findIndex((ext) => url.toLowerCase().endsWith(ext));
    return index === -1 ? extensions.length : index;
  };
  const archRank = (url: string) => {
    const assetArch = archOfAsset(url);
    if (assetArch === arch) return 0;
    if (assetArch === null) return 1;
    return 2;
  };

  return [...urls].sort(
    (a, b) => archRank(a) - archRank(b) || extensionRank(a) - extensionRank(b),
  )[0];
}

// Manifests that group assets under platform keys (`darwin-aarch64:`, `windows-x86_64:`)
// instead of a flat `files:` list — collect every `url:` inside a matching block.
function parsePlatformBlocksFromYaml(content: string, platform: DesktopPlatform): string[] {
  const urls: string[] = [];
  let blockIndent = -1;
  for (const line of content.split(/\r?\n/)) {
    const keyMatch = line.match(/^(\s*)([A-Za-z0-9._-]+)\s*:\s*(.*?)\s*$/);
    if (!keyMatch) continue;
    const indent = keyMatch[1].length;
    const key = keyMatch[2];
    const value = keyMatch[3].replace(/\s+#.*$/u, "").trim();

    if (blockIndent !== -1 && indent <= blockIndent) blockIndent = -1;
    if (blockIndent === -1) {
      if (!value && keyMatchesPlatform(key, platform)) blockIndent = indent;
      continue;
    }
    if (key !== "url" || !value) continue;
    const url = value.replace(/^['"]|['"]$/gu, "").trim();
    if (url && !urls.includes(url)) urls.push(url);
  }
  return urls;
}

function legacyPathAsset(content: string, arch: "x64" | "arm64"): string | null {
  const assetPath = parsePathFromYaml(content);
  return assetPath ? patchPathForArch(assetPath, arch) : null;
}

function inferManifestFormat(manifestName: string): ManifestFormat {
  if (/\.xml$/i.test(manifestName)) return "appcast";
  if (/\.json$/i.test(manifestName)) return "json";
  return "yaml";
}

const installerExtensions: Record<DesktopPlatform, string[]> = {
  mac: [".dmg", ".pkg", ".zip"],
  windows: [".exe", ".msi", ".zip"],
  linux: [".appimage", ".deb", ".rpm", ".tar.gz"],
};

const platformAliases: Record<DesktopPlatform, string[]> = {
  mac: ["mac", "macos", "darwin", "osx"],
  windows: ["windows", "win", "win32", "win64"],
  linux: ["linux"],
};

// Matches "windows", "windows-x86_64", "darwin_aarch64" — the flat-key and
// Tauri-style `platforms` shapes both use the same convention.
function keyMatchesPlatform(key: string, platform: DesktopPlatform) {
  const normalized = key.toLowerCase();
  return platformAliases[platform].some(
    (alias) =>
      normalized === alias ||
      normalized.startsWith(`${alias}-`) ||
      normalized.startsWith(`${alias}_`),
  );
}

function collectUrls(value: unknown, out: string[]) {
  if (typeof value === "string") {
    if (value.trim()) out.push(value.trim());
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) collectUrls(entry, out);
    return;
  }
  if (value && typeof value === "object") {
    const url = (value as Record<string, unknown>).url;
    if (typeof url === "string" && url.trim()) out.push(url.trim());
  }
}

function parseJsonManifest(
  content: string,
  platform: DesktopPlatform,
  arch: "x64" | "arm64",
): { version: string | null; url: string | null } {
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    return { version: null, url: null };
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { version: null, url: null };
  }

  const root = data as Record<string, unknown>;
  const rawVersion = typeof root.version === "string" ? root.version.trim() : "";
  const version = rawVersion ? rawVersion.replace(/^v/i, "") : null;

  const candidates: string[] = [];
  for (const [key, value] of Object.entries(root)) {
    if (keyMatchesPlatform(key, platform)) collectUrls(value, candidates);
  }
  const nested = root.platforms;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    for (const [key, value] of Object.entries(nested as Record<string, unknown>)) {
      if (keyMatchesPlatform(key, platform)) collectUrls(value, candidates);
    }
  }
  if (candidates.length === 0) collectUrls(root.url, candidates);

  return { version, url: pickAssetFromFiles(candidates, platform, arch) };
}

function parseAppcast(content: string): { version: string | null; url: string | null } {
  const versionMatch = content.match(
    /<sparkle:shortVersionString>([^<]+)<\/sparkle:shortVersionString>/i,
  );
  const enclosureMatch = content.match(/<enclosure[^>]*\burl\s*=\s*["']([^"']+)["'][^>]*\/?>/i);
  return {
    version: versionMatch ? versionMatch[1].trim() : null,
    url: enclosureMatch ? enclosureMatch[1].trim() : null,
  };
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
  return `/${slug}`;
}
