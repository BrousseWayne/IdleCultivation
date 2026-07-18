import { Link, useLocation } from "react-router";
import { sidebarData } from "@/game/data/navigation";
import { useUnlockStore } from "@/game/stores/unlockStore";
import { text, navKey } from "@/game/content/text";

// Horizontal text-only tabs — the canonical navigation. Locked tabs are
// completely hidden (progressive disclosure), not grayed out.
export function TabsNav() {
  const location = useLocation();
  const activeTab = location.pathname.slice(1) || "Explore";
  const navigationUnlocks = useUnlockStore((state) => state.navigation);

  return (
    <nav className="flex items-stretch gap-0.5 px-3 bg-panel-0 border-b border-line">
      {sidebarData
        .filter((item) => navigationUnlocks[item.name])
        .map((item) => {
          const isActive = activeTab === item.name;
          return (
            <Link
              key={item.name}
              to={item.url}
              className={`flex items-center px-3.5 pt-2 pb-1.5 text-[14.5px] border-b-2 transition-colors ${
                isActive
                  ? "text-accent-jade border-accent-jade font-semibold"
                  : "text-ink-2 border-transparent hover:text-ink"
              }`}
            >
              {text(navKey(item.name))}
            </Link>
          );
        })}
    </nav>
  );
}
