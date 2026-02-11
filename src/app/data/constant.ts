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
  narrative: "border-accent-violet/50 text-accent-violet",
  discovery: "border-accent-gold/50 text-accent-gold",
  journey: "border-accent-sky/50 text-accent-sky",
  achievement: "border-accent-emerald/50 text-accent-emerald",
  combat: "border-accent-cinnabar/50 text-accent-cinnabar",
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
