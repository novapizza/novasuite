import { useId } from "react";
import { cn } from "@/lib/utils";

// Four-point star used by the Nova Suite mark, centred on (0,0) with radius 1.
export const NOVA_STAR_PATH =
  "M0,-1 C.1,-.29 .29,-.1 1,0 .29,.1 .1,.29 0,1 -.1,.29 -.29,.1 -1,0 -.29,-.1 -.1,-.29 0,-1 Z";

type Variant = "dark" | "light";

const palette: Record<
  Variant,
  {
    tile: [string, string, string?];
    glow: string;
    glowOpacity: number;
    rim: [string, string, number];
    horizon: string;
    trail: string;
    halo: string;
  }
> = {
  dark: {
    tile: ["#2C2246", "#16131F", "#0B0A10"],
    glow: "#8B5CF6",
    glowOpacity: 0.5,
    rim: ["#DDD6FE", "#7C3AED", 0.5],
    horizon: "#C4B5FD",
    trail: "#A78BFA",
    halo: "#A78BFA",
  },
  light: {
    tile: ["#FFFFFF", "#EDE5FF"],
    glow: "#C4B5FD",
    glowOpacity: 0.45,
    rim: ["#C4B5FD", "#7C3AED", 0.55],
    horizon: "#7C3AED",
    trail: "#8B5CF6",
    halo: "#FBBF24",
  },
};

function LogoMark({
  variant,
  size,
  className,
}: {
  variant: Variant;
  size: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const p = palette[variant];
  const [t0, t1, t2] = p.tile;
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="80 80 864 864"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor={t0} />
          <stop offset={t2 ? ".55" : "1"} stopColor={t1} />
          {t2 && <stop offset="1" stopColor={t2} />}
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".3" cy=".22" r=".85">
          <stop offset="0" stopColor={p.glow} stopOpacity={p.glowOpacity} />
          <stop offset=".65" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.rim[0]} stopOpacity={variant === "dark" ? 0.9 : 1} />
          <stop offset="1" stopColor={p.rim[1]} stopOpacity={p.rim[2]} />
        </linearGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7C3AED" stopOpacity="0" />
          <stop offset=".5" stopColor={p.horizon} />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="-1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC94D" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <rect x="100" y="100" width="824" height="824" rx="190" fill={`url(#${id}t)`} />
      <rect x="100" y="100" width="824" height="824" rx="190" fill={`url(#${id}g)`} />
      <rect
        x="104"
        y="104"
        width="816"
        height="816"
        rx="186"
        fill="none"
        stroke={`url(#${id}r)`}
        strokeWidth="12"
      />
      <path
        d="M190 690 Q512 560 834 690"
        fill="none"
        stroke={`url(#${id}h)`}
        strokeWidth="30"
        strokeLinecap="round"
      />
      <path
        d="M512 610 L512 520"
        stroke={p.trail}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="2 26"
        opacity=".8"
      />
      <circle cx="512" cy="410" r="120" fill={p.halo} opacity=".5" filter={`url(#${id}b)`} />
      <path
        transform="translate(512 410) scale(180)"
        fill={variant === "dark" ? "#FFFFFF" : `url(#${id}s)`}
        d={NOVA_STAR_PATH}
      />
    </svg>
  );
}

// Nova Suite mark ("Horizon", direction C). Both variants render; CSS picks one
// by theme so SSR output never depends on the client's theme.
export function NovaMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <LogoMark variant="light" size={size} className="dark:hidden" />
      <LogoMark variant="dark" size={size} className="hidden dark:block" />
    </span>
  );
}

export function NovaWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap font-display text-[17px] font-bold tracking-[0.2em]",
        className,
      )}
    >
      NOVA SUITE
    </span>
  );
}
