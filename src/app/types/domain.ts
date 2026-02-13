import type { LucideIcon } from "lucide-react";
import type { UnlockCondition } from "./unlocks";
import type { Effect } from "./effects";

export type Cost = {
  currency: Currency;
  amount: number;
  period?: Period;
};

export type Period = "daily" | "weekly" | "monthly" | "annual" | "oneTime";
export type Currency = "Bronze" | "Silver" | "Gold" | "Platinum";
export type Stats = "Strength" | "Dexterity";
export type LifestyleCategory = "Housing" | "Meals" | "Transportation";

export type LifestyleBonus = {
  xp?: number;
  mortality?: number;
};

export type LifestyleOption = {
  id: string;
  name: string;
  description: string;
  costs: Cost[];
  unlocked: boolean;
  bonuses: LifestyleBonus;
  icon?: LucideIcon;
  unlockConditions?: UnlockCondition[];
};

export type LifestyleCategoryData = {
  category: LifestyleCategory;
  description: string;
  options: LifestyleOption[];
};

export type StoryEntry = {
  time: string;
  entry: string;
  type: "narrative" | "discovery" | "journey" | "achievement" | "combat";
};

export type NavigationItem =
  | "Explore"
  | "Inventory"
  | "Activities"
  | "Quests"
  | "Lifestyle"
  | "Travel"
  | "Stats"
  | "Recap"
  | "Story";

export type SidebarNavigation = {
  name: NavigationItem;
  icon: LucideIcon;
  url: string;
  unlockConditions?: UnlockCondition[];
};

export type NavigationUnlockState = Record<SidebarNavigation["name"], boolean>;

export type ActivityModel = {
  xpScalingFn: () => number;
  key: string;
  level: number;
  timeCost: number;
  unlocked: boolean;
  effects: Effect[];
  unlockConditions?: UnlockCondition[];
  queueId?: string;
};

export type ActivityView = {
  key: string;
  name: string;
  icon: LucideIcon;
  category: ActivityCategory;
};

export const ALL_CATEGORIES = [
  "work",
  "training",
  "study",
  "social",
  "life",
  "hobby",
  "adventure",
] as const;

export type ActivityCategory = (typeof ALL_CATEGORIES)[number];

export type Activity = ActivityModel & ActivityView;

export type InventoryItem = {
  id: number;
  name: string;
  type: string;
  rarity: string;
};

export type Location = {
  name: string;
  travel: number;
  description: string;
  x: number;
  y: number;
  connections: string[];
};

export type ActiveQuest = {
  id: number;
  title: string;
  description: string;
  progress: number;
  reward: string;
  timeLeft: string;
};

export type CompletedQuest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  completedDate: string;
};

export type CalendarEvent = {
  date: number;
  type: "past" | "future";
  activity: string;
  result: string;
  category: string;
};
