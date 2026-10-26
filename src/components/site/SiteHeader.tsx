import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import type { MouseEvent } from "react";
import { NovaMark, NovaWordmark } from "@/components/brand/NovaLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { scrollToId, useScrollVar } from "@/hooks/use-scroll-var";
import { cn } from "@/lib/utils";

export const GITHUB_URL = "https://github.com/novapizza";
export const CODING4PIZZA_URL = "https://coding4pizza.com/";

// Past this point the home hero is out of view and the header turns solid.
const HERO_SCROLL = 620;

const linkClass =
  "rounded-[10px] px-3.5 py-2.5 text-sm font-medium opacity-85 transition-opacity hover:opacity-100";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const scrolled = useScrollVar(HERO_SCROLL);
  const overHero = isHome && !scrolled;

  const goApps = (event: MouseEvent) => {
    if (!isHome) return;
    event.preventDefault();
    scrollToId("apps");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b backdrop-blur-[14px] transition-colors duration-300",
        overHero
          ? "border-transparent bg-transparent text-[var(--hero-fg)]"
          : "border-border bg-[var(--glass)] text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 py-1.5" aria-label="Nova Suite home">
          <NovaMark size={40} />
          <NovaWordmark />
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <Link to="/" hash="apps" onClick={goApps} className={linkClass}>
              Apps
            </Link>
            <Link
              to="/about"
              className={linkClass}
              activeProps={{ className: "!opacity-100", "aria-current": "page" }}
            >
              About
            </Link>
            <a href={GITHUB_URL} className={linkClass}>
              GitHub
            </a>
            <a
              href={CODING4PIZZA_URL}
              target="_blank"
              rel="noopener"
              className={cn(linkClass, "inline-flex items-center gap-1.5")}
            >
              coding4pizza
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-current/15 md:hidden"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onSelect={() => navigate({ to: "/", hash: "apps" })}>
                Apps
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={GITHUB_URL}>GitHub</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={CODING4PIZZA_URL} target="_blank" rel="noopener">
                  coding4pizza
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
