import { NovapizzaMark } from "@/components/brand/NovapizzaMark";
import { CODING4PIZZA_URL, GITHUB_URL } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-7 text-[13px] text-muted-foreground sm:px-6">
        <span>
          © {new Date().getFullYear()} Nova Suite · Open source · More tools at{" "}
          <a
            href={CODING4PIZZA_URL}
            target="_blank"
            rel="noopener"
            className="text-foreground underline-offset-2 hover:underline"
          >
            coding4pizza.com
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </span>
        <a href={GITHUB_URL} className="inline-flex items-center gap-2 hover:text-foreground">
          <NovapizzaMark size={24} className="shrink-0" />
          Made by
          <span className="font-display font-bold tracking-[0.2em] text-foreground">NOVAPIZZA</span>
        </a>
      </div>
    </footer>
  );
}
