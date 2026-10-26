import { useId } from "react";
import type { AppGlyph, Product } from "@/lib/products";
import { NOVA_STAR_PATH } from "./NovaLogo";

// Shared tile colour for every app icon (canvas board 04).
const TILE = "#13111A";

function Glyph({ glyph, c }: { glyph: AppGlyph; c: string }) {
  switch (glyph) {
    case "braces":
      return (
        <g
          transform="translate(512 512) scale(1.12) translate(-512 -512)"
          fill="none"
          stroke={c}
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".8"
        >
          <path d="M 342 322 Q 296 322 296 380 L 296 486 Q 296 512 270 512 Q 296 512 296 538 L 296 644 Q 296 702 342 702" />
          <path d="M 682 322 Q 728 322 728 380 L 728 486 Q 728 512 754 512 Q 728 512 728 538 L 728 644 Q 728 702 682 702" />
        </g>
      );
    case "viewfinder":
      return (
        <g
          fill="none"
          stroke={c}
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        >
          <path d="M250 340 V250 H340" />
          <path d="M750 250 H774 V340" />
          <path d="M250 684 V774 H340" />
          <path d="M684 774 H774 V684" />
        </g>
      );
    case "magnifier":
      return (
        <g fill="none" stroke={c} strokeWidth="30" strokeLinecap="round" opacity=".85">
          <circle cx="764" cy="694" r="52" />
          <path d="M802 732 L846 776" />
        </g>
      );
    case "branch":
      return (
        <g fill="none" stroke={c} strokeLinecap="round" opacity=".85">
          <path d="M268 742 C 320 700, 360 650, 380 590" strokeWidth="30" />
          <circle cx="244" cy="764" r="36" strokeWidth="24" />
          <path d="M644 470 C 700 490, 744 540, 762 600" strokeWidth="30" />
          <circle cx="776" cy="634" r="36" strokeWidth="24" />
        </g>
      );
    case "clipboard":
      return (
        <g
          fill="none"
          stroke={c}
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        >
          <path d="M296 410 V764 Q296 808 340 808 H684 Q728 808 728 764 V410" />
          <rect x="452" y="200" width="120" height="50" rx="25" />
        </g>
      );
    case "diacritic":
      return (
        <g opacity=".9">
          <path
            d="M362 232 L418 186 L474 232"
            fill="none"
            stroke={c}
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="512" cy="820" r="26" fill={c} />
        </g>
      );
    case "pulse":
      return (
        <path
          d="M200 822 H384 L424 772 L474 872 L524 792 L558 822 H824"
          fill="none"
          stroke={c}
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        />
      );
    case "wire":
      return (
        <g
          transform="translate(512 515) scale(.88) translate(-512 -515)"
          fill="none"
          stroke={c}
          strokeLinecap="round"
          opacity=".85"
        >
          <path d="M188 515L340 515" strokeWidth="34" />
          <path d="M684 515L836 515" strokeWidth="34" />
          <circle cx="150" cy="515" r="38" strokeWidth="26" />
          <circle cx="874" cy="515" r="38" strokeWidth="26" />
        </g>
      );
    case "cloud":
      return (
        <path
          d="M300 820 H730 C790 820 820 780 820 735 C820 690 785 655 740 655 C735 590 680 545 615 550 C585 500 530 470 470 480 C400 490 355 545 352 610 C290 610 240 655 240 715 C240 775 270 820 300 820 Z"
          fill="none"
          stroke={c}
          strokeWidth="28"
          strokeLinejoin="round"
          opacity=".75"
        />
      );
  }
}

// App icon from the Nova family (canvas board 04): dark tile with a glow in
// the app's hue, its glyph, and the gradient "N" with a glowing star.
export function AppIcon({
  product,
  size = 52,
  title,
}: {
  product: Pick<Product, "slug" | "name" | "glyph" | "hue">;
  size?: number;
  // Pass a title only when the icon stands alone; next to the app name it is decorative.
  title?: string;
}) {
  const id = `nv-${product.slug}-${useId().replace(/:/g, "")}`;
  const h = product.hue;
  // NovaPad's star sits a touch lower and smaller to clear the brace.
  const star =
    product.glyph === "braces"
      ? { x: 664, y: 258, r: 52, s: 54 }
      : { x: 668, y: 262, r: 56, s: 58 };
  return (
    <svg
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      width={size}
      height={size}
      viewBox="80 80 864 864"
      className="block shrink-0"
    >
      <defs>
        <linearGradient
          id={`${id}n`}
          gradientUnits="userSpaceOnUse"
          x1="380"
          y1="290"
          x2="650"
          y2="740"
        >
          <stop offset="0" stopColor={h.g0} />
          <stop offset=".5" stopColor={h.g1} />
          <stop offset="1" stopColor={h.g2} />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <rect x="100" y="100" width="824" height="824" rx="190" />
        </clipPath>
        <filter id={`${id}g`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect x="100" y="100" width="824" height="824" rx="190" fill={TILE} />
      <g clipPath={`url(#${id}c)`}>
        <circle cx="330" cy="280" r="300" fill={h.c500} opacity=".45" filter={`url(#${id}g)`} />
      </g>
      <rect
        x="100"
        y="100"
        width="824"
        height="824"
        rx="190"
        fill="none"
        stroke={h.c300}
        strokeOpacity=".55"
        strokeWidth="10"
      />
      <Glyph glyph={product.glyph} c={h.c300} />
      <path
        d="M418 700L418 330L606 700L606 330"
        fill="none"
        stroke={`url(#${id}n)`}
        strokeWidth="80"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={star.x}
        cy={star.y}
        r={star.r}
        fill={h.c300}
        opacity=".5"
        filter={`url(#${id}b)`}
      />
      <path
        transform={`translate(${star.x} ${star.y}) scale(${star.s})`}
        fill="#FFFFFF"
        d={NOVA_STAR_PATH}
      />
    </svg>
  );
}
