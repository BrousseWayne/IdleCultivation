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
import { useGameState } from "../contexts/gameStateContext";
import { Link } from "react-router";
import { type SidebarNavigation } from "../data/data copy";
import { useState } from "react";

const sidebarData: SidebarNavigation[] = [
  { name: "Explore", icon: Compass, url: "/Explore" },
  { name: "Inventory", icon: Package, url: "/Inventory" },
  { name: "Activities", icon: Activity, url: "/Activities" },
  { name: "Quests", icon: Target, url: "/Quests" },
  { name: "Lifestyle", icon: Home, url: "/Lifestyle" },
  { name: "Travel", icon: MapPin, url: "/Travel" },
  { name: "Stats", icon: BarChart3, url: "/Stats" },
  { name: "Recap", icon: Calendar, url: "/Recap" },
  { name: "Story", icon: BookOpen, url: "/Story" },
];

export function SideNavigationBar() {
  const [activeTab, setActiveTab] = useState("Activities");

  const { navigationUnlockState } = useGameState();
  // console.log(activeTab);
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
