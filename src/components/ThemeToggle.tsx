import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore quota or disabled-storage errors
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-current/15 text-current transition-colors hover:bg-pill-hover",
        className,
      )}
    >
      {/* Render nothing until mounted — pre-hydration the inline theme script may already have set .dark, so we read from the DOM to avoid an icon flicker. */}
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.6} />
      ) : theme === "light" ? (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      ) : null}
    </button>
  );
}
