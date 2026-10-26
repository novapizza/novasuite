import type { Platform } from "@/lib/products";

// Platform marks used on app cards and the detail page tabs.
export function PlatformIcon({ platform, size = 18 }: { platform: Platform; size?: number }) {
  const common = { "aria-hidden": true, width: size, height: size, viewBox: "0 0 24 24" } as const;
  switch (platform) {
    case "mac":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6 0 0-2.5-1-2.5-3.8zM14.2 5.8c.6-.8 1.1-1.8 1-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.3z" />
        </svg>
      );
    case "windows":
      return (
        <svg {...common} fill="currentColor">
          <path d="M3 5.6l7.2-1v7.1H3zM11.2 4.4L21 3v8.7h-9.8zM3 12.4h7.2v7.1L3 18.4zM11.2 12.4H21V21l-9.8-1.4z" />
        </svg>
      );
    case "linux":
      return (
        <svg {...common} fill="currentColor" fillRule="evenodd">
          <path d="M12 2c-2.2 0-3.5 1.9-3.5 4.3 0 1.4-.4 2.4-1.2 3.6C6 11.6 5 13.4 5 15.6c0 .9.2 1.7.5 2.4-.8.4-1.5 1-1.5 1.8 0 1.2 1.8 1.6 3.6 2 1 .2 1.8.2 2.4-.4h4c.6.6 1.4.6 2.4.4 1.8-.4 3.6-.8 3.6-2 0-.8-.7-1.4-1.5-1.8.3-.7.5-1.5.5-2.4 0-2.2-1-4-2.3-5.7-.8-1.2-1.2-2.2-1.2-3.6C15.5 3.9 14.2 2 12 2zM12 11.5c-1.8 0-2.9 1.8-2.9 4s1.1 4 2.9 4 2.9-1.8 2.9-4-1.1-4-2.9-4z" />
        </svg>
      );
    case "web":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
      );
  }
}
