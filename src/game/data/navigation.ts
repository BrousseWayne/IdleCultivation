import type { SidebarNavigation } from "@/game/types/domain";
import { when } from "@/game/data/conditions";

export const sidebarData: SidebarNavigation[] = [
  { name: "Explore", url: "/Explore", unlocked: true },
  { name: "Inventory", url: "/Inventory", unlocked: true },
  { name: "Activities", url: "/Activities", unlocked: true },
  { name: "Quests", url: "/Quests", unlocked: true },
  { name: "Lifestyle", url: "/Lifestyle", unlocked: true },
  { name: "Travel", url: "/Travel", unlocked: false },
  { name: "Stats", url: "/Stats", unlocked: true },
  { name: "Recap", url: "/Recap", unlocked: true },
  {
    name: "Story",
    url: "/Story",
    unlocked: false,
    unlockConditions: [when.day(">=", 10)],
  },
];
