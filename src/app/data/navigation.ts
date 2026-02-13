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
import type { SidebarNavigation } from "../types/domain";

export const sidebarData: SidebarNavigation[] = [
  { name: "Explore", icon: Compass, url: "/Explore" },
  { name: "Inventory", icon: Package, url: "/Inventory" },
  { name: "Activities", icon: Activity, url: "/Activities" },
  { name: "Quests", icon: Target, url: "/Quests" },
  { name: "Lifestyle", icon: Home, url: "/Lifestyle" },
  { name: "Travel", icon: MapPin, url: "/Travel", unlockConditions: [{ type: "age", operator: ">=", value: 18 }] },
  { name: "Stats", icon: BarChart3, url: "/Stats" },
  { name: "Recap", icon: Calendar, url: "/Recap" },
  { name: "Story", icon: BookOpen, url: "/Story", unlockConditions: [{ type: "day", operator: ">=", value: 10 }] },
];
