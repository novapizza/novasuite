import { useEffect, useState, type CSSProperties } from "react";
import { AppIcon } from "@/components/brand/AppIcon";
import type { Platform, Product } from "@/lib/products";
import { cn } from "@/lib/utils";

// How long each capture shows before the gallery moves on by itself, and how
// long a capture the visitor picked stays before auto-advance resumes.
const AUTO_MS = 4000;
const PICKED_MS = 5000;

// Detail-page screenshots for the selected platform tab. Falls back to a framed
// placeholder when the platform has no captures, or a capture fails to load.
export function ScreenshotGallery({ product, platform }: { product: Product; platform: Platform }) {
  const shots = product.screenshots?.[platform] ?? [];
  const [idx, setIdx] = useState(0);
  // Bumped on every pick so picking the current capture again restarts its hold.
  const [pick, setPick] = useState({ n: 0, delay: AUTO_MS });
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  // Each platform starts on its first capture.
  useEffect(() => {
    setIdx(0);
    setPick({ n: 0, delay: AUTO_MS });
  }, [product.slug, platform]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (shots.length < 2 || hovered || reducedMotion) return;
    const timer = setTimeout(() => {
      setIdx((i) => (i + 1) % shots.length);
      setPick((p) => ({ ...p, delay: AUTO_MS }));
    }, pick.delay);
    return () => clearTimeout(timer);
  }, [idx, pick, hovered, reducedMotion, shots.length]);

  const choose = (i: number) => {
    setIdx(i);
    setPick((p) => ({ n: p.n + 1, delay: PICKED_MS }));
  };

  // Light theme sits the window on the muted surface, dark on near-black; both
  // keep the app's hue glow in the corner.
  const frameStyle = {
    "--shot-glow": `${product.hue.c300}55`,
    background:
      "radial-gradient(900px 420px at 28% 18%, var(--shot-glow), rgba(0,0,0,0) 62%), var(--shot-bg)",
  } as CSSProperties;
  const shot = shots[Math.min(idx, shots.length - 1)];
  const markFailed = (src: string) => setFailed((f) => (f[src] ? f : { ...f, [src]: true }));

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] border border-border [--shot-bg:var(--muted)] dark:[--shot-bg:#0F0D17]"
        style={frameStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Every capture stays mounted and stacked, so switching crossfades between
            them and the next one is already loaded. */}
        {shots.map((s) =>
          failed[s.src] ? null : (
            // Opens the full-resolution capture, where small UI text is readable.
            <a
              key={s.src}
              href={s.src}
              target="_blank"
              rel="noopener"
              aria-label={`Open full size: ${s.caption}`}
              aria-hidden={s !== shot}
              tabIndex={s === shot ? undefined : -1}
              className={cn(
                "absolute inset-0 flex cursor-zoom-in items-center justify-center p-3 transition-opacity duration-700 ease-in-out motion-reduce:transition-none sm:p-5",
                s === shot ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <img
                src={s.src}
                alt={s.alt}
                width={2880}
                height={1666}
                decoding="async"
                onError={() => markFailed(s.src)}
                // An image that failed before hydration never fires onError.
                ref={(el) => {
                  if (el?.complete && el.naturalWidth === 0) markFailed(s.src);
                }}
                className="max-h-full max-w-full rounded-[10px] object-contain drop-shadow-[0_18px_36px_rgba(28,24,48,0.25)] dark:drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
              />
            </a>
          ),
        )}
        {(!shot || failed[shot.src]) && (
          <PlaceholderWindow product={product} platform={platform} label={shot?.caption} />
        )}
      </div>

      {shots.length > 1 && (
        <div role="tablist" aria-label="Screenshots" className="flex flex-wrap gap-2">
          {shots.map((s, i) => {
            const on = s === shot;
            return (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => choose(i)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-medium",
                  on
                    ? "border-[var(--app-accent)] text-foreground dark:border-[var(--app-accent-night)]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s.caption}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PlaceholderWindow({
  product,
  platform,
  label,
}: {
  product: Product;
  platform: Platform;
  label?: string;
}) {
  // Windows and most Linux desktops put the window controls on the right.
  const rightControls = platform === "windows" || platform === "linux";
  return (
    <div className="flex h-[80%] w-[86%] flex-col sm:h-[74%] sm:w-[80%] overflow-hidden rounded-[14px] border border-black/10 bg-white/70 dark:border-white/12 dark:bg-white/[0.04]">
      {rightControls ? (
        <div className="flex items-center justify-end gap-4 border-b border-black/8 px-3.5 py-2.5 text-black/40 dark:border-white/8 dark:text-white/45">
          <span className="h-px w-2.5 bg-current" />
          <span className="h-2.5 w-2.5 border border-current" />
          <span className="relative h-2.5 w-2.5 before:absolute before:left-1/2 before:top-[-1px] before:h-3 before:w-px before:rotate-45 before:bg-current after:absolute after:left-1/2 after:top-[-1px] after:h-3 after:w-px after:-rotate-45 after:bg-current" />
        </div>
      ) : (
        <div className="flex gap-[7px] border-b border-black/8 px-3.5 py-3 dark:border-white/8">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
      )}
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[22%] flex-col gap-2.5 border-r border-black/8 px-3 py-4 dark:border-white/8">
          <span
            className="h-2 w-[70%] rounded opacity-70"
            style={{ background: product.hue.c300 }}
          />
          <span className="h-2 w-[85%] rounded bg-black/10 dark:bg-white/14" />
          <span className="h-2 w-[60%] rounded bg-black/10 dark:bg-white/14" />
          <span className="h-2 w-[75%] rounded bg-black/10 dark:bg-white/14" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
          <span className="scale-[0.6] sm:scale-100">
            <AppIcon product={product} size={96} />
          </span>
          <span className="hidden font-mono text-xs text-black/50 sm:inline dark:text-white/55">
            {label ? `${label} · screenshot coming soon` : "Screenshot coming soon"}
          </span>
        </div>
      </div>
    </div>
  );
}
