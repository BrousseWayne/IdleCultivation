import type { LucideIcon } from "lucide-react";

export const currentDay = 20; // Current day in the month
export const daysInMonth = 30;

export type Period = "daily" | "weekly" | "monthly" | "annual" | "oneTime";
export type Currency = "Bronze" | "Silver" | "Gold" | "Platinum";
export type Stats = "Strength" | "Dexterity";

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

export type LifestyleCategory = "Housing" | "Meals" | "Transportation";

export type LifestyleBonus = {
  xp?: number;
  mortality?: number;
};

export type LifestyleOption = {
  id: string;
  name: string;
  description: string;
  costs: Cost[]; // initial and/or recurring stored together
  unlocked: boolean;
  bonuses: LifestyleBonus;
  icon?: LucideIcon;
};

export type LifestyleCategoryData = {
  category: LifestyleCategory;
  description: string;
  options: LifestyleOption[];
};
export const lifestyleOptions: LifestyleCategoryData[] = [
  {
    category: "Housing",
    description: "Your place of rest and cultivation",
    options: [
      {
        id: "streets",
        name: "Streets",
        description: "Basic shelter, exposed to the elements and bandits.",
        costs: [
          { currency: "Bronze", amount: 0, period: "oneTime" },
          { currency: "Bronze", amount: 0, period: "daily" },
        ],
        unlocked: true,
        bonuses: { xp: -0.5, mortality: 0.2 },
      },
      {
        id: "shabby-tent",
        name: "Shabby Tent",
        description: "Ragged tent, minimal protection from weather.",
        costs: [
          { currency: "Bronze", amount: 100, period: "oneTime" },
          { currency: "Bronze", amount: 1, period: "daily" },
        ],
        unlocked: true,
        bonuses: { mortality: 0.1 },
      },
      {
        id: "simple-cottage",
        name: "Simple Cottage",
        description: "A modest dwelling with basic privacy for cultivation.",
        costs: [
          { currency: "Silver", amount: 5, period: "oneTime" },
          { currency: "Silver", amount: 1, period: "monthly" },
        ],
        unlocked: false,
        bonuses: { xp: 0.1 },
      },
    ],
  },
  {
    category: "Meals",
    description: "Nutrition affects cultivation speed",
    options: [
      {
        id: "bread-water",
        name: "Bread & Water",
        description: "Bare survival food, no cultivation value.",
        costs: [{ currency: "Bronze", amount: 5, period: "daily" }],
        unlocked: true,
        bonuses: { xp: 0 },
      },
      {
        id: "spirit-rice",
        name: "Spirit Rice",
        description: "Grain infused with faint qi, aids cultivation.",
        costs: [{ currency: "Silver", amount: 2, period: "daily" }],
        unlocked: true,
        bonuses: { xp: 0.1 },
      },
      {
        id: "immortal-banquet",
        name: "Immortal Banquet",
        description: "Rare dishes with spiritual herbs and beast meat.",
        costs: [{ currency: "Gold", amount: 1, period: "weekly" }],
        unlocked: false,
        bonuses: { xp: 0.5, mortality: -0.05 },
      },
    ],
  },
  {
    category: "Transportation",
    description: "Travel method affects safety and opportunities",
    options: [
      {
        id: "walking",
        name: "Walking",
        description: "Free but slow travel. Risk of hostile encounters.",
        costs: [{ currency: "Bronze", amount: 0, period: "daily" }],
        unlocked: true,
        bonuses: { mortality: 0.05 },
      },
      {
        id: "spirit-horse",
        name: "Spirit Horse",
        description: "A loyal steed infused with qi, faster journeys.",
        costs: [
          { currency: "Silver", amount: 50, period: "oneTime" },
          { currency: "Silver", amount: 1, period: "daily" },
        ],
        unlocked: false,
        bonuses: { mortality: -0.05 },
      },
      {
        id: "flying-sword",
        name: "Flying Sword",
        description: "Traditional cultivator transport through the skies.",
        costs: [
          { currency: "Gold", amount: 5, period: "oneTime" },
          { currency: "Silver", amount: 2, period: "daily" },
        ],
        unlocked: false,
        bonuses: { xp: 0.05, mortality: -0.1 },
      },
    ],
  },
];

export type StoryEntry = {
  time: string;
  entry: string;
  type: "narrative" | "discovery" | "journey" | "achievement" | "combat";
};

export const storyEntryColors: Record<StoryEntry["type"], string> = {
  narrative: "border-purple-500/50 text-purple-400",
  discovery: "border-yellow-500/50 text-yellow-400",
  journey: "border-blue-500/50 text-blue-400",
  achievement: "border-green-500/50 text-green-400",
  combat: "border-red-500/50 text-red-400",
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
};

export type NavigationUnlockState = Record<SidebarNavigation["name"], boolean>;

export const initialNavigationUnlockState: NavigationUnlockState = {
  Explore: true,
  Inventory: true,
  Activities: true,
  Quests: true,
  Lifestyle: true,
  Travel: true,
  Stats: true,
  Recap: true,
  Story: true,
};

export const initialPlayerAge = 12;
export const initialPlayerLifespan = 60;

export const initialPlayerHp = {
  max: 100,
  current: 100,
};

export const initialPlayerSatiety = {
  max: 100,
  current: 100,
};

export const initialPlayerMortality = {
  max: 100,
  current: 1,
};

export const initialPlayerMoney = 10;
