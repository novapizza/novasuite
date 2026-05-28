import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

// Runs before paint to apply the persisted theme and avoid a light/dark flash.
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(_){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold tracking-tight text-vapor">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
          >
            Try again
          </button>
          {/* Plain anchor (not Link) to force a full reload — if React is in a broken state, client-side nav may also fail. */}
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nova Suite — Tools that ship" },
      {
        name: "description",
        content:
          "Nova Suite is a family of open-source tools — NovaPad, Lumia, NovaFinder, NovaGitX, NovaClipboard, nmtr and Cirrus — built for people who care about the details.",
      },
      { name: "author", content: "Nova Suite" },
      { property: "og:title", content: "Nova Suite — Tools that ship" },
      {
        property: "og:description",
        content: "A family of fast, native, open-source tools for the modern desktop and cloud.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl">
              <SidebarTrigger />
              <div className="h-5 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold tracking-tight">
                  Nova Suite
                </span>
                <span className="hidden text-xs text-muted-foreground md:inline">/ Products</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
                <a
                  href="https://github.com/novapizza"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card sm:inline-flex"
                >
                  GitHub
                </a>
              </div>
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
            <footer className="border-t border-border bg-background/60 px-4 py-5 text-xs text-muted-foreground backdrop-blur sm:px-6 sm:py-6">
              <div className="flex w-full flex-wrap items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} Nova Suite · MIT License</span>
                <span className="font-mono">crafted with care · v2.0</span>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
