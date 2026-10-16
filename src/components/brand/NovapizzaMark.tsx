import { useId } from "react";

const STAR = "M0,-1 L.15,-.15 L1,0 L.15,.15 L0,1 L-.15,.15 L-1,0 L-.15,-.15 Z";

// The novapizza eight-point star (brand/novapizza/svg/novapizza-icon.svg).
export function NovapizzaMark({ size = 24, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="-1.05 -1.05 2.1 2.1"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}r`} x1="0" y1="-1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC94D" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id={`${id}c`} cx="0" cy="0" r=".3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFBEA" />
          <stop offset="1" stopColor="#FFE7A3" />
        </radialGradient>
      </defs>
      <path transform="rotate(45) scale(.62)" fill={`url(#${id}r)`} d={STAR} />
      <path fill={`url(#${id}r)`} d={STAR} />
      <circle r=".25" fill={`url(#${id}c)`} />
    </svg>
  );
}
