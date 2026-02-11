import type { LucideIcon } from "lucide-react";
import type { UnlockCondition } from "./unlocks";

export type Reward =
  | {
      amount: number;
      currency: Currency;
    }
  | {
      amount: number;
      stat: Stats;
    };

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
  reward: Reward;
  unlockConditions?: UnlockCondition[];
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
