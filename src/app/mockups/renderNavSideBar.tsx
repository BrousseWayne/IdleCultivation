import {
  Activity,
  BarChart3,
  BookOpen,
  Calendar,
  Compass,
  Home,
  MapPin,
  Package,
  Target,
} from "lucide-react";
import { useGameState } from "./dataForPage9";

export function Sidenav() {
  const { activeTab, setActiveTab } = useGameState();
  return (
    <div className="w-48 bg-black border-r border-slate-800/50 p-3 fixed left-64 top-32 h-[calc(100vh-8rem)] overflow-hidden px-3 py-6">
      <nav className="space-y-1">
        {[
          { name: "Explore", icon: Compass },
          { name: "Inventory", icon: Package },
          { name: "Activities", icon: Activity },
          { name: "Quests", icon: Target },
          { name: "Lifestyle", icon: Home },
          { name: "Travel", icon: MapPin },
          { name: "Stats", icon: BarChart3 },
          { name: "Recap", icon: Calendar },
          { name: "Story", icon: BookOpen },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
              activeTab === item.name
                ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
