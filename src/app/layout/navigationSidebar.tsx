import { useGameStore } from "../stores/gameStore";
import { Link } from "react-router";
import { useState } from "react";
import { sidebarData } from "../data/navigation";

export function SideNavigationBar() {
  const [activeTab, setActiveTab] = useState("Activities");

  const navigationUnlockState = useGameStore((s) => s.navigationUnlocks);
  return (
    <div className="w-48 bg-black border-r border-slate-800/50 p-3 fixed left-64 top-32 h-[calc(100vh-8rem)] overflow-hidden px-3 py-6">
      <nav className="space-y-1">
        {sidebarData
          .filter((item) => navigationUnlockState[item.name])
          .map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}
