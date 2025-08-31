// components/sidebar/SidebarNav.tsx
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/types/props";

const navItems: NavItem[] = [
  { label: "Explore", variant: "default" },
  { label: "Inventory", variant: "ghost" },
  { label: "Activities", variant: "ghost" },
];

//TODO: Variant type

export function SidebarNav() {
  return (
    <aside className="w-48 bg-sidebar/60 backdrop-blur-sm border-r border-sidebar-border p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.variant}
            size="sm"
            className={`w-full justify-start ${
              item.variant === "default"
                ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
