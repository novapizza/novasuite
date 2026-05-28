import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { products } from "@/lib/products";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vapor shadow-glow">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.25} />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-base font-semibold tracking-tight">Nova Suite</span>
            <span className="text-[11px] text-muted-foreground">Tools that ship.</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-[10px] uppercase tracking-[0.18em]">
            Products
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {products.map((p) => {
                const Icon = p.icon;
                const active = pathname === p.route;
                return (
                  <SidebarMenuItem key={p.slug}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={p.name}
                      className="h-11 gap-3"
                    >
                      <Link to={p.route}>
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-card shadow-sm"
                          style={{ color: p.accent }}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </span>
                        <span className="flex flex-col items-start leading-tight">
                          <span className="font-display text-sm font-medium">{p.name}</span>
                          <span className="text-[11px] text-muted-foreground">{p.blurb}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="GitHub Organization">
              <a
                href="https://github.com/novapizza"
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <Github className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">GitHub Organization</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
