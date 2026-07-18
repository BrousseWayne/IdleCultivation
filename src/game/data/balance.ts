import type { Chance } from "@/game/types/gameEvents";

export type CoinMagnitude = keyof typeof COIN;
export type StatMagnitude = keyof typeof STAT;
export type HpMagnitude = keyof typeof HP;

// The single tuning table. Authored content references these named magnitudes
// instead of raw numbers, so rebalancing the economy is an edit to THIS file,
// never to fifty events.

// coin (copper wen) magnitudes — for grants, costs, damage-as-coin
export const COIN = {
  trivial: 5,
  small: 20,
  medium: 60,
  large: 200,
  windfall: 800,
} as const;

// stat grants
export const STAT = {
  minor: 1,
  moderate: 3,
  major: 8,
} as const;

// vitality damage / heal magnitudes
export const HP = {
  trivial: 3,
  small: 8,
  medium: 20,
  large: 45,
} as const;

// probability per daily roll for chance-gated events
export const CHANCE_PROBABILITY: Record<Chance, number> = {
  common: 0.2,
  uncommon: 0.08,
  rare: 0.02,
};

// uncertain currency rewards roll uniformly in [1−spread, 1+spread) × base
export const UNCERTAIN_SPREAD = 0.5;
