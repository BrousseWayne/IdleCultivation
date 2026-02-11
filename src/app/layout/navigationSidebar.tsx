import { useGameStore } from "../stores/gameStore";
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { sidebarData } from "../data/navigation";
import { SECTION_COLORS } from "../data/sectionColors";
import type { NavigationUnlockState } from "../types/domain";

export function SideNavigationBar() {
  const [activeTab, setActiveTab] = useState("Activities");

  const navigationUnlockState = useGameStore((s) => s.navigationUnlocks);
  const prevUnlocks = useRef<NavigationUnlockState>(navigationUnlockState);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fresh = new Set<string>();
    for (const [key, unlocked] of Object.entries(navigationUnlockState)) {
      if (unlocked && !prevUnlocks.current[key as keyof NavigationUnlockState]) {
        fresh.add(key);
      }
    }
    if (fresh.size > 0) {
      setNewlyUnlocked(fresh);
      const timer = setTimeout(() => setNewlyUnlocked(new Set()), 500);
      prevUnlocks.current = navigationUnlockState;
      return () => clearTimeout(timer);
    }
    prevUnlocks.current = navigationUnlockState;
  }, [navigationUnlockState]);

  return (
    <div className="w-48 bg-black border-r border-slate-800/50 p-3 fixed left-64 top-32 h-[calc(100vh-8rem)] overflow-hidden px-3 py-6">
      <nav className="space-y-1">
        {sidebarData
          .filter((item) => navigationUnlockState[item.name])
          .map((item) => {
            const color = SECTION_COLORS[item.name];
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                  activeTab === item.name
                    ? `bg-${color}/15 text-${color} border border-${color}/30`
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                } ${newlyUnlocked.has(item.name) ? "animate-unlock-flash" : ""}`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.name ? `text-${color}` : ""}`} />
                {item.name}
              </Link>
            );
          })}
      </nav>
    </div>
  );
}
