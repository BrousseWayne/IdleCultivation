import type { UnlockCondition } from "@/game/types/unlocks";
import type { Effect } from "@/game/types/effects";

export type Cost = {
  amount: number;
  period?: Period;
};

export type Period = "daily" | "weekly" | "monthly" | "annual" | "oneTime";
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
  glyph?: string;
  unlockConditions?: UnlockCondition[];
};

export type LifestyleCategoryData = {
  category: LifestyleCategory;
  description: string;
  options: LifestyleOption[];
};

export type Background = "farmer" | "orphan" | "soldier";

export type GamePhase = "mortal" | "immortal" | "supreme" | "cosmic";

export type StreamTheme = "ambient" | "income" | "event" | "dialogue" | "travel";
export type StreamTone = "narration" | "npc" | "self";

// Per-source gain aggregate (coin and/or stats), buffered until a narrative
// beat or day change.
export type IncomeBufferItem = {
  source: string;
  count: number;
  coin: number;
  stats: Partial<Record<Stats, number>>;
};

export type LogEntry = {
  text: string;
  theme: StreamTheme;
  tone?: StreamTone;
  speaker?: string;
  // dedup identity: consecutive entries with the same key collapse into one row
  key?: string;
  // structured payload for income rows — merged (counts/coins summed) on dedup
  income?: IncomeBufferItem;
};

export type NotificationType =
  | "narrative"
  | "discovery"
  | "journey"
  | "achievement"
  | "combat";

export type StoryEntry = {
  time: string;
  entry: string;
  type: NotificationType;
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
  url: string;
  unlocked: boolean;
  unlockConditions?: readonly UnlockCondition[];
};

export type NavigationUnlockState = Record<SidebarNavigation["name"], boolean>;

export type ActivityModel = {
  xpPerCompletion: () => number;
  key: string;
  timeCost: number;
  unlocked: boolean;
  effects: readonly Effect[];
  unlockConditions?: readonly UnlockCondition[];
  // "self" = doable anywhere (meditate/train/study); undefined = place-bound
  scope?: "self";
};

// An ordered run of N units of one activity. Adjacent same-key blocks merge.
export type QueueBlock = { key: string; units: number };

export type ActivityView = {
  key: string;
  name: string;
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

export type PlaceActionKind = "talk" | "shop" | "enter";

// A contextual non-activity verb at a place: talk to someone, enter a shop, etc.
// Free (no time cost). A dialogue event bound to the action takes priority;
// otherwise its effects resolve through EffectExecutor (any spend_currency in
// there doubles as the affordability gate).
export type PlaceAction = {
  key: string;
  label: string;
  detail: string;
  glyph: string;
  kind: PlaceActionKind;
  effects?: readonly Effect[];
};

// Generic over the activity-key union so authored data gets compile-checked
// cross-references; runtime code uses the plain-string default.
export type Place<TActivityKey extends string = string> = {
  key: string;
  name: string;
  description: string;
  activityKeys: readonly TActivityKey[];
  actions?: readonly PlaceAction[];
  connections: readonly string[]; // self-referential — checked at boot by validateContent
  unlocked: boolean;
  unlockConditions?: readonly UnlockCondition[];
  x: number;
  y: number;
  glyph: string;
  color: string;
};

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

export type UnlockableDefinition<
  TActivityKey extends string = string,
  TPlaceKey extends string = string,
> =
  | {
      id: string;
      unlockConditions: readonly UnlockCondition<TActivityKey>[];
      type: "activity";
      target: TActivityKey;
    }
  | {
      id: string;
      unlockConditions: readonly UnlockCondition<TActivityKey>[];
      type: "place";
      target: TPlaceKey;
    }
  | {
      id: string;
      unlockConditions: readonly UnlockCondition<TActivityKey>[];
      type: "activity_category";
      target: ActivityCategory;
    }
  | {
      id: string;
      unlockConditions: readonly UnlockCondition<TActivityKey>[];
      type: "navigation_tab";
      target: NavigationItem;
    };
