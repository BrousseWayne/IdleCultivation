import type { GamePhase, StoryEntry } from "@/game/types/domain";

export const initialPhase: GamePhase = "mortal";

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

export const initialCurrency = 10;

export const RESERVED_SLEEP_HOURS = 6;
export const DAILY_SATIETY_DRAIN = 25;
export const STARVATION_VITALITY_DAMAGE = 15;
export const DEFAULT_MEAL_ID = "meal_scraps";
export const DEFAULT_LODGING_ID = "house_streets";

export const storyEntryColors: Record<StoryEntry["type"], string> = {
  narrative: "border-accent-violet/50 text-accent-violet",
  discovery: "border-accent-gold/50 text-accent-gold",
  journey: "border-accent-sky/50 text-accent-sky",
  achievement: "border-accent-jade/50 text-accent-jade",
  combat: "border-accent-cinnabar/50 text-accent-cinnabar",
};
