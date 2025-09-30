import type { NavigationUnlockState, StoryEntry } from "../types/domain";

export const currentDay = 20;
export const daysInMonth = 30;
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

export const storyEntryColors: Record<StoryEntry["type"], string> = {
  narrative: "border-purple-500/50 text-purple-400",
  discovery: "border-yellow-500/50 text-yellow-400",
  journey: "border-blue-500/50 text-blue-400",
  achievement: "border-green-500/50 text-green-400",
  combat: "border-red-500/50 text-red-400",
};

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
